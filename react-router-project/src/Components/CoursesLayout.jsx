import { NavLink, Outlet } from "react-router";

export default function CoursesLayout() {
  return (
    <section className="courses-layout">
      <nav className="tabs">
        <NavLink end to="" className="tab">
          All Courses
        </NavLink>
        <NavLink to="create" className="tab">
          Create Course
        </NavLink>
      </nav>

      <div className="tab-content">
        <Outlet />
      </div>
    </section>
  );
}
