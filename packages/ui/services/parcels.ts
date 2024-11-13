import axios from "axios";

export const parcelsApi = {
  async getParcels(params?: Record<string, string | number | null>) {
    return axios.get("/parcels", {
      params,
    });
  },
};
