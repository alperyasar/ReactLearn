import { NavLink, Outlet } from "react-router";

export default function Help() {
  return (
    <div id="help">
      <h1>Help Page</h1>
      <p>Welcome to the help page!</p>
      <nav>
        <NavLink to="faq">FAQ</NavLink>
        <NavLink to="contact">Contact Us</NavLink>
      </nav>
      <Outlet />
    </div>
  );
}
