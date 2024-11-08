import axios from "axios";

export const membersAndRoles = {
  async fetchRolesPermissions() {
    return await axios("/permissions");
  },
  async fetchPermissionsByRole(filters: object) {
    return await axios(`/permissions`, { params: filters });
  },
  async updateRole({
    id,
    ...data
  }: {
    id: number;
    permissions: number[];
    name: string;
  }) {
    return await axios.put(`/roles/${id}`, data);
  },
  async deleteRole({ id }: { id: number }) {
    return await axios.delete(`/roles/${id}`);
  },
  async createNewRoles(data: { name: string; permissions?: number[] }) {
    return await axios.post("/roles", data);
  },
  async getRoles(params?: object) {
    return await axios("/roles", { params });
  },
  async createNewMember({
    id,
    ...data
  }: {
    id: number | null;
    roles?: number[];
  }) {
    return await axios.patch(`/user/${id}/roles/sync`, data);
  },
  async updateActivateToggle(data: object) {
    return await axios.post(`/user/roles/toggle`, data);
  },
};
