import { useMutation } from "@tanstack/react-query";
import { membersAndRoles } from "../../services/members-and-roles";
import { SuccessType } from "@repo/types/src/query";

export const useUpdateRole = (onSuccess: SuccessType, onError: SuccessType) => {
  return useMutation({
    mutationKey: ["update-role"],
    mutationFn: membersAndRoles.updateRole,
    onSuccess,
    onError,
  });
};
