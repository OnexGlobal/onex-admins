import axios from "axios";

export const blogApi = {
  async sortBlog(data: object) {
    return await axios.post("/blogs/sort-priority", data);
  },
  async fetchBlog(params: object) {
    return await axios.get("/blogs", { params });
  },
  async isActiveBlog({ id, is_active }: { id: number; is_active: number }) {
    return await axios.put(`blogs/is-active/${id}`, {
      is_active: is_active,
    });
  },
  async deleteBlog({ id }: { id: number }) {
    return await axios.delete(`blogs/${id}`);
  },
  async createAndEditBlog({
    id,
    formData,
  }: {
    id?: number;
    formData: FormData;
  }) {
    if (id) {
      return await axios.post(`/blogs/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    } else {
      return await axios.post("/blogs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
    }
  },
};
