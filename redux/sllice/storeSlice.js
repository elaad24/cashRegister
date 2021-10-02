import { createSlice } from "@reduxjs/toolkit";

export const storeSlice = createSlice({
  name: "counter",
  initialState: {
    products: [],
    totalPrice: 0,
  },
  reducers: {
    // add item to shopping cart
    addItem(state, action) {
      state.products = [...state.products, action.payload];
      state.totalPrice = state.totalPrice + action.payload.price;
    },
    // remove item from redux products
    removeItem(state, action) {
      // action.payloud is item id
      console.log("state.products", JSON.stringify(state.products));
      console.log("action,payload", action.payload);

      let temp = [];
      for (let item of state.products) {
        console.log("item", JSON.stringify(item));
        if (item.id != action.payload) {
          temp.push(item);
        } else if (item.id == action.payload) {
          state.totalPrice = state.totalPrice - item.price;
        }
      }
      state.products = [...temp];
    },
    clearCart(state) {
      state.products = [];
      state.totalPrice = 0;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addItem, removeItem, clearCart } = storeSlice.actions;

export default storeSlice.reducer;
