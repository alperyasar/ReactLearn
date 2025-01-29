export default function Product({ productObj }) {
  if (!productObj.is_active) return null;
  return (
    <div className="card shadow-sm">
      <div className="card-body">
        <img
          className="card-img-top p-2 p-md-3"
          src={productObj.image}
          alt=""
        />
        <h2 className="card-title">{productObj.title}</h2>
        <p className="card-text">{productObj.description}</p>
        {/* <span className={productObj.price < 16000 ? "price-discount" : "price"}>
            {productObj.price}
          </span> */}
        <span className="badge text-bg-success">{productObj.price}</span>
      </div>
    </div>
  );
}
