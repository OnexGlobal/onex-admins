import { useQuery } from "@tanstack/react-query";
import { GetUsers } from "../../services/user";

export const testUsersAutocomplete = (
  query: Record<string, string | number> | null
) => {
  const { isLoading, refetch, data } = useQuery({
    queryKey: ["users-list-autocomplete", query],
    queryFn: () => GetUsers(query),
    staleTime: Infinity,
    select: ({ data }) => {
      const userList = data?.data?.data?.map((recipient, i) => {
        return {
          ...recipient,
          key: i,
          id: recipient?.id,
          label: `${recipient?.recipient?.first_name || ""} ${
            recipient?.recipient?.last_name || ""
          } ${recipient?.recipient?.company_name || ""} ${
            recipient?.recipient?.user_code
          }`,
          value: `${recipient?.recipient?.first_name || ""} ${
            recipient?.recipient?.last_name || ""
          } ${recipient?.recipient?.company_name || ""}`,
        };
      });
      const meta = data?.data?.meta;
      return { userList, meta };
    },
    enabled: !!query,
  });
  return { isLoading, usersList: data?.userList, meta: data?.meta, refetch };
};
