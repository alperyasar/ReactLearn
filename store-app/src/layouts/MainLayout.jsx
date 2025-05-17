import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div className="container">
      <h1>MainLayout</h1>
      <Outlet />
    </div>
  );
}
