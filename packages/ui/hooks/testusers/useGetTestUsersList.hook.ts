import axios from "axios";

export const useGetTestUsersList = async (
  params: Record<string, string | number>
) =>
  await axios
    .get(`/users/export`, {
      params,
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
      link.setAttribute("download", "test-users.xls");
      document.body.appendChild(link);
      link.click();
    });
