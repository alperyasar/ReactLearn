# React + Vite

# 📚 React‑Router Courses SPA

A single‑page application that showcases **React Router v6** features (nested routes, loaders, programmatic navigation) on top of a tiny **Express JSON API**.
Create, browse, edit and delete course cards – all styled with a dark UI and animated tab navigation.

---

## Table of Contents

1. [Live Demo / GIF]()
2. [Screenshots]()
3. [Features]()
4. [Tech Stack]()
5. [Folder Structure]()
6. [Getting Started]()
7. [API Endpoints]()
8. [Course Video Chapters]()
9. [Roadmap]()
10. [Contributing]()
11. [License]()

---

## 🎬 Live Demo / GIF

```
![App walkthrough](https://github.com/alperyasar/ReactLearn/tree/main/react-router-project/screenshots/ScreenExplaination.gif)
```

## ✨ Features

- **React Router 6**
  - Nested routes, index routes & dynamic `<span>:courseId</span>` segments
  - **Loader** data‑fetching & `<span>useLoaderData()</span>`
  - `<span>Navigate</span>` helper for redirects after create/update
- **CRUD** operations with **fetch** using JSON payloads
- Persistent store via **file‑based JSON** (`<span>db.json</span>`) – no DB required
- **Context‑free architecture** – state is URL‑driven & remotely fetched
- Responsive, dark themed UI with custom CSS variables
- Active `<span>NavLink</span>` pill indicator & tabbed sub‑navigation
- Re‑usable form card component for _Create_ and _Edit_ views
- Font Awesome icons for user / like / comment stats

---

## 🛠 Tech Stack

| Front‑end       | Back‑end    | Tooling           |
| --------------- | ----------- | ----------------- |
| React 18 (Vite) | Express 4   | Node ≥18          |
| React Router 6  | body‑parser | npm & npx         |
| Font Awesome 6  | uuid        | ESLint + Prettier |

---

## 📂 Folder Structure

```
react-router-project/
├─ course-api/            # Express + JSON storage
│  ├─ data/
│  ├─ routes/             # REST endpoints
│  ├─ util/errors.js
│  ├─ db.json             # ← persisted data
│  └─ app.js              # server entry (port 5001)
├─ public/
├─ src/
│  ├─ Components/         # shared & layout components
│  ├─ pages/              # route screens
│  │  └─ help/
│  ├─ assets/
│  ├─ index.css | main.jsx | App.jsx
│  └─ …
├─ screenshots/           # *.png + *.gif used in README
└─ vite.config.js
```

---

## ⚡ Getting Started

### 1️⃣ Clone & Install

```
# clone
git clone https://github.com/<your-user>/react-router-project.git
cd react-router-project

# install front‑end
npm install

# install API deps
cd course-api && npm install && cd ..
```

### 2️⃣ Run the API

```
cd course-api
node app.js                # ➜ http://localhost:5001
```

### 3️⃣ Run the Vite dev server

```
npm run dev                # ➜ http://localhost:5173
```

> 🔑 The React app expects the API on `<span><strong>http://localhost:5001</strong></span>` – keep it running in another terminal.

---

## 🔌 API Endpoints

| Method | Endpoint     | Description                |
| ------ | ------------ | -------------------------- |
| GET    | /courses     | List all courses           |
| GET    | /courses/:id | Get single course          |
| POST   | /courses     | Add new course             |
| PUT    | /courses/:id | Replace an existing course |
| DELETE | /courses/:id | Remove a course            |

Payload example for **POST /courses**:

```
{
  "title": "React from Scratch",
  "description": "20‑lesson crash course with projects",
  "image": "react.png"
}
```

Back‑end augments each course with `<span>id</span>`, `<span>users</span>`, `<span>likes</span>`, `<span>comments</span>` counters.

## 🎯 Key Functionality

1. **Course Management**
   - Create new courses with image upload
   - Edit existing course details
   - Delete courses
   - View course statistics (users, likes, comments)
2. **Routing Features**
   - Nested routing for course details/edit
   - Dynamic route parameters
   - Protected routes
   - Error handling routes
3. **UI Components**
   - Responsive card layout
   - Form validation
   - Interactive buttons and animations
   - Font Awesome icons integration

## 📚 Educational Content

The project demonstrates:

- React Router v6 features
- REST API integration
- CRUD operations
- Component composition
- Error boundaries
- Nested routing patterns
- Form handling in React

|     |     |     |
| --- | --- | --- |
|     |     | \*  |

# 🗺 Roadmap

Pull Requests are very welcome 💜

---

## 🤝 Contributing

1. Fork the repo & create your feature branch (`<span>git checkout -b feat/awesome</span>`)
2. Commit your changes (`<span>git commit -m 'feat: add awesome'</span>`)
3. Push to the branch (`<span>git push origin feat/awesome</span>`)
4. Open a Pull Request 😎

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
