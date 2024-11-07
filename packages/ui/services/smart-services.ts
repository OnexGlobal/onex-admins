import axios from "axios";

export const smartServiceApi = {
  async getSmartServices() {
    return axios.get("/smart-services");
  },
};
