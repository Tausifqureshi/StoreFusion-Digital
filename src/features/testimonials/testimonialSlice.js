import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  loading: false,
  error: null,
  form: {
    id: '',
    name: '',
    text: '',
    img: '',
    role: '',
    productId: '',
    gender: 'male'
  }
};

const testimonialSlice = createSlice({
  name: 'testimonials',
  initialState,
  reducers: {
    setTestimonials: (state, action) => {
      state.items = action.payload;
    },
    setTestimonialsLoading: (state, action) => {
      state.loading = action.payload;
    },
    setTestimonialsError: (state, action) => {
      state.error = action.payload;
    },
    setTestimonialForm: (state, action) => {
      state.form = { ...state.form, ...action.payload };
    },
    resetTestimonialForm: (state) => {
      state.form = initialState.form;
    }
  },
});

export const { 
  setTestimonials, 
  setTestimonialsLoading, 
  setTestimonialsError, 
  setTestimonialForm, 
  resetTestimonialForm 
} = testimonialSlice.actions;

export default testimonialSlice.reducer;
