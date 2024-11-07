import axios from "axios";

export const balanceApi = {
  async fetchBalanceList(params?: Record<string, string | number>) {
    return await axios.get("/balances", { params });
  },
  async updateBalance({ id, ...data }: { id?: string | number }) {
    return await axios.put(`/balances/${id}`, data);
  },
  async addBankTransfer(data?: object) {
    return await axios.post(`/balances/add-bank-transfer`, data);
  },
  async fetchBalanceTransferType() {
    return await axios.get(`/balance-transfer-types`);
  },
  async fetchBalancePaymentType() {
    return await axios.get(`/balance-payment-types`);
  },

  async exportExelList(id: number | string | null) {
    if (id)
      return await axios
        .get(`/balances/export-list`, {
          headers: {
            "Content-Type": "application/vnd.ms-excel",
            Accept: "application/vnd.ms-excel",
          },
          responseType: "blob",
          method: "GET",
          params: { user_id: id },
        })
        .then((res) => {
          const url = window.URL.createObjectURL(new Blob([res?.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "balance.xls");
          document.body.appendChild(link);
          link.click();
        });
  },
};
