import { useContext, useMemo } from "react";
import { AuthContext } from "./useAuth";

const perm = localStorage.getItem("permissions");

export const usePermission = () => {
  const { user } = useContext(AuthContext);
  const permission_on_first_auth = user?.role[0]?.permissions;
  const permission_bool = useMemo(() => {
    if (!perm && !permission_on_first_auth) return {};
    else {
      let obj: Record<string, boolean> = {};
      const parsed = permission_on_first_auth
        ? permission_on_first_auth
        : JSON.parse(perm as string);
      if (!parsed && !parsed?.length) return {};
      const perm_array: Array<Array<Record<string, string>>> =
        Object.values(parsed);
      if (!perm_array?.length) return obj;
      for (let value of perm_array.flat()) {
        obj[value?.name?.split("-").join("_")] = true;
      }
      return obj;
    }
  }, [perm, user]);

  return permission_bool;
};
