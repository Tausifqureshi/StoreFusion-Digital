import { useState, useEffect, useMemo, useCallback, useContext } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, incrementQuantity, decrementQuantity, deleteFromCart } from "../../../features/cart/cartSlice";
import { useParams, useNavigate } from "react-router-dom";
import { ThemeContext } from '../../../context/AllContext';
import { cartService } from "../../../services/cartService";


import { store } from "../../../app/store";
import useProducts from "../../../features/products/useProducts";

export function useProductInfo() {
  const { products: product, productsLoading: loading } = useProducts();
  const { mode } = useContext(ThemeContext);


  const [mainImage, setMainImage] = useState("");
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  const params = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const navigate = useNavigate();
  const isDark = mode === "dark";

  const user = useSelector((state) => state.users.loggedInUser);

  const currentProduct = useMemo(() => product?.find((item) => item.id === params.id), [product, params.id]);

  const similarProducts = useMemo(() => {
    if (!currentProduct || !product) return [];
    return product
      .filter((item) => {
        const sameCategory =
          item.category?.toLowerCase() === currentProduct.category?.toLowerCase();

        const sameSubCategory =
          item.subcategory?.toLowerCase() === currentProduct.subcategory?.toLowerCase();

        return sameCategory && sameSubCategory && item.id !== currentProduct.id;
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
