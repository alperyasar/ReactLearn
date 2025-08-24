import { createContext, useContext, useEffect, useState } from "react";
import request from "../api/apiClient";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";

const CartCtx = createContext();
export const useCart = () => useContext(CartCtx);

/* ---------- localStorage güvenli okuma/yazma ---------- */
const loadCart = () => {
  try {
    const raw = localStorage.getItem("cart");
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
  } catch {
    localStorage.removeItem("cart");
    return [];
  }
};
const saveCart = (next) => localStorage.setItem("cart", JSON.stringify(next));

/* ---------- yardımcılar ---------- */
const buildImage = (name) => {
  if (!name) return "";
  return String(name).startsWith("http") ? name : `${API_BASE}/images/${name}`;
};

/* ---------- SERVER → UI normalize (toleranslı) ---------- */
const normalizeCart = (payload) => {
  const list = Array.isArray(payload?.cartItems)
    ? payload.cartItems
    : Array.isArray(payload?.items)
    ? payload.items
    : Array.isArray(payload)
    ? payload
    : [];

  return list
    .map((ci) => {
      const p = ci?.product ?? ci;
      const id = p?.id ?? ci?.productId ?? ci?.id;
      if (id == null) return null;

      const qtyRaw = ci?.quantity ?? ci?.qty ?? p?.quantity ?? p?.qty ?? 0;

      return {
        id: String(id),
        title: String(p?.title ?? ci?.title ?? "Untitled"),
        price: Number(p?.price ?? ci?.price ?? 0) || 0,
        image: buildImage(p?.image ?? ci?.image ?? ""),
        qty: Number(qtyRaw) || 0,
      };
    })
    .filter(Boolean);
};

export function CartProvider({ children }) {
  const [cart, setCart] = useState(loadCart);

  const sync = (next) => {
    const safe = Array.isArray(next) ? next.filter(Boolean) : [];
    setCart(safe);
    saveCart(safe);
  };

  const syncFromServer = (payload) => {
    const next = normalizeCart(payload);
    sync(next);
    return next;
  };

  // ---- CartContext.jsx içinde ----
  const coerceId = (v) => String(v ?? "");

  const fetchAndSync = () =>
    request.cart.get().then((payload) => syncFromServer(payload));

  // Uygulama ilk açıldığında server sepetini oluştur/senkronla
  useEffect(() => {
    fetchAndSync().catch(() => {
      /* server kapalıysa local ile devam */
    });
  }, []);

  const add = async (product) => {
    const id = coerceId(product?.id);
    if (!id) return;
    try {
      const payload = await request.cart.addItem(id, 1);
      return syncFromServer(payload);
    } catch (err) {
      await fetchAndSync(); // server state'i tazele
      throw err;
    }
  };

  const inc = async (id) => {
    id = coerceId(id);
    try {
      const payload = await request.cart.addItem(id, 1);
      return syncFromServer(payload);
    } catch (err) {
      await fetchAndSync();
      throw err;
    }
  };

  const dec = async (id) => {
    id = coerceId(id);
    try {
      const payload = await request.cart.removeItem(id, 1);
      return syncFromServer(payload);
    } catch (err) {
      await fetchAndSync();
      throw err;
    }
  };

  const remove = async (id) => {
    id = coerceId(id);
    try {
      const payload = await request.cart.removeItem(id, 999999);
      return syncFromServer(payload);
    } catch (err) {
      await fetchAndSync();
      throw err;
    }
  };

  const clear = async () => {
    const payload = await request.cart.clear();
    return syncFromServer(payload);
  };

  return (
    <CartCtx.Provider value={{ cart, add, inc, dec, remove, clear }}>
      {children}
    </CartCtx.Provider>
  );
}
