import { useState } from "react";

export default function Register() {
  const [passwordNotEqual, setPasswordNotEqual] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    const formData = new FormData(e.target);

    console.log(formData.get("email"));
    console.log(formData.get("password"));
    console.log(formData.get("fullname"));
    console.log(formData.getAll("hobbies"));
    console.log(formData.get("repassword"));

    const hobbies = formData.getAll("hobbies");
    const data = Object.fromEntries(formData.entries());
    data.hobbies = hobbies;

    if (data.password !== data.repassword) {
      setPasswordNotEqual(true);
      return;
    }
    setPasswordNotEqual(false);

    e.target.reset();
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="header">
        <h1>Register</h1>
        <p>Please enter your info!</p>
      </div>
      <div className="mb-3">
        <label htmlFor="fullname" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="fullname"
          name="fullname"
          required
          placeholder="Enter your name"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          Email
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          required
        />
      </div>
      <div className="row mb-3">
        <div className="col-6">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            required
            placeholder="Enter your password"
            minLength={8}
            maxLength={20}
            pattern="(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}"
            title="Password must be at least 8 characters long and contain at least one letter and one number."
          />
        </div>
        <div className="col-6">
          <label htmlFor="repassword" className="form-label">
            Re-Password
          </label>
          <input
            type="password"
            className="form-control"
            id="repassword"
            name="repassword"
            required
            placeholder="Re-enter your password"
          />
          {passwordNotEqual && (
            <div className="invalid-feedback d-block">
              Passwords do not match
            </div>
          )}
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="hobbies" className="form-label">
          Hobbies
        </label>
        <div className="card card-body text-bg-light">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="hobbies"
              id="reading"
              value={"reading"}
            />
            <label className="form-check-label" htmlFor="reading">
              Reading
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="hobbies"
              id="coding"
              value={"coding"}
            />
            <label className="form-check-label" htmlFor="coding">
              Coding
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="hobbies"
              id="movies"
              value={"movies"}
            />
            <label className="form-check-label" htmlFor="movies">
              Movies
            </label>
          </div>
        </div>
      </div>

      <div className="mb-3">
        <button className="btn btn-outline-warning me-2">Submit</button>
        <button type="reset" className="btn btn-outline-light">
          Reset
        </button>
      </div>
    </form>
  );
}
