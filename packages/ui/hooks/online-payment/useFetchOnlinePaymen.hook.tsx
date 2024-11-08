import { useQuery } from "@tanstack/react-query";
import { onlinePaymentApi } from "../../services/online-payment";

export const useOnlinePaymentList = (
  params: Record<string, string | number>
) => {
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["OnlinePayment", params],
    queryFn: () => onlinePaymentApi.fetchOnlinePaymentList(params),
    staleTime: Infinity,
    select: ({ data }) => {
      const payment = data?.data?.data;
      const meta = data?.data?.meta;
      return { payment, meta };
    },
  });
  return {
    isLoading,
    paymentList: data?.payment,
    meta: data?.meta,
    refetch,
  };
};
