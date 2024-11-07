import { Paginated } from "@repo/types";
import { UserType } from "@repo/types/src/users";
import axios from "axios";

type Query = Record<string, string | number> | null;
export const GetUsers = async (
  query?: Query
): Promise<{ data: { data: Paginated<UserType[]> } }> => {
  const data = await axios.get(`/users`, {
    params: query,
  });
  return data;
};
