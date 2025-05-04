import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import CoursesPage, { coursesLoader } from "./pages/Courses";
import Header from "./Components/Header";
import Help from "./Components/HelpPage";
import FAQPage from "./pages/help/FAQPage";
import ContactPage from "./pages/help/ContactPage";
import CoursesDetailsPage, {
  coursesDetailsLoader,
} from "./Components/CoursesDetails";
import CourseCreate from "./Components/CourseCreate";
import CourseEdit from "./Components/CourseEdit";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Header />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "home", element: <HomePage /> },
      { path: "about", element: <AboutPage /> },
      {
        path: "courses",
        children: [
          { index: true, element: <CoursesPage />, loader: coursesLoader },
          {
            path: ":courseId",
            element: <CoursesDetailsPage />,
            loader: coursesDetailsLoader,
          },
          { path: "create", element: <CourseCreate /> },
          { path: ":courseId/edit", element: <CourseEdit /> },
        ],
      },

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

function App() {
  return <RouterProvider router={router} />;
}

export default App;
