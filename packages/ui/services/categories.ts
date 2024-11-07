import axios from "axios";

export const categoriesApi = {
  async getCategoriesService(type: number | string) {
    return axios.get(`categories?type=${type}`);
  },
};
