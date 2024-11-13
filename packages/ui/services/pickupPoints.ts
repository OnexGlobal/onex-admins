import axios from "axios";

export const pickupPointApi = {
  async getPickupPoints(params?: object) {
    return axios.get("/pickup-points", { params });
  },
};
