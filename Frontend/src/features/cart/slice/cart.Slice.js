import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  cartItems: [],
  cartTotalAmount: 0,
  cartTotalQuantity: 0,
  cartLoading: false,
  cartError: null,
};


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setItems: (state, action) => {
      const items = action.payload || [];
      state.cartItems = items;
      // Calculate totals
      state.cartTotalQuantity = items.reduce((total, item) => total + (item.quantity || 0), 0);
      state.cartTotalAmount = items.reduce((total, item) => {
        const itemPrice = item.currentPrice || item.price?.discountPrice || item.price?.amount || 0;
        return total + (itemPrice * (item.quantity || 0));
      }, 0);
    },
    setCartLoading: (state, action) => {
      state.cartLoading = action.payload;
    },
    clearCart: (state) => {
      state.cartItems = [];
      state.cartTotalQuantity = 0;
      state.cartTotalAmount = 0;
    }
  }
});

export const { setItems, setCartLoading, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
