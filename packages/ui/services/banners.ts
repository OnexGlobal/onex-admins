import axios from "axios";

export const bannersApi = {
  async fetchBanners(params: object) {
    return await axios.get("/header-messages", { params: { ...params } });
  },
  async createAndUpdateBanner({
    id,
    formData,
  }: {
    id?: number;
    formData: FormData;
  }) {
    if (id) {
      return await axios.post(`/header-messages/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } else {
      return await axios.post(`/header-messages`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }
  },

  async isActiveBanner({
    id,
    is_active,
  }: {
    id: number;
    is_active: boolean | number;
  }) {
    return await axios.put(`/header-messages/is-active/${id}`, {
      is_active: is_active,
    });
  },
  async deleteBanner({ id }: { id: number }) {
    return await axios.delete(`/header-messages/${id}`);
  },
  async fetchLanguages() {
    return await axios.get("/languages");
  },
};
