import { createContext, useReducer, useState } from "react";
import { cartReducer } from "../reducer/cartReducer";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
  });
  function addItem(pizza) {
    dispatch({ type: "ADD_TO_CART", payload: pizza });
  }
  function removeItem(pizza) {
    dispatch({ type: "REMOVE_FROM_CART", payload: pizza });
  }
  function updateItem(pizza) {
    dispatch({ type: "UPDATE_CART_ITEM", payload: pizza });
  }
  function clearCart() {
    dispatch({ type: "CLEAR_CART" });
  }
  function getTotalPrice() {
    return getTotalPrice(state.items);
  }
  function getItemCount() {
    return getItemCount(state.items);
  }

  console.log("CartProvider state", state);

  const cartContext = {
    items: state.items,
    addItem,
    removeItem,
    clearCart,
    updateItem,
    getTotalPrice,
    getItemCount,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}
