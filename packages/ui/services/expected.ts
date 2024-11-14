import axios from "axios";

export const expectedApi = {
  async createExpected(data: unknown) {
    return await axios.post("/order-expected", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  async editExpected({ id, ...formData }: Record<string, string>) {
    return await axios.post(`/order-expected/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
  async deleteExpected({ id }: Record<string, string | null>) {
    return await axios.delete(`/order-expected/${id}`);
  },
  async getExpected(
    filters: Record<string, string | number | undefined | boolean | any>
  ) {
    return await axios.get(
      "/order-expected",
      filters && {
        params: filters,
      }
    );
  },
  async getSingleExpected(id: null | number | string) {
    const { data } = await axios.get(`/order-expected/${id}`);
    return data.data;
  },
  async addExpectedSmartService({
    id,
    serviceId,
  }: {
    id: string | number | null;
    serviceId: number | string | null;
  }) {
    return await axios.post(`/order-expected/${id}/add-smart-service`, {
      service_id: serviceId,
    });
  },
  async deleteExpectedSmartService({ id }: { id: string }) {
    return await axios.post(`/order-expected/${id}/delete-smart-service`);
  },
};
