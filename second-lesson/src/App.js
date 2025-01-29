import "./App.css";
import Header from "./components/Header";
import ProductList from "./components/ProductList";
// import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Header />
      <div className="container mt-3">
        <ProductList />
        {/* <Footer /> */}
      </div>
    </div>
  );
}
export default App;
