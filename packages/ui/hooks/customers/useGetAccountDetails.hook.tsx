import { useQuery } from "@tanstack/react-query";
import { customersApi } from "../../services/customers";

export default function useGetAccountDetails(id?: string | number) {
  const { data: accountDetails, refetch } = useQuery({
    queryKey: ["get-account-details", id],
    queryFn: () => customersApi.getAccountDetails(id),
    staleTime: Infinity,
    select: ({ data }) => data?.data,
  });

  return { accountDetails, refetch };
}
