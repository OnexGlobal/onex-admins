import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { customersApi } from "../../services/customers";

const D: (data: AxiosResponse<{ data: unknown }>) => void = () => {};
const E: (e?: unknown) => void = () => {};
export const useUpdatePrimeUserStatus = (onSuccess = D, onError = E) => {
  return useMutation({
    mutationKey: ["update-prime-user-status"],
    mutationFn: customersApi.updatePrimeUser,
    onSuccess: (data) => {
      onSuccess(data);
    },
    onError: (e) => {
      onError(e);
    },
  });
};
