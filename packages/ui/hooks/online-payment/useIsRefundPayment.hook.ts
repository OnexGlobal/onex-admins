import { ErrorType, SuccessType } from "@repo/types/src/query";
import { useMutation } from "@tanstack/react-query";
import { onlinePaymentApi } from "../../services/online-payment";

export const useIsRefundPayment = (
  onSuccess: SuccessType,
  onError: ErrorType
) => {
  return useMutation({
    mutationKey: ["reund-payment"],
    mutationFn: onlinePaymentApi.refundPayment,
    onSuccess,
    onError,
  });
};
