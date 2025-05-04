import { useState } from "react";
import { useNavigate } from "react-router";

export default function CourseCreate() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
  });
  const navigate = useNavigate();

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    await fetch("http://localhost:5001/courses", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    navigate("/courses");
  }

  return (
    <div className="form-card">
      <h2>Create Course</h2>
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

        <label>Image filename (e.g. 1.jpg)</label>
        <input name="image" value={form.image} onChange={handleChange} />

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
