import axios from "axios";

export const reportsApi = {
  async fetchReportsList(params: Record<string, string | null>) {
    return await axios.get("/finances/report", { params: { ...params } });
  },

  async exportReportsExelList(
    params: Record<string, string | null | undefined>
  ) {
    return await axios
      .get(`/finances/report/general-export`, {
        params: { ...params },
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
        link.setAttribute("download", "finance-report-export.xls");
        document.body.appendChild(link);
        link.click();
      });
  },
  async exportReportsByTypeExcel(params: Record<string, string>) {
    return await axios
      .get(`/finances/report/export`, {
        params: { ...params },
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
          `${params?.type || ""}_finance-report.xls`
        );
        document.body.appendChild(link);
        link.click();
      });
  },
};
