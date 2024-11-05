import axios from "axios";

export const recipientsApi = {
  async createRecipients(userInfo: PropsQuery) {
    return await axios.post(`/recipients`, userInfo);
  },
  async getRecipients(query?: null | PropsQuery) {
    const { data } = await axios(`/recipients`, {
      params: query,
    });
    return data?.data;
  },
  async updateRecipientService({ id, data }: PropsData) {
    return axios.put(`/recipients/${id}`, data);
  },
};

interface PropsData {
  id?: string | number;
  data: Record<string, string | number | boolean | undefined>;
}

interface PropsQuery {
  query?: null | Record<string, string | number | undefined>;
}
