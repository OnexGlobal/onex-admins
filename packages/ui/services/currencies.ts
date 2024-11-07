import axios from "axios";

export const getCurrenciesList = () => {
  return axios.get("/currency-list");
};
