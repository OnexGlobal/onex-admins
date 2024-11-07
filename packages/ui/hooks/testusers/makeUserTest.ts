import { useMutation } from "@tanstack/react-query";
import { testUserApi } from "../../services/test-users";

export const makeUserTest = ({ ...props }) => {
  return useMutation({
    mutationKey: ["make-test-user"],
    mutationFn: testUserApi.makeAsTest,
    ...props,
  });
};
