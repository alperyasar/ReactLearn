import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import App from "./App";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CartProvider } from "./contexts/CartContext";
import { UIContextProvider } from "./components/UI/UIContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <UIContextProvider>
      <ThemeProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </ThemeProvider>
    </UIContextProvider>
  </StrictMode>
);
