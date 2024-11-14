import { useState } from "react";
import { testUsersAutocomplete } from "../../hooks/testusers/useTestUsersAutocomplete.hook";
import { AddTestUsersModal } from "./AddTestUsersModal";
import TestUsersTopActions from "./TopActions";
import { Button } from "antd";
import { Loader } from "../../components/loader/Loader";
import { TableTestUsers } from "./TableTestUsers";
import NotSearchResult from "../../assets/icons/NoSearchResult";
import plus from "../../assets/images/plus-icon.svg";

export default function TestUsers() {
  const [filters, setFilters] = useState<Record<string, string | number>>({
    is_test: 1,
    page: 1,
  });
  const [addTest, setAddTest] = useState(false);
  const [userInfo, setUserInfo] = useState<Record<
    string,
    string | number
  > | null>(null);
  const {
    usersList = [],
    meta,
    refetch,
    isLoading,
  } = testUsersAutocomplete(filters);

  return (
    <>
      <AddTestUsersModal
        refetch={refetch}
        addTest={addTest}
        setAddTest={setAddTest}
        userInfo={userInfo}
        setUserInfo={setUserInfo}
      />
      <h2 className="text-title mb-[24px]">Test Users</h2>
      <div className="flex items-start justify-between">
        <TestUsersTopActions
          setFilters={setFilters}
          userInfo={userInfo}
          setUserInfo={setUserInfo}
        />
        <Button
          type="default"
          className="bg-oxford-blue-400 text-white"
          onClick={() => setAddTest(true)}
          icon={<img alt="" src={plus} />}
        >
          Add Test user
        </Button>
      </div>
      {isLoading ? (
        <Loader />
      ) : usersList?.length > 0 ? (
        <TableTestUsers
          usersList={usersList}
          reFetch={refetch}
          setFilters={setFilters}
          meta={meta}
        />
      ) : (
        <div className="flex items-center justify-center flex-col h-[80vh]">
          <NotSearchResult />{" "}
          <h2 className="text-[20px] font-[500] text-oxford-blue-300 max-w-[400px]">
            No users found
          </h2>
        </div>
      )}
    </>
  );
}
