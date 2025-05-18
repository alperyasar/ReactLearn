// src/context/CartContext.jsx
import { createContext, useContext, useState } from "react";

const CartCtx = createContext();
export const useCart = () => useContext(CartCtx);

/*  Sepet elemanı: { id, title, price, image, qty }  */
export function CartProvider({ children }) {
  const [cart, setCart] = useState(() =>
    JSON.parse(localStorage.getItem("cart") || "[]")
  );

  const sync = (next) => {
    setCart(next);
    localStorage.setItem("cart", JSON.stringify(next));
  };

  /** ürün = { id, title, price, image } */
  const add = (product) => {
    sync(
      cart.some((i) => i.id === product.id)
        ? cart.map((i) => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i))
        : [...cart, { ...product, qty: 1 }]
    );
  };

  const inc = (id) =>
    sync(cart.map((i) => (i.id === id ? { ...i, qty: i.qty + 1 } : i)));

  const dec = (id) =>
    sync(
      cart
        .map((i) => (i.id === id ? { ...i, qty: i.qty - 1 } : i))
        .filter((i) => i.qty > 0)
    );

  const remove = (id) => sync(cart.filter((i) => i.id !== id));

  return (
    <CartCtx.Provider value={{ cart, add, inc, dec, remove, sync }}>
      {children}
    </CartCtx.Provider>
  );
}
