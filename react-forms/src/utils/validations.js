export function isEmailValid(value) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(value);
}
export function isPasswordValid(value) {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return regex.test(value);
}
export function isPasswordEqual(value1, value2) {
  return value1 === value2;
}
export function isHobbySelected(hobbies) {
  return hobbies.length > 0;
}
