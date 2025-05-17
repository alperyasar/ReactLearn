import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import HomePage from "./pages/Home";
import ProductsPage from "./pages/Products";
import CartsPage from "./pages/Carts";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import ProductsDetailsPage from "./pages/ProductsDetailsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "home",
        element: <HomePage />,
      },
      {
        path: "products",
        children: [
          {
            index: true,
            element: <ProductsPage />,
          },
          {
            path: ":id",
            element: <ProductsDetailsPage />,
          },
        ],
      },
      {
        path: "carts",
        element: <CartsPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <RegisterPage />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}
export default App;
