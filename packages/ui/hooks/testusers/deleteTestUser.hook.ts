import { useMutation } from "@tanstack/react-query";
import { testUserApi } from "../../services/test-users";

export const deleteTestUserHook = ({ ...props }) => {
  return useMutation({
    mutationKey: ["delete-test-users"],
    mutationFn: testUserApi.deleteTestUsers,
    ...props,
  });
};
