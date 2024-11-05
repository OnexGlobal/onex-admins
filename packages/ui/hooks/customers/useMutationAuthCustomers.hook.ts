import { useMutation } from "@tanstack/react-query";
import { AxiosResponse } from "axios";
import { authApi } from "../../services/authentication";

const D: (data: AxiosResponse<{ data: unknown }>) => void = () => {};
const E: (e?: unknown) => void = () => {};
export const useMutationAuthCustomers = (onSuccess = D, onError = E) => {
  return useMutation({
    mutationKey: [],
    mutationFn: authApi.useAuthCustomers,
    onSuccess: (data) => {
      onSuccess(data);
    },
    onError: (e) => {
      onError(e);
    },
  });
};
