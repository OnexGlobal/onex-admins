import axios from "axios";

export const onlinePaymentApi = {
  async fetchOnlinePaymentList(params?: Record<string, string | number>) {
    return await axios.get("/bog-transactions/get-list", {
      params,
    });
  },
  async refundPayment({ id, ...data }: { id: number }) {
    return await axios.post(`/bog-transactions/${id}/refund`, data);
  },
  async exportExelList(params?: Record<string, string | number>) {
    return await axios
      .get(`/bog-transactions/export`, {
        headers: {
          "Content-Type": "application/vnd.ms-excel",
          Accept: "application/vnd.ms-excel",
        },
        responseType: "blob",
        method: "GET",
        params,
      })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res?.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "OnlinePayment.xls");
        document.body.appendChild(link);
        link.click();
      });
  },
};
