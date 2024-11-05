import { useQuery } from "@tanstack/react-query";
import { customersApi } from "../../services/customers";
import { PrimeUserType } from "@repo/types/src/prime-users-type";

export const usePrimeUsersAutocomplete = (
  query: Record<string, string | number | undefined | null>
) => {
  const { isLoading, refetch, data } = useQuery({
    queryKey: ["users-list-autocomplete", query],
    queryFn: () => customersApi.getUsers(query),
    staleTime: Infinity,

    select: ({ data }) => {
      const userList = data?.data?.data?.map(
        (recipient: PrimeUserType, i: number) => {
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
        }
      );
      const meta = data?.data?.meta;
      return { userList, meta };
    },
    enabled: !!query,
  });
  return { isLoading, usersList: data?.userList, meta: data?.meta, refetch };
};
