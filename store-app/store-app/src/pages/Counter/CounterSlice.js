// src/pages/Counter/CounterSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = { value: 0 };

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByValue: (state, action) => {
      state.value += action.payload;
    },
  },
});

// 👉 Action'ları named export EDİYORUZ
export const { increment, decrement, incrementByValue } = counterSlice.actions;

// 👉 Reducer'ı default export EDİYORUZ
export default counterSlice.reducer;
