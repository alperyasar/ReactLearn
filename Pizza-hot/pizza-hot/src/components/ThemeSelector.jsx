const themeColors = [
  "success",
  "danger",
  "primary",
  "secondary",
  "warning",
  "info",
  "light",
  "dark",
];
import { useContext } from "react";
import "./ThemeSelector.css";
import { ThemeContext } from "../contexts/ThemeContext";

export default function ThemeSelector() {
  const { setColor, mode, setMode } = useContext(ThemeContext);

  function toggleMode() {
    setMode(mode === "dark" ? "light" : "dark");
  }
  return (
    <div className="container theme-selector">
      <div className="mode_toggle">
        <i className={`bi bi-moon-stars${mode === "dark" ? "-fill" : ""}`} onClick={toggleMode}></i>
      </div>
      <div className="theme-links">
        {themeColors.map((color) => (
          <span
            className={`bg-${color}`}
            key={color}
            onClick={() => setColor(color)}
          ></span>
        ))}
      </div>
    </div>
  );
}
