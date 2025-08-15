import { createSlice, createSelector } from "@reduxjs/toolkit";

const initialState = { items: [] };

/** Sunucu sepetini slice formatına çevirir */
export const normalizeServerCart = (srv, base = "http://localhost:5001") =>
  (srv?.cartItems ?? []).map((ci) => ({
    id: ci.product.id,
    title: ci.product.title,
    price: Number(ci.product.price),
    image: `${base}/images/${ci.product.image}`,
    qty: ci.quantity,
    selected: true,
  }));

const slice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCart(state, { payload }) {
      state.items = Array.isArray(payload)
        ? payload
        : normalizeServerCart(payload);
    },
    addItem(state, { payload }) {
      const i = state.items.findIndex((x) => x.id === payload.id);
      if (i >= 0) state.items[i].qty += 1;
      else state.items.push({ ...payload, qty: 1, selected: true });
    },
    inc(state, { payload: id }) {
      const item = state.items.find((x) => x.id === id);
      if (item) item.qty += 1;
    },
    dec(state, { payload: id }) {
      const item = state.items.find((x) => x.id === id);
      if (!item) return;
      item.qty -= 1;
      if (item.qty <= 0) state.items = state.items.filter((x) => x.id !== id);
    },
    remove(state, { payload: id }) {
      state.items = state.items.filter((x) => x.id !== id);
    },
    clear(state) {
      state.items = [];
    },
    toggleSelect(state, { payload: id }) {
      const item = state.items.find((x) => x.id === id);
      if (item) item.selected = !item.selected;
    },
    selectAll(state, { payload: checked }) {
      state.items.forEach((x) => (x.selected = !!checked));
    },
  },
});

export const {
  setCart,
  addItem,
  inc,
  dec,
  remove,
  clear,
  toggleSelect,
  selectAll,
} = slice.actions;

export default slice.reducer;

/* ---------------- Selectors ---------------- */
export const selectCartItems = (s) => s.cart.items;

export const selectUniqueCount = createSelector(
  selectCartItems,
  (items) => items.length
);

export const selectTotalQty = createSelector(selectCartItems, (items) =>
  items.reduce((sum, i) => sum + (i.qty || 0), 0)
);

export const selectTotalPrice = createSelector(selectCartItems, (items) =>
  items.reduce((sum, i) => sum + (i.qty || 0) * Number(i.price || 0), 0)
);

export const selectSelected = createSelector(selectCartItems, (items) =>
  items.filter((i) => i.selected)
);

export const selectSelectedQty = createSelector(selectSelected, (items) =>
  items.reduce((sum, i) => sum + (i.qty || 0), 0)
);

export const selectSelectedPrice = createSelector(selectSelected, (items) =>
  items.reduce((sum, i) => sum + (i.qty || 0) * Number(i.price || 0), 0)
);

export const selectSelectionState = createSelector(selectCartItems, (items) => {
  const total = items.length;
  const selected = items.filter((i) => i.selected).length;
  return {
    checked: total > 0 && selected === total,
    indeterminate: selected > 0 && selected < total,
  };
});
