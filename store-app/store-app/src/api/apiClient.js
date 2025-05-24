import axios from "axios";
import { toast } from "react-toastify";
import { router } from "../routes/Router"; // v6.16 createBrowserRouter objesi

axios.defaults.baseURL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5001/";

/* ---------------- interceptor ---------------- */
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (!error.response) {
      toast.error("Network error");
      return Promise.reject(error);
    }

    const { data, status } = error.response;

    switch (status) {
      case 400:
        toast.error(data.message || "Bad request");
        break;
      case 401:
        toast.error(data.message || "Unauthorized");
        router.navigate("/login");
        break;
      case 403:
        toast.error(data.message || "Validation error");
        router.navigate("/errors/validation-error", {
          state: { error: data, status },
        });
        break;
      case 404:
        toast.error(data.message || "Not found");
        router.navigate("/errors/not-found");
        break;
      case 500:
        router.navigate("/errors/server-error", {
          state: { error: data, status },
        });
        break;
      default:
        toast.error(data.message || error.message);
    }
    return Promise.reject(error);
  }
);

/* ---------------- tiny helper ---------------- */
const resData = (p) => p.then((r) => r.data);
const get = (url) => resData(axios.get(url));
const post = (url, d) => resData(axios.post(url, d));
const put = (url, d) => resData(axios.put(url, d));
const del = (url) => resData(axios.delete(url));

export const products = {
  get: () => get("/products"),
  getById: (id) => get(`/products/${id}`),
  create: (d) => post("/products", d),
  update: (id, d) => put(`/products/${id}`, d),
  delete: (id) => del(`/products/${id}`),
};

export const errors = {
  get400: () => get("/errors/bad-request"),
  get401: () => get("/errors/unauthorized"),
  get403: () => get("/errors/validation-error"),
  get404: () => get("/errors/not-found"),
  get500: () => get("/errors/server-error"),
};

export default { products, errors };
