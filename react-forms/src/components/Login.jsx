import { useRef, useState } from "react";

export default function Login() {
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const email = useRef();
  const password = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    const emailValue = email.current.value;
    const passwordValue = password.current.value;

    setEmailError(false);
    setPasswordError(false);
    const isEamilInvalid = (emailValue) => {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(emailValue);
    };

    const isPasswordInvalid = (passwordValue) => {
      const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      return regex.test(passwordValue);
    };

    if (!isEamilInvalid(emailValue)) {
      setEmailError(true);
      return;
    }
    if (!isPasswordInvalid(passwordValue)) {
      setPasswordError(true);
      return;
    }

    console.log("Form Submitted");
    setEmailError(false);
    setPasswordError(false);

    email.current.value = "";
    password.current.value = "";
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="header">
        <h1>Login</h1>
        <p>Please enter your login and password!</p>
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
          ref={email}
        />
        {emailError && (
          <div className="invalid-feedback d-block">Email is not valid</div>
        )}
      </div>
      <div className="mb-4">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="password"
          name="password"
          ref={password}
        />
        {passwordError && (
          <div className="invalid-feedback d-block">
            Password must be at least 8 characters long and contain at least one
            letter and one number.
          </div>
        )}
      </div>
      <div className="mb-3">
        <button className="btn btn-outline-warning me-2" onClick={handleSubmit}>
          Submit
        </button>
        <button className="btn btn-outline-light">Reset</button>
      </div>
    </form>
  );
}
