import { useQuery } from "@tanstack/react-query";
import { membersAndRoles } from "../../services/members-and-roles";

export const useFetchRoles = (params?: object) => {
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["fetch-roles-list", params],
    queryFn: () => membersAndRoles.getRoles(params),
    staleTime: Infinity,
    select: ({ data }) => {
      const roles = data?.data?.data?.map(
        (rol: { id: number; name: string }, i: number) => ({
          ...rol,
          key: i,
          value: rol?.id || "",
          label: rol?.name.replaceAll("-", " ") || "",
        })
      );
      const meta = data?.data?.meta;
      return { roles, meta };
    },
  });
  return {
    isLoading,
    roles: data?.roles,
    meta: data?.meta,
    refetch,
  };
};
