import { useQuery } from "@tanstack/react-query";
import { consignmentApi } from "../../services/consignment";

export const useConsignmentById = (id: number | null) => {
  const {
    isLoading,
    data: consignment,
    refetch: reFetchConsignment,
  } = useQuery({
    queryKey: ["consignment_id", id],
    queryFn: () => consignmentApi.fetchConsignmentById(id),
    staleTime: Infinity,
    select: ({ data }) => data.data,
    enabled: !!id,
  });
  return {
    isLoading,
    consignment,
    reFetchConsignment,
  };
};
