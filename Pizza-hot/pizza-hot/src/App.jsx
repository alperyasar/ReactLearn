import { useContext } from "react";
import Header from "./components/Header";
import PizzaList from "./components/PizzaList";
import ThemeSelector from "./components/ThemeSelector";
import  {ThemeProvider, ThemeContext } from "./contexts/ThemeContext";

export default function App() {

  const { mode } = useContext(ThemeContext);
  return (
    <div className={mode=== "dark" ? "bg-dark text-white" : "bg-light text-dark"}>
      <Header />
      <ThemeSelector />
      <div className="container my-4">
        <PizzaList />
      </div>
    </div>
  );
}
