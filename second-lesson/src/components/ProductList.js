import { product_item } from "../data";
import Product from "./Product";

export default function ProductList() {
  return (
    <>
      <h2 className="title">Product List</h2>
      {product_item.length > 0 ? (
        <div
          className="row row-cols-2 row-cols-md-3 row-cols-xl-4 g-4"
          id="product-list"
        >
          {product_item.map((product, index) => (
            <div className="col" key={index} >
              <Product productObj={product} />
            </div>
          ))}
        </div>
      ): (
        <p>Şu anda satışta olan ürünümüz yok.</p>
      )}
    </>
  );
}
