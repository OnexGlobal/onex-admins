import { useState } from "react";
import { useFetchRoles } from "../../hooks/members-and-roles/useFetchRoles.hook";
import { SearchRoles } from "./SearchRoles";
import { Loader } from "../../components/loader/Loader";
import { NotFound } from "../../components/table/NotFound";
import { SearchCircleIcon } from "../../assets/icons/SearchCircleIcon";
import { RolesCircleIcon } from "../../assets/icons/RolesCircleIcon";
import { RolesTable } from "./RolesTable";
import CreateRoleModal from "./CreateRoleModal";

export default function Roles() {
  const [searchValue, setSearchValue] = useState("");
  const [createRole, setCreateRole] = useState(false);

  const { roles, refetch, isLoading } = useFetchRoles(
    searchValue ? { name: searchValue } : {}
  );

  return (
    <>
      <h1 className="text-title mb-[24px]">Roles</h1>

      <SearchRoles
        setCreateRole={setCreateRole}
        setSearchValue={setSearchValue}
      />

      {isLoading ? (
        <Loader />
      ) : !roles?.length ? (
        <NotFound
          icon={searchValue ? <SearchCircleIcon /> : <RolesCircleIcon />}
          title={searchValue ? "No roles found" : "No roles yet"}
          text={
            searchValue
              ? `Your search ${searchValue} did not match any information. Please try again.`
              : "Once there will be roles they will appear here"
          }
        />
      ) : (
        <RolesTable rolesList={roles} refetchRoles={refetch} />
      )}
      <CreateRoleModal createRole={createRole} setCreateRole={setCreateRole} />
    </>
  );
}
