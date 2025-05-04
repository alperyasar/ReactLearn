import { Link, useLoaderData } from "react-router";

export default function CoursesPage() {
  const courses = useLoaderData();

  return (
    <>
      <h1>Courses Page</h1>
      <div id="courses">
        {courses.map((course) => (
          <div key={course.id} className="card">
            <div className="card-image">
              <img
                src={`http://localhost:5001/images/${course.image}`}
                alt={course.title}
              />
            </div>
            <div className="card-content">
              <h4>{course.title}</h4>
              <p>{course.description}</p>
              <div className="actions">
                <button className="enroll-button">Enroll</button>
                <Link to={`/courses/${course.id}`} className="details-link">
                  Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export async function coursesLoader() {
  const response = await fetch("http://localhost:5001/courses");
  if (!response.ok) {
    throw new Error("Failed to fetch courses data.");
  }
  const data = await response.json();
  return data;
}
