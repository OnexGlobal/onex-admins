import { useQuery } from "@tanstack/react-query";
import { membersAndRoles } from "../../services/members-and-roles";

export const useFetchPermissionsByRoles = (filters: {
  role_id?: number;
  grouped_list: number;
}) => {
  const {
    isLoading,
    data: permissions,
    refetch,
  } = useQuery({
    queryKey: ["fetch-permissions-by-role", filters],
    queryFn: () => membersAndRoles.fetchPermissionsByRole(filters),
    enabled: !!filters.role_id,
    select: ({ data }) => data?.data,
  });
  return {
    isLoading,
    permissions,
    refetch,
  };
};
