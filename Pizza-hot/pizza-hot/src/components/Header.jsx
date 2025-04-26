// src/components/Header.jsx
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { CartContext } from "../contexts/CartContext";
import { UIContext } from "./UI/UIContext";

export default function Header() {
  const { color } = useContext(ThemeContext);
  const { items } = useContext(CartContext);
  const { showCart } = useContext(UIContext);

  const totalCartItems = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <header>
      <nav
        className={`navbar navbar-expand bg-${color} border-bottom border-body`}
        data-bs-theme="dark"
      >
        <div className="container">
          <a href="#" className="navbar-brand">
            🍕 Pizza Hot
          </a>
          <button onClick={showCart} className="btn btn-dark">
            <i className="bi bi-cart3"></i>
            <span className="ms-2">({totalCartItems})</span>
          </button>
        </div>
      </nav>
    </header>
  );
}
