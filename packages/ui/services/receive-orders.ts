import axios from "axios";

export const receiveOrdersApi = {
  async receiveOrdersService({
    id,
    ...data
  }: {
    id: number;
    order_ids: number[];
  }) {
    return await axios.post(`users/${id}/orders/mark-as-receive`, data);
  },
  async refillBalanceService(data: object) {
    return await axios.post(`balances/fill-from-bonus`, data);
  },
};
