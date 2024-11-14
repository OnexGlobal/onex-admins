import { AppVersionsFilter } from "@repo/types/src/app-versions";
import axios from "axios";

interface Values {
  [key: string]: string | number | any[] | boolean;
}
export const appVersionsApi = {
  fetchAppVersions: async (filters?: AppVersionsFilter) =>
    await axios("/api-versions", { params: filters }),
  createVersion: async (values: Values) =>
    await axios.post(`/api-versions`, values),
  editVersion: async (id?: number, values?: Values) =>
    await axios.put(`/api-versions/${id}`, values),
  deleteVersion: async (id: number) =>
    await axios.delete(`/api-versions/${id}`),
};
