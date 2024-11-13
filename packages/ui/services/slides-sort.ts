import axios from "axios";

export const slidesApi = {
  async createSlide({ id, formData }: { id?: number; formData: FormData }) {
    if (id) {
      return await axios.post(`/sliders/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } else {
      return await axios.post("/sliders", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }
  },
  async sortSlides(data: object) {
    return await axios.post("/sliders/sort-priority", data);
  },
  async fetchSlides(params: object) {
    return await axios.get("/sliders", { params });
  },

  async isActiveSlide({
    id,
    is_active,
  }: {
    id: number;
    is_active: boolean | number;
  }) {
    return await axios.put(`sliders/is-active/${id}`, {
      is_active: is_active,
    });
  },
  async deleteSlider({ id }: { id: number }) {
    return await axios.delete(`sliders/${id}`);
  },
};
