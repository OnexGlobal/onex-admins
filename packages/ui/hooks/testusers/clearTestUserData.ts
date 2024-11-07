import { useMutation } from "@tanstack/react-query";
import { testUserApi } from "../../services/test-users";

export const clearTestUserData = ({ ...props }) => {
  return useMutation({
    mutationKey: ["clear-test-users-data"],
    mutationFn: testUserApi.clearTestUserData,
    ...props,
  });
};
