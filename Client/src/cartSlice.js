import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [], 
  },
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1; 
      } else {
        state.cartItems.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((item) => item.id !== action.payload);
    },
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
