import { Recipient } from "@repo/types/src/users";
import { useState } from "react";
import useGetRecipients from "../../hooks/recipients/useGetRecipients.hook";
import MembersSearch from "./SearchMembers";
import { Loader } from "../../components/loader/Loader";
import { TableMembers } from "./TableMembers";
import { NotFound } from "../../components/table/NotFound";
import { SearchCircleIcon } from "../../assets/icons/SearchCircleIcon";
import { Button } from "antd";
import AddMembersModal from "./AddMembersModal";
import CreateRoleModal from "../Roles/CreateRoleModal";

interface Props {
  role_edit: boolean;
}

export default function Members({ role_edit }: Props) {
  const [searchKey, setSearchKey] = useState("user_info");
  const [searchValue, setSearchValue] = useState("");
  const [query, setQuery] = useState<Record<string, number | string>>({
    is_parent: 1,
    has_role: 1,
  });
  const [addMembers, setAddMembers] = useState<Recipient["user"] | boolean>(
    false
  );
  const [createRole, setCreateRole] = useState(false);
  const handleSearch = () => {
    if (searchValue) {
      setQuery({ is_parent: 1, has_role: 1, [searchKey]: searchValue });
    } else {
      setQuery({ is_parent: 1, has_role: 1 });
    }
  };
  const {
    recipients: usersList = [],
    refetch,
    meta,
    isLoading,
  } = useGetRecipients(query);
  const reset = () => {
    setSearchValue("");
    setQuery({ is_parent: 1, has_role: 1 });
  };
  return (
    <>
      <h1 className="text-title mb-[24px]">Members</h1>

      <MembersSearch
        setSearchKey={setSearchKey}
        setSearchValue={setSearchValue}
        searchValue={searchValue}
        searchKey={searchKey}
        handleSearch={handleSearch}
        setAdd={setAddMembers}
        reset={reset}
      />

      {isLoading ? (
        <Loader />
      ) : usersList?.length > 0 ? (
        <TableMembers
          usersList={usersList}
          setAddMembers={setAddMembers}
          meta={meta}
          role_edit={role_edit}
          setQuery={setQuery}
        />
      ) : (
        <NotFound
          icon={<SearchCircleIcon />}
          title={"No members found"}
          text={
            searchValue
              ? `Your search “${searchValue}” did not match any information. Please try again.`
              : "Once there will be members they will appear here"
          }
          reset={
            searchValue ? (
              <Button type="default" htmlType="reset" onClick={reset}>
                Reset
              </Button>
            ) : (
              ""
            )
          }
        />
      )}
      <AddMembersModal
        refetch={refetch}
        addMembers={addMembers}
        setAddMembers={setAddMembers}
        setCreateRole={setCreateRole}
      />
      <CreateRoleModal createRole={createRole} setCreateRole={setCreateRole} />
    </>
  );
}
