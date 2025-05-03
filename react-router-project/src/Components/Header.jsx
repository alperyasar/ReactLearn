import { NavLink, Outlet } from "react-router";

export default function Header() {
  return (
    <header id="header">
      <nav>
        <NavLink to="/" end>
          Home
        </NavLink>
        <NavLink to="about">About</NavLink>
        <NavLink to="courses">Courses</NavLink>
        <NavLink to="help">Help</NavLink>
      </nav>
      <Outlet />
    </header>
  );
}
