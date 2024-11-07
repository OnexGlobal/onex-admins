import { useMutation } from "@tanstack/react-query";
import { balanceApi } from "../../services/balance";

export const useAddBankTransfer = ({ ...props }) => {
  return useMutation({
    mutationKey: ["send-to-hub"],
    mutationFn: balanceApi.addBankTransfer,
    ...props,
  });
};
