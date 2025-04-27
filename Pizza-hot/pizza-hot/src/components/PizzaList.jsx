import Pizza from "./Pizza";
import useFetch from "../hooks/useFetch";

const config = {
  method: "GET",
};

export default function PizzaList() {
  const { data, loading, error } = useFetch(
    "http://localhost:3000/pizzas",
    config
  );

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "30vh" }}
      >
        <div className="text-center">
          <div
            className="spinner-border text-primary"
            role="status"
            style={{ width: "4rem", height: "4rem" }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
          <div className="mt-3">
            <h5>Yükleniyor...</h5>
          </div>
        </div>
      </div>
    );
  }
  if (error) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "30vh" }}
      >
        <div
          className="alert alert-danger d-flex align-items-center"
          role="alert"
          style={{ maxWidth: "30rem" }}
        >
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          <div>
            <strong>Hata:</strong> {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pizza-list">
      <div className="row row-cols-2 row-cols-md-3 row-cols-xl-4 g-4">
        {data.map((pizza) => (
          <div className="col" key={pizza.id}>
            <Pizza pizza={pizza} key={pizza.id} />
          </div>
        ))}
      </div>
    </div>
  );
}
