import { useState } from "react";

export default function useInput(initialValues) {
  const [values, setValues] = useState(initialValues);

  const [isEdited, setIsEdited] = useState(false);

  function handleInputBlur() {
    setIsEdited(true);
  }
  function handleInputChange(e) {
    setValues(e.target.value);
    setIsEdited(false);
  }

  return {
    values,
    isEdited,
    handleInputBlur,
    handleInputChange,
  };
}
