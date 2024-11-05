import { useQuery } from "@tanstack/react-query";
import { customersApi } from "../../services/customers";

export default function useGetTransactions(id?: string | number) {
  const { data: transactions } = useQuery({
    queryKey: ["get-transactions", id],
    queryFn: () => customersApi.getTransactions(id),
    staleTime: Infinity,
    select: ({ data }) => data.data.data,
  });

  return { transactions };
}
