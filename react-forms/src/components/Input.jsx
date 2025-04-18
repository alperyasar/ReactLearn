import { isEmailValid, isPasswordValid } from "../utils/validations";

export default function Input({ labelText, id, error, ...props }) {
  // O anki input değerinin geçerli olup olmadığı
  const isValid = (() => {
    if (id === "email") return isEmailValid(props.value);
    if (id === "password") return isPasswordValid(props.value);
    return true; // başka alanlar için
  })();

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {labelText}
      </label>
      <input className="form-control" id={id} {...props} />
      {error && !isValid && (
        <div className="invalid-feedback d-block">{error}</div>
      )}
    </div>
  );
}

// export default function Input({ labelText, id, error, ...props }) {
//     return (
//       <div className="mb-3">
//         <label htmlFor={id} className="form-label">
//           {labelText}
//         </label>
//         <input className="form-control" id={id} {...props} />
//         {error &&
//           <div className="invalid-feedback d-block">{error}</div>
//         }
//       </div>
//     );
//   }
