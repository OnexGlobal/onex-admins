import { useQuery } from "@tanstack/react-query";
import { ordersApi } from "@repo/ui/services/orders";

export default function useGetFailedOrders(filters: Record<string, string>) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["get-failed-orders", filters],
    queryFn: () => ordersApi.getOrdersFailedService(filters),
    staleTime: Infinity,
    select: ({ data }) => data?.data,
  });
  return {
    failedOrders: data?.data,
    meta: data?.meta,
    isLoading,
    refetch,
  };
}
