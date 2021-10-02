import { configureStore } from "@reduxjs/toolkit";
import storeReducer from "./sllice/storeSlice";

export const store = configureStore({
  reducer: { storeReducer },
});
