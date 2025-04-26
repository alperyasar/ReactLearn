// CartItem.jsx
import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";

export default function CartItem({ item }) {
  const { updateItem, removeItem } = useContext(CartContext);

  const increase = () =>
    updateItem({ id: item.id, quantity: item.quantity + 1 });
  const decrease = () => {
    if (item.quantity > 1) {
      updateItem({ id: item.id, quantity: item.quantity - 1 });
    } else {
      removeItem({ id: item.id });
    }
  };
  const remove = () => removeItem({ id: item.id });

  return (
    <div className="card mb-3 shadow-sm w-100">
      <div className="card-body d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <img
            src={`http://localhost:3000/images/${item.image}`}
            alt={item.title}
            className="rounded me-3"
            style={{ width: "90px", height: "70px", objectFit: "cover" }}
          />
          <div>
            <h5 className="card-title mb-1">{item.title}</h5>
            <p className="card-text mb-1">Quantity: {item.quantity}</p>
            <p className="card-text mb-0">
              Price: {(item.price * item.quantity).toFixed(2)}₺
            </p>
          </div>
        </div>
        <div className="text-end">
          <div className="btn-group mb-2" role="group">
            <button
              onClick={increase}
              className="btn btn-sm btn-outline-primary"
            >
              +
            </button>
            <button
              onClick={decrease}
              className="btn btn-sm btn-outline-secondary"
            >
              –
            </button>
          </div>
          <br />
          <button onClick={remove} className="btn btn-sm btn-outline-danger">
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
