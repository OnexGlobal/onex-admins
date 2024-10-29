import { useMemo } from "react";

const perm = localStorage.getItem("permissions");

export const usePermission = () => {
  const permission_bool = useMemo(() => {
    if (!perm) return {};
    else {
      let obj: Record<string, boolean> = {};
      const parsed = JSON.parse(perm);
      if (!parsed && !parsed?.length) return {};
      const perm_array: Array<Array<Record<string, string>>> =
        Object.values(parsed);
      if (!perm_array?.length) return obj;
      for (let value of perm_array.flat()) {
        obj[value?.name?.split("-").join("_")] = true;
      }

      return obj;
    }
  }, [perm]);

  return permission_bool;
};
