import axios from "axios";

const headers: Record<string, string> = {
  "X-localization": "en",
  Accept: "application/json",
  "Content-Type": "application/json",
};

if (localStorage.getItem("token")) {
  headers["Authorization"] = `Bearer ${localStorage.getItem("token") || null}`;
}
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const {
      status,
      config: { url },
      data,
    } = error.response;

    console.log(data, "error.response");
    if (
      status === 500 &&
      url !== "login" &&
      data?.message?.includes("Unauthenticated.")
    ) {
      localStorage.removeItem("token");
      window.location.pathname = "/login";
    }

    return Promise.reject(error);
  }
);
axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_URL_DEV;
axios.defaults.headers.common = headers;

export default axios;
