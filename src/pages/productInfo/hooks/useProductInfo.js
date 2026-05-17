import { useState, useEffect, useMemo, useCallback, useContext } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, incrementQuantity, decrementQuantity, deleteFromCart } from "../../../features/cart/cartSlice";
import { useParams, useNavigate } from "react-router-dom";
import { ThemeContext } from '../../../context/AllContext';
import { cartService } from "../../../services/cartService";


import { store } from "../../../app/store";
import useProducts from "../../../features/products/useProducts";
import { productService } from "../../../services/productService";
import { setProducts, setProductsLoading, setProductsError } from "../../../features/products/productSlice";

export function useProductInfo() {
  const { products: product, productsLoading: loading } = useProducts();
  const { mode } = useContext(ThemeContext);
  const dispatch = useDispatch();
  const params = useParams();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.users.loggedInUser);

  // 📡 ON-DEMAND TARGETED FETCH: 1 Product + Category Products Only! (Massive Optimization)
  useEffect(() => {
    if (!params.id) return;
    
    // Agar redax me data pehle se hai toh use use karo (Redux cache check)
    // Lekin agar nahi hai ya partial hai toh hi fetch karo
    // Note: Hum direct specific fetch kar rahe hain for maximum performance!
    
    const fetchTargetedData = async () => {
      // Agar pehle se product list mein ye id hai, aur array bada hai, toh fetch mat karo
      const exists = product?.find(p => p.id === params.id);
      if (exists && product.length > 5) return;

      dispatch(setProductsLoading(true));
      try {
        // 1. Sirf 1 product mangwao (1 read cost)
        const singleProduct = await productService.getSingleProduct(params.id);
        if (singleProduct) {
          dispatch(setProducts([singleProduct])); // Instant render ke liye

          // 2. Similar products ke liye sirf us category ke products mangwao (~10 reads cost)
          if (singleProduct.category) {
            const categoryData = await productService.getProductsByCategory(singleProduct.category);
            dispatch(setProducts(categoryData)); // Update redux state with category items
          }
        }
        dispatch(setProductsLoading(false));
      } catch (error) {
        dispatch(setProductsError(error.message));
        dispatch(setProductsLoading(false));
      }
    };

    fetchTargetedData();
  }, [dispatch, params.id, product.length]);


  const [mainImage, setMainImage] = useState("");
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  const isDark = mode === "dark";

  const currentProduct = useMemo(() => product?.find((item) => item.id === params.id), [product, params.id]);

  const similarProducts = useMemo(() => {
    if (!currentProduct || !product) return [];
    return product
      .filter((item) => {
        const sameCategory =
          item.category?.toLowerCase() === currentProduct.category?.toLowerCase();

        const sameSubCategory =
          item.subcategory?.toLowerCase() === currentProduct.subcategory?.toLowerCase();

        return sameCategory && sameSubCategory && item.id !== currentProduct.id;//Current product (jo user abhi dekh raha hai) ko similar products ki list se hata do."Kyunki hum nahi chahte ki user jis product ke page par hai, wahi same product usko niche "Similar Products" mein bhi dikhai de.
      })
      .slice(0, 4);
  }, [product, currentProduct]);

  useEffect(() => {
    if (currentProduct) {
      setMainImage(currentProduct.imageUrl);
      window.scrollTo(0, 0);
    }
  }, [currentProduct, params.id]);

  const isProductInCart = useMemo(
    () => cartItems.find((cartItem) => cartItem?.id === currentProduct?.id),
    [cartItems, currentProduct]
  );

  const dispatchAndSave = useCallback(async (action) => {
    dispatch(action);
    const updatedCart = store.getState().cart.items;
    await cartService.saveCart(updatedCart, user);
  }, [dispatch, user]);


  const handleIncrement = useCallback(async () => {
    if (isProductInCart && isProductInCart.quantity >= Number(currentProduct.stock || Infinity)) {
      toast.error(`Only ${currentProduct.stock} left in stock!`, { position: "top-right", autoClose: 1000 });
      return;
    }
    await dispatchAndSave(incrementQuantity(currentProduct.id));
  }, [dispatchAndSave, isProductInCart, currentProduct]);

  const handleDecrement = useCallback(async () => {
    if (isProductInCart?.quantity === 1) {
      await dispatchAndSave(deleteFromCart(currentProduct.id));
      toast.info("Product removed from cart!", { icon: "🗑️", autoClose: 1000, position: "top-right" });
    } else {
      await dispatchAndSave(decrementQuantity(currentProduct.id));
    }
  }, [dispatchAndSave, isProductInCart, currentProduct]);

  const handleAddToCart = useCallback(async () => {
    if (Number(currentProduct.stock || 0) === 0) {
      toast.error("Product is out of stock!", { position: "top-right", autoClose: 1000 });
      return;
    }
    const serializedProduct = { ...currentProduct, quantity: 1, time: currentProduct.time?.seconds ?? Date.now() };
    await dispatchAndSave(addToCart(serializedProduct));
    toast.success("Product added to cart!", { position: "top-right", autoClose: 1000 });
  }, [dispatchAndSave, currentProduct]);


  const handleViewAll = useCallback(() => {
    if (currentProduct?.category) {
      const cat = currentProduct.category.toLowerCase();
      if (currentProduct.subcategory) {
        navigate(`/category/${cat}?sub=${currentProduct.subcategory.toLowerCase()}`);
      } else {
        navigate(`/category/${cat}`);
      }
    } else {
      navigate(`/allproducts`);
    }
  }, [navigate, currentProduct]);

  // Hook sirf raw data return karta hai — JSX ProductAction.jsx mein banega
  const productDescription = currentProduct?.description || "No description available";

  const discount = currentProduct?.discount || 0;
  const finalPrice = currentProduct
    ? Math.round(currentProduct.price - (currentProduct.price * discount) / 100)
    : 0;
  // Gallery mein hamesha 3 thumbnails — agar imageUrl2/3 nahi hai toh main image fallback hogi
  const gallery = currentProduct
    ? [
      currentProduct.imageUrl,
      currentProduct.imageUrl2 || currentProduct.imageUrl,
      currentProduct.imageUrl3 || currentProduct.imageUrl,
    ]
    : [];

  return {
    loading,
    currentProduct,
    mainImage,
    setMainImage,
    isHeartFilled,
    setIsHeartFilled,
    expandedId,
    setExpandedId,
    isDark,
    mode,
    params,
    navigate,
    similarProducts,
    isProductInCart,
    handleIncrement,
    handleDecrement,
    handleAddToCart,
    handleViewAll,
    productDescription,
    discount,
    finalPrice,
    gallery,
  };
}
