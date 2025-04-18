# 📝 React Forms with Validation

# 📝 React Form Validation App

A React-based application demonstrating form validation techniques, custom hooks, and state management. Built as part of an educational series on modern form handling in React.

---

## ✨ Key Features

- **Login & Register Forms** with real-time validation**:** Includes both uncontrolled (refs-based) and controlled (state-based) form implementations.
- **Custom Validation Hooks** (`useInput`) for form state management**:** Validates email, password strength, matching passwords, and hobby selection.
- **Regex Validation** for:
  - Email format verification
  - Password strength (8+ chars, letter+number)
  - Password matching
  - Mandatory field checks
- **Dynamic Error Messages** with Bootstrap styling
- **Form Reset Functionality**
- **Checkbox Group Handling** for hobbies selection
- Responsive UI with Bootstrap 5

---

## 🖼 Screenshot Demo

![Form Demonstration](https://github.com/alperyasar/ReactLearn/raw/main/react-forms/screenshots/ScreenExplaination.gif))
_Demonstration includes:_

The GIF demonstrates form input validations, error handling, and successful submissions for login and registration forms.

---

## 📚 Topics Covered

- **React State and Ref Management**
- **Form Handling and Validation**
- **Custom React Hooks**
- **Regular Expressions for Validation**

## 🛠 Tech Stack

- React.js (Vite)
- Bootstrap 5 + Icons
- Custom Hooks architecture
- HTML5 Form Validation
- Modern ES6+ Features

---

## 🧩 Component Structure

Copy

Download

```
src/
├── components/
│   ├── Input.jsx       # Reusable input component
│   ├── Login.jsx       # Uncontrolled form demo
│   ├── LoginState.jsx  # Controlled form with hooks
│   └── Register.jsx    # Complex form with validation
├── hooks/
│   └── useInput.js     # Custom form hook
└── utils/
    └── validations.js  # Validation logic
```

---

## 🚀 Getting Started

### 1. Clone Repository

**bash**

Copy

Download

```
git clone https://github.com/your-username/react-forms.git
cd react-forms
```

### 2. Install Dependencies

**bash**

Copy

Download

```
npm install
```

### 3. Start Development Server

**bash**

Copy

Download

```
npm run dev
```

---

## 💡 Key Code Implementations

**Custom Validation Hook (`useInput.js`)**

**javascript**

Copy

Download

```
export default function useInput(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [isEdited, setIsEdited] = useState(false);

  // Handles input changes and validation states
  return { values, isEdited, handleInputBlur, handleInputChange };
}
```

**Reusable Input Component**

**jsx**

Copy

Download

```
<Input
  labelText="Email"
  id="email"
  error={isEmailEdited && "Invalid email format"}
  type="email"
  value={emailValue}
  onBlur={handleEmailBlur}
/>
```

**Password Matching Validation**

**javascript**

Copy

Download

```
// In Register component
if (data.password !== data.repassword) {
  setPasswordNotEqual(true);
  return;
}
```

---

## 🎓 Educational Focus

1. **Form Handling Patterns**
   - Controlled vs Uncontrolled components
   - Custom hook creation
   - Reusable component design
2. **Validation Strategies**
   - Real-time regex validation
   - Cross-field validation (password matching)
   - Error state management
3. **Modern React Practices**
   - Component composition
   - Prop drilling management
   - FormData API usage

---

## 📌 Best Practices Implemented

- Separation of validation logic (`validations.js`)
- Custom hooks for reusable state logic
- Accessibility-friendly form labels
- Responsive grid layouts
- Clean form reset functionality

---

## 🚧 Future Improvements

- Add password strength meter
- Implement OAuth integrations
- Create profile management system
- Add form submission loading states
- Implement CAPTCHA verification

A React-based application demonstrating form validation techniques, custom hooks, and state management. Built as part of an educational series on modern form handling in React.

A React-based application demonstrating form validation techniques, custom hooks, and state management. Built as part of an educational series on modern form handling in React.
