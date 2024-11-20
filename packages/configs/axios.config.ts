import { notificationError } from "@repo/ui/helpers/notification";
import axios from "axios";

const token = localStorage.getItem("token");
axios.defaults.baseURL = import.meta.env.VITE_APP_BASE_URL_DEV;
axios.defaults.headers.common = {
  ["Authorization"]: token ? `Bearer ${token}` : undefined,
  "X-localization": "en",
  Accept: "application/json",
  "Content-Type": "application/json",
};

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status, data } = error.response;

    if (status === 422) {
      Object.keys(data?.data).forEach((key) =>
        notificationError(data?.message, data?.data?.[key] || "")
      );
    }
    if (status === 401 || status === 500) {
      localStorage.clear();
      window.location.reload();
    }
    return Promise.reject(error);
  }
);
