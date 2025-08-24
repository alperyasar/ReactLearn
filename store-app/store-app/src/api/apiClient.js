import axios from "axios";
import { toast } from "react-toastify";
import { router } from "../routes/Router";

axios.defaults.baseURL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5001";
axios.defaults.withCredentials = true;

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      toast.error("Network error");
      return Promise.reject(error);
    }

    const { data, status } = error.response;
    const url = error.config?.url || "";
    const isCart = url.startsWith("carts") || url.includes("/carts");

    switch (status) {
      case 400:
        toast.error(data?.message || "Bad request");
        break;
      case 401:
        toast.error(data?.message || "Unauthorized");
        router.navigate("/login");
        break;
      case 403:
        toast.error(data?.message || "Validation error");
        router.navigate("/errors/validation-error", {
          state: { error: data, status },
        });
        break;
      case 404:
        if (isCart) {
          toast.error(data?.message || "Cart item not found");
          break;
        }
        toast.error(data?.message || "Not found");
        router.navigate("/errors/not-found");
        break;
      case 500:
        if (isCart) {
          toast.error(data?.message || "Server error");
          break;
        }
        router.navigate("/errors/server-error", {
          state: { error: data, status },
        });
        break;
      default:
        toast.error(data?.message || error.message);
    }
    return Promise.reject(error);
  }
);

const responseData = (res) => res.data;

const requests = {
  get: (url) => axios.get(url).then(responseData),
  post: (url, body) => axios.post(url, body).then(responseData),
  put: (url, body) => axios.put(url, body).then(responseData),
  del: (url) => axios.delete(url).then(responseData),
};

export const products = {
  get: () => requests.get("products"),
  getById: (id) => requests.get(`products/${id}`),
  create: (body) => requests.post("products", body),
  update: (id, body) => requests.put(`products/${id}`, body),
  delete: (id) => requests.del(`products/${id}`),
};

// src/api/apiClient.js (sadece cart kısmı)
export const cart = {
  get: () => requests.get("carts"),
  addItem: (productId, quantity = 1) =>
    requests.post(
      `carts?productId=${encodeURIComponent(productId)}&quantity=${quantity}`,
      {}
    ),
  removeItem: (productId, quantity = 1) =>
    requests.del(
      `carts?productId=${encodeURIComponent(productId)}&quantity=${quantity}`
    ),
  clear: () => requests.del("carts/clear"), // ← eklendi
};

export default { products, cart };
