import { Filters } from "@repo/types/src/orders";
import axios from "axios";

export const DownloadExcelService = async (id: string | number) =>
  axios
    .get(`/parcels/${id}/cargo/export-orders`, {
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

export const DownloadOrdersExcelService = async (filters: Filters) => {
  axios
    .get("/orders/export-list", {
      headers: {
        "Content-Type": "application/vnd.ms-excel",
        Accept: "application/vnd.ms-excel",
      },
      responseType: "blob",
      method: "GET",
      params: filters,
    })
    .then((res) => {
      const url = window.URL.createObjectURL(new Blob([res?.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "orders.xls");
      document.body.appendChild(link);
      link.click();
    });
};
