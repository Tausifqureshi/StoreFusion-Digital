import { useState, useEffect, useMemo, useCallback, useContext } from "react";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, incrementQuantity, decrementQuantity, deleteFromCart } from "../../../redux/cartSlice";
import { useParams, useNavigate } from "react-router-dom";
import { ProductAdminContext, ProductContext, ThemeContext } from '../../../context api/AllContext';
import { saveCart } from "../../cart/cartService";
import { store } from "../../../redux/store";

export function useProductInfo() {
  const { product } = useContext(ProductContext);
  const { loading } = useContext(ProductAdminContext);
  const { mode } = useContext(ThemeContext);

  const [mainImage, setMainImage] = useState("");
  const [isHeartFilled, setIsHeartFilled] = useState(false);
  const [expandedId, setExpandedId] = useState(null);

  const params = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const isDark = mode === "dark";

  const currentProduct = useMemo(() => product?.find((item) => item.id === params.id), [product, params.id]);

  const similarProducts = useMemo(() => {
    if (!currentProduct || !product) return [];
    return product
      // 1. Same category ke products dhundo
      // 2. Current product ko list se hata do
      .filter((item) => item.category === currentProduct.category && item.id !== currentProduct.id)
      // Sirf 4 products dikhao
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

  const handleIncrement = useCallback(async () => {
    if (isProductInCart && isProductInCart.quantity >= Number(currentProduct.stock || Infinity)) {
      toast.error(`Only ${currentProduct.stock} left in stock!`, { position: "top-right", autoClose: 1000 });
      return;
    }
    dispatch(incrementQuantity(currentProduct.id));
    await saveCart(store.getState().cart);
  }, [dispatch, isProductInCart, currentProduct]);

  const handleDecrement = useCallback(async () => {
    if (isProductInCart?.quantity === 1) {
      dispatch(deleteFromCart(currentProduct.id));
      toast.info("Product removed from cart!", { icon: "🗑️", autoClose: 1000, position: "top-right" });
    } else {
      dispatch(decrementQuantity(currentProduct.id));
    }
    await saveCart(store.getState().cart);
  }, [dispatch, isProductInCart, currentProduct]);

  const handleAddToCart = useCallback(async () => {
    if (Number(currentProduct.stock || 0) === 0) {
      toast.error("Product is out of stock!", { position: "top-right", autoClose: 1000 });
      return;
    }
    const serializedProduct = { ...currentProduct, quantity: 1, time: currentProduct.time?.seconds ?? Date.now() };
    dispatch(addToCart(serializedProduct));
    await saveCart(store.getState().cart);
    toast.success("Product added to cart!", { position: "top-right", autoClose: 1000 });
  }, [dispatch, currentProduct]);

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
