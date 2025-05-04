import { useLoaderData, useNavigate } from "react-router";
import { useState } from "react";

export default function CourseEdit() {
  const course = useLoaderData(); // loader üst route’ta
  const [form, setForm] = useState(course);
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch(`http://localhost:5001/courses/${course.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    navigate(`/courses/${course.id}`);
  }

  return (
    <div className="form-card">
      <h2>Edit Course</h2>
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input name="title" value={form.title} onChange={handleChange} />

        <label>Description</label>
        <textarea
          name="description"
          rows="5"
          value={form.description}
          onChange={handleChange}
        />

        <label>Image filename</label>
        <input name="image" value={form.image} onChange={handleChange} />

        <button type="submit">Update</button>
      </form>
    </div>
  );
}
