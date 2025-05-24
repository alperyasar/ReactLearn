// src/routes/router.jsx
import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import HomePage from "../pages/Home";
import ProductsPage from "../pages/Products";
import ProductsDetails from "../pages/Products/Details";
import CartsPage from "../pages/Carts";
import LoginPage from "../pages/Auth/Login";
import RegisterPage from "../pages/Auth/Register";
import ErrorPage from "../pages/Error/ErrorPage";
import ServerErrorPage from "../pages/Error/ServerError";
import NotFoundPage from "../pages/Error/NotFoundPage";
import ValidationErrorPage from "../pages/Error/ValidationErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "home", element: <HomePage /> },
      {
        path: "products",
        children: [
          { index: true, element: <ProductsPage /> },
          { path: ":id", element: <ProductsDetails /> },
        ],
      },
      { path: "carts", element: <CartsPage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      {
        path: "errors",
        children: [
          { index: true, element: <ErrorPage /> },
          { path: "server-error", element: <ServerErrorPage /> },
          { path: "validation-error", element: <ValidationErrorPage /> },
          { path: "not-found", element: <NotFoundPage /> },
        ],
      },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);
