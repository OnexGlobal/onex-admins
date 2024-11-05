import axios from "axios";

export const authApi = {
  async login(user: object) {
    const { data } = await axios.post("/login", user);
    axios.defaults.headers.common = {
      Authorization: `Bearer ${data.data.token}`,
    };
    return data;
  },

  async logout() {
    const { data } = await axios.post("/logout");
    return data;
  },
  async useAuthCustomers(data: Record<string, unknown>) {
    return await axios.post(`/login-as/user`, data);
  },
};
