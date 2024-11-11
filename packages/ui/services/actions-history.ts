import axios from "axios";

export const actionsApi = {
  async fetchActionsHistory(params: object) {
    return await axios.get("/activity-logs", { params });
  },
  async fetchSubjectTypes() {
    return await axios.get("/activity-logs/subject-type/list");
  },
};
