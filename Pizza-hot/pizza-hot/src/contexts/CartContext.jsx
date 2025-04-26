// src/contexts/CartContext.jsx
import { createContext, useReducer, useState } from "react";
import { cartReducer } from "../reducer/cartReducer";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const [showCart, setShowCart] = useState(false);
  const openCart = () => setShowCart(true);
  const closeCart = () => setShowCart(false);

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

  const cartContext = {
    items: state.items,
    addItem,
    removeItem,
    updateItem,
    clearCart,
    showCart,
    openCart,
    closeCart,
  };

  return (
    <CartContext.Provider value={cartContext}>{children}</CartContext.Provider>
  );
}
