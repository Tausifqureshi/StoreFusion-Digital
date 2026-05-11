import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  loading: false,
  error: null,
  // Admin Form State
  form: {
    title: "",
    price: "",
    imageUrl: "",
    category: "",
    subcategory: "",
    description: "",
    discount: "",
    stock: "",
    rating: "",
    color: "",
    size: "",
  }
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
    },
    setProductsLoading: (state, action) => {
      state.loading = action.payload;
    },
    setProductsError: (state, action) => {
      state.error = action.payload;
    },
    setForm: (state, action) => {
      state.form = { ...state.form, ...action.payload };
    },
    resetForm: (state) => {
      state.form = initialState.form;
    }
  },
});

export const { setProducts, setProductsLoading, setProductsError, setForm, resetForm } = productSlice.actions;

export default productSlice.reducer;
