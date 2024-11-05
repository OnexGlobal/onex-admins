import axios from "axios";
const token = localStorage.getItem("token");
axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_URL_DEV;
axios.defaults.headers.common["Authorization"] = token
  ? `Bearer ${token}`
  : undefined;
