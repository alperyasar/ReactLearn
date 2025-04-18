import Input from "./Input";
import useInput from "../hooks/useInput";

export default function LoginState() {
  const {
    value: emailValue,
    isEdited: isEmailEdited,
    handleInputChange: handleEmailChange,
    handleInputBlur: handleEmailInputBlur,
  } = useInput("");
  const {
    value: passwordValue,
    isEdited: isPasswordEdited,
    handleInputChange: handlePasswortdInputChange,
    handleInputBlur: handlePasswortdInputBlur,
  } = useInput("");

  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="header">
        <h1>Login</h1>
        <p>Please enter your login and password!</p>
      </div>

      <Input
        labelText={"Email"}
        id="email"
        error={isEmailEdited && "Email is not valid"}
        type="email"
        name="email"
        value={emailValue}
        onBlur={handleEmailChange}
        onChange={handleEmailInputBlur}
      />

      <Input
        labelText={"password"}
        id="password"
        error={
          isPasswordEdited &&
          "Password must be at least 8 characters long and contain at least one letter and one number"
        }
        type="password"
        name="password"
        value={passwordValue}
        onBlur={handlePasswortdInputBlur}
        onChange={handlePasswortdInputChange}
      />

      <div className="mb-3">
        <button className="btn btn-outline-warning me-2" onClick={handleSubmit}>
          Submit
        </button>
        <button className="btn btn-outline-light">Reset</button>
      </div>
    </form>
  );
}
