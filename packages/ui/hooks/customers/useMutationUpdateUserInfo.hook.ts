import { useMutation } from "@tanstack/react-query";
import { customersApi } from "../../services/customers";

const D: (data?: unknown) => void = () => {};
export const useMutationUpdateUserInf = (onSuccess = D, onError = D) => {
  return useMutation({
    mutationKey: ["update-user-info"],
    mutationFn: customersApi.updateUserInfo,
    onSuccess: (data) => {
      onSuccess(data);
    },
    onError: (e) => {
      onError(e);
    },
  });
};
