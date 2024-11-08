import { ErrorType, SuccessType } from "@repo/types/src/query";
import { useMutation } from "@tanstack/react-query";
import { membersAndRoles } from "../../services/members-and-roles";

export const useAddNewRole = (
  onSuccess: SuccessType,
  onError: ErrorType = () => {}
) => {
  return useMutation({
    mutationKey: ["create-new-roles"],
    mutationFn: membersAndRoles.createNewRoles,
    onSuccess,
    onError,
  });
};
