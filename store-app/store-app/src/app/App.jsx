import { RouterProvider } from "react-router-dom";
import { router } from "../routes/Router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import request from "../api/apiClient";
import { setCart } from "../pages/Carts/CartSlice";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    request.cart
      .get()
      .then((srv) => dispatch(setCart(srv))) // sunucu objesini ver, slice normalize edecek
      .catch(console.error);
  }, [dispatch]);

  return <RouterProvider router={router} />;
}
