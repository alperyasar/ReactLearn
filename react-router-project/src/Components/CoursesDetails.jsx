import { useLoaderData } from "react-router";

export default function CoursesDetailsPage() {
  const course = useLoaderData();
  return (
    <>
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
        </div>
      </div>
    </>
  );
}

export async function coursesDetailsLoader({ params }) {
  const { courseId } = params;
  const response = await fetch(`http://localhost:5001/courses/${courseId}`);
  if (!response.ok) {
    throw new Error("Failed to fetch courses data.");
  }
  const data = await response.json();
  return data;
}
