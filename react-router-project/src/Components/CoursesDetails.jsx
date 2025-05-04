import { Link, useLoaderData } from "react-router";

export default function CoursesDetailsPage() {
  const course = useLoaderData();
  if (!course) return <p>Loading...</p>;

  return (
    <div className="course-details">
      <img
        src={`http://localhost:5001/images/${course.image}`}
        alt={course.title}
        className="course-thumb"
      />

      <div className="course-body">
        <h1>{course.title}</h1>
        <p className="course-desc">{course.description}</p>

        <div className="icons">
          <span>
            <i className="fa-regular fa-user"></i>
            {course.users}
          </span>
          <span>
            <i className="fa-regular fa-thumbs-up"></i>
            {course.likes}
          </span>
          <span>
            <i className="fa-regular fa-comment"></i>
            {course.comments}
          </span>
        </div>

        {/* ➜ Edit butonu */}
        <div className="actions" style={{ marginTop: "30px" }}>
          <Link to="edit" className="details-link">
            ✏️ Edit
          </Link>
        </div>
      </div>
    </div>
  );
}

export async function coursesDetailsLoader({ params }) {
  const res = await fetch(`http://localhost:5001/courses/${params.courseId}`);
  if (!res.ok) throw new Error("Failed to fetch course data.");
  return res.json();
}
