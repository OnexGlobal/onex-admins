import { useState } from "react";
import { useActionsHistory } from "../../hooks/actions-history/useActionsHistory.hook";
import ActionSearch from "./ActionSearch";
import { Loader } from "../../components/loader/Loader";
import { TableActions } from "./TableActions";
import { NotFound } from "../../components/table/NotFound";
import { SearchCircleIcon } from "../../assets/icons/SearchCircleIcon";
import { Button } from "antd";

export default function ActionsHistory() {
  const [filter, setFilter] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const { actionList, meta, isLoading } = useActionsHistory(filter);

  return (
    <>
      <div className="page-title">
        <h1 className="text-title mb-[24px]">Actions history</h1>
      </div>

      <ActionSearch setFilter={setFilter} />

      {isLoading ? (
        <Loader />
      ) : actionList?.length > 0 ? (
        <TableActions
          actionList={actionList}
          setFilter={setFilter}
          meta={meta}
        />
      ) : (
        <NotFound
          title={"No members found"}
          text={
            searchValue
              ? `Your search “${searchValue}” did not match any information. Please try again.`
              : "Once there will be members they will appear here"
          }
          icon={<SearchCircleIcon />}
          reset={
            searchValue ? (
              <Button
                htmlType="reset"
                onClick={() => {
                  setSearchValue("");
                  setFilter({});
                }}
                type="default"
              >
                Reset
              </Button>
            ) : (
              ""
            )
          }
        />
      )}
    </>
  );
}
