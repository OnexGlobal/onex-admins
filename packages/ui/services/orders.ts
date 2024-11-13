import axios from "axios";

type ID = string | number;

export const ordersApi = {
  async getOrdersService(params: object | null) {
    return await axios.get("/orders", {
      params,
    });
  },

  async getOrderById(id: ID) {
    return await axios.get(`/orders/${id}`);
  },
  async changeOrderRecipient({ id, ...data }: Record<string, string | number>) {
    return await axios.post(`/orders/${id}/change-user`, data);
  },
  async editOrderService({
    id,
    data,
  }: {
    id: ID;
    data: { [key: string]: string | null | number };
  }) {
    return await axios.put(`/orders/${id}`, data);
  },
  async sendToHubOrder(data: object) {
    return await axios.post(`/orders/send-to-hub`, data);
  },
  async refundOrder(id: object) {
    return await axios.post(`/orders/${id}/refund`);
  },
  async getOrdersFailedService(params: Record<string, string>) {
    return await axios.get("/hub-failed-orders", { params: { ...params } });
  },
};
