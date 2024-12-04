import axios from "axios";

export const consignmentApi = {
  async fetchConsignmentList(params?: Record<string, string>) {
    return await axios.get("/parcels", { params });
  },
  async fetchConsignmentById(id: number) {
    return await axios.get(`/parcels/${id}`);
  },
  async editConsignment({ id, ...data }: { id: number } & Record<string, any>) {
    return await axios.put(`/parcels/${id}`, data);
  },
  async editConsignmentBox({
    id,
    ...data
  }: { id: number } & Record<string, string | number>) {
    return await axios.put(`/boxes/${id}`, data);
  },
  async setBoxesEstimate(data: Record<string, any>) {
    return await axios.post(`/boxes/estimate`, data);
  },
  async exportConsignmentExel(id: number) {
    return await axios
      .get(`/parcels/${id}/export-users`, {
        headers: {
          "Content-Type": "application/vnd.ms-excel",
          Accept: "application/vnd.ms-excel",
        },
        responseType: "blob",
        method: "GET",
      })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res?.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "orders-of-parcel.xls");
        document.body.appendChild(link);
        link.click();
      });
  },
};
