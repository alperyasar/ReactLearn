import { NavLink, Outlet } from "react-router";

export default function Header() {
  return (
    <div className="container">
      <header id="header">
        <h1>Courses</h1>
        <nav>
          <NavLink to="/" end>
            Home
          </NavLink>
          <NavLink to="about">About</NavLink>
          <NavLink to="courses">Courses</NavLink>
          <NavLink to="help">Help</NavLink>
        </nav>
      </header>
      <main id="main-content">
        <Outlet />
      </main>
    </div>
  );
}
