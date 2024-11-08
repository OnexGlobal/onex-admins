import { ErrorType, SuccessType } from "@repo/types/src/query";
import { useMutation } from "@tanstack/react-query";
import { membersAndRoles } from "../../services/members-and-roles";

export const useDeleteRole = (onSuccess: SuccessType, onError: ErrorType) => {
  return useMutation({
    mutationKey: ["delete-role"],
    mutationFn: membersAndRoles.deleteRole,
    onSuccess,
    onError,
  });
};
