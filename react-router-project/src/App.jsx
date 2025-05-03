import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "./pages/Home";
import AboutPage from "./pages/About";
import CoursesPage from "./pages/Courses";
import Header from "./Components/Header";
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
      { path: "courses", element: <CoursesPage /> },
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
