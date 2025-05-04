import { createBrowserRouter, RouterProvider } from "react-router";

import Header from "./Components/Header";
import CoursesLayout from "./Components/CoursesLayout";

import HomePage from "./pages/Home";
import AboutPage from "./pages/About";

import CoursesPage, { coursesLoader } from "./pages/Courses";
import CoursesDetailsPage, {
  coursesDetailsLoader,
} from "./Components/CoursesDetails";

import CourseCreate from "./Components/CourseCreate";
import CourseEdit from "./Components/CourseEdit";

import Help from "./Components/HelpPage";
import FAQPage from "./pages/help/FAQPage";
import ContactPage from "./pages/help/ContactPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "home", element: <HomePage /> },
      { path: "about", element: <AboutPage /> },

      /* ---------- COURSES ---------- */
      {
        path: "courses",
        element: <CoursesLayout />,
        children: [
          { index: true, element: <CoursesPage />, loader: coursesLoader },

          { path: "create", element: <CourseCreate /> },

          {
            path: ":courseId",
            children: [
              /* DETAY  ─ loader buraya eklendi */
              {
                index: true,
                element: <CoursesDetailsPage />,
                loader: coursesDetailsLoader,
              },
              /* EDIT  ─ loader da burada paylaşılırsa form yeniden yüklenir */
              {
                path: "edit",
                element: <CourseEdit />,
                loader: coursesDetailsLoader,
              },
            ],
          },
        ],
      },

      /* ---------- HELP ---------- */
      {
        path: "help",
        element: <Help />,
        children: [
          { path: "faq", element: <FAQPage /> },
          { path: "contact", element: <ContactPage /> },
        ],
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
