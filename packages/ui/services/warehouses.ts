import axios from "axios";

export const warehouseApi = {
  async getWareHouses() {
    return axios.get("/warehouses");
  },
};
