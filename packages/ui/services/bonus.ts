import axios from "axios";

export const bonusApi = {
  async fetchBonusTypeList() {
    return await axios.get("/bonus-types");
  },
  async fetchBonusList(params?: Record<string, string>) {
    return await axios.get("/bonuses", { params: { ...params } });
  },
  async createBonus(data?: object) {
    return await axios.post(`/bonuses`, data);
  },
  async addBankTransfer(data: Record<string, string>) {
    return await axios.post(`/balances/add-bank-transfer`, data);
  },

  async exportExelList(id: string | number | null) {
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
