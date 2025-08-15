import { createContext, useContext, useState } from "react";
import request from "../api/apiClient";

const CartCtx = createContext();
export const useCart = () => useContext(CartCtx);

/* ---------- localStorage güvenli okuma ---------- */
const loadCart = () => {
  try {
    const raw = localStorage.getItem("cart");
    if (!raw) return []; // hiç kayıt yok
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    localStorage.removeItem("cart"); // bozuk veriyi temizle
    return [];
  }
};

export function CartProvider({ children }) {
  const [cart, setCart] = useState(loadCart);

  const sync = (next) => {
    setCart(next);
    localStorage.setItem("cart", JSON.stringify(next));
  };

  const add = (product) => {
    return request.cart // ← return ekledik
      .addItem(product.id, 1)
      .then((srv) => {
        // Sunucu tüm sepeti dönüyorsa:
        const next = srv.cartItems.map((ci) => ({
          id: ci.product.id,
          title: ci.product.title,
          price: Number(ci.product.price),
          image: `${request.defaults.baseURL}/images/${ci.product.image}`,
          qty: ci.quantity,
        }));
        sync(next); // state + localStorage
      });
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
