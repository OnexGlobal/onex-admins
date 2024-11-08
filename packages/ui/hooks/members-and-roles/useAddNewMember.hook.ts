import { ErrorType, SuccessType } from "@repo/types/src/query";
import { useMutation } from "@tanstack/react-query";
import { membersAndRoles } from "../../services/members-and-roles";

export const useAddNewMember = (onSuccess: SuccessType, onError: ErrorType) => {
  return useMutation({
    mutationKey: ["create-new-member"],
    mutationFn: membersAndRoles.createNewMember,
    onSuccess,
    onError,
  });
};
