import { useReducer } from "react";
import { createContext, useState } from "react";
import { themeReducer } from "../reducer/themeReducer";

export const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [state, dispatch] = useReducer(themeReducer, {
    color: "success",
    mode: "light",
  });

  function setColor(color) {
    dispatch({ type: "SET_COLOR", payload: color });
  }

  function setMode(mode) {
    dispatch({ type: "SET_MODE", payload: mode });
  }

  return (
    <ThemeContext.Provider value={{ ...state, setColor, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
}
