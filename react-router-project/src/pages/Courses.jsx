import { useLoaderData } from "react-router";

export default function CoursesPage() {
  const courses = useLoaderData();

  return (
    <>
      <h1>Courses Page</h1>
      <div id="courses">
        {courses.map((course) => (
          <div key={course.id} className="card">
            <img
              src={`http://localhost:5000/images/${course.image}`}
              alt={course.title}
              className="course-image"
            />
            <h4>{course.title}</h4>
            <p>{course.description}</p>
            <a href="#">Detay</a>

            <button className="enroll-button">Enroll</button>
          </div>
        ))}
      </div>
    </>
  );
}

export async function coursesLoader() {
  const response = await fetch("http://localhost:5000/courses");
  if (!response.ok) {
    throw new Error("Failed to fetch courses data.");
  }
  const data = await response.json();
  return data;
}
