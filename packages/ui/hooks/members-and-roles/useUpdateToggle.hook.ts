import { ErrorType, SuccessType } from "@repo/types/src/query";
import { useMutation } from "@tanstack/react-query";
import { membersAndRoles } from "../../services/members-and-roles";

export const useUpdateToggle = (onSuccess: SuccessType, onError: ErrorType) => {
  return useMutation({
    mutationKey: ["update-activate-toggle"],
    mutationFn: membersAndRoles.updateActivateToggle,
    onSuccess,
    onError,
  });
};
