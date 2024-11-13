import { useQuery } from "@tanstack/react-query";
import { ordersApi } from "@repo/ui/services/orders";

export default function useShowOrder(id: number | string) {
  const {
    data: order,
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["single-order", id],

    queryFn: () => ordersApi.getOrderById(id),

    staleTime: Infinity,
    select: ({ data }) => data?.data,
    enabled: !!id,
  });
  return {
    order,
    refetch,
    isLoading,
  };
}
