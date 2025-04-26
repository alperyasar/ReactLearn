export default function CartItem({ item }) {
  return (
    <div className="card mb-3 shadow-sm w-100">
      <div className="card-body d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          <img
            src={`http://localhost:3000/images/${item.image}`}
            alt={item.name}
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
            <button className="btn btn-sm btn-outline-primary">+</button>
            <button className="btn btn-sm btn-outline-secondary">-</button>
          </div>
          <br />
          <button className="btn btn-sm btn-outline-danger">Remove</button>
        </div>
      </div>
    </div>
  );
}
