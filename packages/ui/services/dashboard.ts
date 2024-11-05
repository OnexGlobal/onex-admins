import { DashboardData, FilterAsProps } from "@repo/types/src/dashboard";
import axios from "axios";

export const GetDashboardData = async (filters: Record<string, string>) => {
  const data = axios.get(`/dashboard`, {
    params: filters,
  });
  return data;
};

export const GetDashboardChartsData = async (filters: FilterAsProps) => {
  return await axios.get(`/dashboard/charts`, {
    params: filters,
  });
};

export const DownloadUnverified = async (
  filters: FilterAsProps,
  dashboardData: DashboardData
) => {
  axios
    .get(`/dashboard/export-unverified`, {
      params: filters,
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
      link.setAttribute(
        "download",
        `unverified-${dashboardData?.current_start_date.substr(
          0,
          10
        )}-${dashboardData?.current_end_date.substr(0, 10)}.xls`
      );
      document.body.appendChild(link);
      link.click();
    });
};
