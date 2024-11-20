import { useQuery } from "@tanstack/react-query";
import { onlinePaymentApi } from "../../services/online-payment";
import { Meta, Refetch } from "@repo/types";
import { OnlinePaymentItem } from "@repo/types/src/online-payment";
export const useOnlinePaymentList = (
  params: Record<string, string | number>
): {
  isLoading: boolean;
  paymentList: OnlinePaymentItem[];
  meta: Meta;
  refetch: Refetch;
} => {
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
