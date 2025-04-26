// src/components/Cart.jsx
import { useContext, useEffect } from "react";
import Modal from "./UI/Modal";
import { CartContext } from "../contexts/CartContext";
import { UIContext } from "./UI/UIContext";
import CartItem from "./UI/CartItem";

export default function Cart() {
  const { items, clearCart } = useContext(CartContext);
  const { UIProgress, hideCart, showCheckout } = useContext(UIContext);

  const cartTotal = items.reduce((t, i) => t + i.price * i.quantity, 0);

  useEffect(() => {
    if (UIProgress === "cart") document.activeElement.blur();
  }, [UIProgress]);

  return (
    <Modal open={UIProgress === "cart"}>
      <header className="modal-header">
        <h2>Cart</h2>
      </header>

      {items.length === 0 ? (
        <div className="modal-body">
          <p className="alert alert-danger">Your cart is empty.</p>
        </div>
      ) : (
        <>
          <ul className="list-group list-group-flush">
            {items.map((item) => (
              <li className="list-group-item" key={item.id}>
                <CartItem item={item} />
              </li>
            ))}
          </ul>
          <div className="p-3">
            <strong>Total:</strong> {cartTotal.toFixed(2)}₺
          </div>
        </>
      )}

      <footer className="modal-footer">
        <div className="text-end w-100">
          {items.length > 0 && (
            <>
              <button
                onClick={clearCart}
                className="btn btn-warning me-2 btn-sm"
              >
                Clear Cart
              </button>
              <button
                onClick={showCheckout}
                className="btn btn-primary me-2 btn-sm"
              >
                Checkout
              </button>
            </>
          )}
          <button onClick={hideCart} className="btn btn-danger btn-sm">
            Close
          </button>
        </div>
      </footer>
    </Modal>
  );
}
