import axios from "axios";

export const auth = {
  login: async (values: Record<string, string>) => {
    const { data } = await axios.post("/login", values);
    return data;
  },
};
