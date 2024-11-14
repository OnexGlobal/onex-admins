import { useQuery } from "@tanstack/react-query";
import { ordersApi } from "@repo/ui/services/orders";

export default function useGetOrders(
  filters: Record<string, string | number | undefined | boolean> | null
) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["get-orders", filters],
    queryFn: () => ordersApi.getOrdersService(filters),
    staleTime: Infinity,
    select: ({ data }) => {
      const orders = data?.data.data;
      const meta = data.data.meta;
      return { orders, meta };
    },
    enabled: !!filters,
  });
  return {
    orders: data?.orders,
    meta: data?.meta,
    isLoading,
    refetch,
  };
}
