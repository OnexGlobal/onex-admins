import axios from "axios";

export const customersApi = {
  async getUsers(query: Record<string, string | number | undefined | null>) {
    return axios.get(`/users`, {
      params: query,
    });
  },
  async updateUserInfo({ id, data }: Props) {
    return await axios.patch(`/user/${id}/account-details/update`, data);
  },
  async changePasswordService(id?: string | number) {
    return await axios.patch(`/user/${id}/change-password`);
  },
  async updatePrimeUser({
    id,
    status,
  }: Record<string, string | number | null>) {
    const result = await axios.patch(`/users/${id}/prime-status/update`, {
      status: status,
    });
    return result.data;
  },
  async getAccountDetails(id?: string | number) {
    return await axios.get(`/user/${id}/account-details`);
  },
  async getTransactions(id?: string | number) {
    return await axios.get(`/balances?user_id=${id}`);
  },
  async blockUserService(id?: string, reason?: string) {
    return await axios.post("/blocked-account", {
      user_id: id,
      reason,
    });
  },
  async unblockUserService(id: string | number) {
    return await axios.delete(`/blocked-account/${id}`);
  },
};

interface Props {
  id?: string | number;
  data: Record<string, Record<string, string>>;
}


