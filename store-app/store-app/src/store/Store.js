import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../pages/Counter/CounterSlice";
import cartReducer from "../pages/Carts/CartSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    cart: cartReducer,
  },
});
