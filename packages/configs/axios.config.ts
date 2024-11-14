import axios from "axios";

const token = localStorage.getItem("token");
axios.defaults.baseURL = "https://stagingbackadmin.onex.ge/api";
axios.defaults.headers.common = {
  ["Authorization"]: token ? `Bearer ${token}` : undefined,
  "X-localization": "en",
  Accept: "application/json",
  "Content-Type": "application/json",
};

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status } = error.response;
    if (status === 500 || status === 401) {
      localStorage.clear();
      window.location.reload();
    }
    return Promise.reject(error);
  }
);
