import axios from "axios";

axios.defaults.baseURL = "http://localhost:5001/";

const methods = {
  get: (url) => axios.get(url).then((res) => res.data),
  post: (url, data) => axios.post(url, data).then((res) => res.data),
  put: (url, data) => axios.put(url, data).then((res) => res.data),
  delete: (url) => axios.delete(url).then((res) => res.data),
};

const products = {
  get: () => methods.get("/products"),
  getById: (id) => methods.get(`/products/${id}`),
  create: (data) => methods.post("/products", data),
  update: (id, data) => methods.put(`/products/${id}`, data),
  delete: (id) => methods.delete(`/products/${id}`),
};

const requests = {
  products,
};

export default requests;
