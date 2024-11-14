import axios from "axios";

export const shopsApi = {
  async sortShop(data: object) {
    return await axios.post("/shops/sort-priority", data);
  },

  async fetchShops(params: object) {
    return await axios.get("/shops", { params: { ...params } });
  },

  async isActiveShops({
    id,
    is_active,
  }: {
    id: number;
    is_active: number | boolean;
  }) {
    return await axios.put(`shops/is-active/${id}`, {
      is_active: is_active,
    });
  },
  async deleteShops({ id }: { id?: number }) {
    return await axios.delete(`shops/${id}`);
  },
  async createAndEditShops({
    id,
    formData,
  }: {
    id?: number;
    formData: FormData;
  }) {
    if (id) {
      return await axios.post(`/shops/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } else {
      return await axios.post("/shops", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }
  },
};
