import "./App.css";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
// import Footer from "./components/Footer";

function App() {
  function handleNextClick() {
    alert("next");
  }
  function handlePreviousClick() {
    alert("previous");
  }
  return (
    <div>
      <Header />
      <div className="container mt-3">
        <ProductList />
        {/* <Footer /> */}
        <button onClick={handleNextClick()}>Next</button>
        <button
          onClick={() => {
            alert("previous");
          }}
        >
          Previous
        </button>
      </div>
    </div>
  );
}
export default App;
