import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], // All users for admin
  loggedInUser: null,
  loading: false,
  isAuthInitialized: false, // NEW: Tracks initial auth check
};

const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers: (state, action) => {
      state.items = action.payload;
      state.loading = false;
    },
    setLoggedInUser: (state, action) => {
      state.loggedInUser = action.payload;
      state.isAuthInitialized = true;
    },
    setUsersLoading: (state, action) => {
      state.loading = action.payload;
    }
  },
});


export const { setUsers, setLoggedInUser, setUsersLoading } = userSlice.actions;
export default userSlice.reducer;
