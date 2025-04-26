import { useContext } from "react";
import Modal from "./UI/Modal";
import { CartContext } from "../contexts/CartContext";
import CartItem from "./UI/CartItem";

export default function Cart() {
  const { items } = useContext(CartContext);
  const cartTotal = items.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <Modal open={true}>
      <div className="modal-header">
        <h2>Cart</h2>
      </div>
      {items.length === 0 ? (
        <div className="modal-body">
          <p className="text-muted">Your cart is empty.</p>
        </div>
      ) : (
        <ul className="list-group list-group-flush">
          {items.map((item) => (
            <li className="list-group-item" key={item.id}>
              <div className="d-flex justify-content-between align-items-center">
                <CartItem item={item} />
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="modal-footer">
        <div className="modal-actions text-end ">
          <p className="mb-0">
            <strong>Total:</strong> {cartTotal.toFixed(2)}₺
          </p>
          <button className="btn btn-sm btn-outline-primary me-2">
            Checkout
          </button>
          <button className="btn btn-sm btn-outline-danger">Close</button>
        </div>
      </div>
    </Modal>
  );
}
