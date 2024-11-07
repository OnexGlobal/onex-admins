import { PermissionObject } from "@repo/types/src/permissions";

export const PermissionFinder = (
  permissions: PermissionObject[],
  findElement: string
) => {
  return permissions?.find((permission) => permission.name == findElement);
};
