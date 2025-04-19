export function themeReducer(state, action) {
  switch (action.type) {
    case "SET_COLOR":
      return { ...state, color: action.payload };
    case "SET_MODE":
      return { ...state, mode: action.payload };
    default:
      return state;
  }
}
