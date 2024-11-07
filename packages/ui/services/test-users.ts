import axios from "axios";

export const testUserApi = {
  deleteTestUsers: async ({ ids }: { ids: number[] }) => {
    const result = await axios.post("/test-users/delete", {
      user_ids: ids,
    });
    return result.data;
  },
  clearTestUserData: async (ids: number[]) => {
    const result = await axios.post("/test-users/relations/delete", {
      user_ids: ids,
    });
    return result.data;
  },
  makeAsTest: async (id: number) => {
    const result = await axios.post(`/test-users/${id}/add`);
    return result.data;
  },
};
