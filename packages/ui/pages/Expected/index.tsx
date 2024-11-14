import { useEffect, useState } from "react";
import {
  notificationError,
  notificationSuccess,
} from "../../helpers/notification";
import ExpectedTopActions from "./TopActions";
import { DeleteModal } from "../../components/modals/DeleteModal";
import useGetExpected from "../../hooks/expected/useExpecteds.hook";
import { useDeleteExpected } from "../../hooks/expected/useDeleteExpected.hook";
import ExpectedTable from "./Table";
import CreateExpectedDrawer from "./CreateExpected";
import { Status } from "../../../types/index";
import DetailsExpectedOrder from "@repo/ui/components/sections/Expected/DetaildExpectedOrder";
import Primary from "../../components/buttons/Primary";
import { Loader } from "../../components/loader/Loader";

export default function Expected() {
  const [status, setStatus] = useState<Status>(false);
  const [createStatus, setCreateStatus] = useState<boolean | string | number>(
    false
  );
  const [selectedId, setSelectedId] = useState<string | number | null>(null);

  const [filters, setFilters] = useState<Record<
    string,
    string | number | undefined | boolean
  > | null>({
    status: "1",
  });
  const { expectedList, isLoading, meta, refetch } = useGetExpected(filters);
  const [fullNameFromUrl, setFullNameFromUrl] = useState<
    null | string | undefined
  >(null);
  const { mutate: deleteExpected } = useDeleteExpected(
    () => {
      setStatus(false);
      refetch();
      notificationSuccess("Deleted", "expected order deleted successfully");
    },
    (e) =>
      notificationError(
        "Deleted",
        e?.response?.data?.message || "something went wrong"
      )
  );

  useEffect(() => {
    const search = window.location.search;
    if (search) {
      const searchKeys = search.split("=");
      setFullNameFromUrl(searchKeys[1]);
      setFilters({ user_info: decodeURI(searchKeys[1]) });
    }
  }, []);

  return (
    <div className="flex flex-col items-start justify-start w-[100%] h-[100%] ">
      <h1 className="text-title mb-[24px]">Expected</h1>
      <ExpectedTopActions
        setFilters={setFilters}
        fullNameFromUrl={fullNameFromUrl}
      />
      <Primary
        onClick={() => setCreateStatus(true)}
        className="mt-[24px] mb-[24px] bg-oxford-blue-300 hover:!bg-oxford-blue-300"
        variant="solid"
      >
        Create expected
      </Primary>
      {expectedList ? (
        <ExpectedTable
          setStatus={setStatus}
          setId={setSelectedId}
          data={expectedList}
          isLoading={isLoading}
          meta={meta}
          setFilter={setFilters}
          permissions={[]}
        />
      ) : (
        <Loader />
      )}

      <DetailsExpectedOrder
        status={status === "detail-drawer"}
        setStatus={setStatus}
        id={selectedId}
      />

      <CreateExpectedDrawer
        createStatus={createStatus}
        setCreateStatus={setCreateStatus}
        refetch={refetch}
      />
      <DeleteModal
        handleDelete={({ id }) => deleteExpected({ id: String(id) })}
        setDeleted={setStatus}
        deleted={status === "delete"}
        deletedId={selectedId || undefined}
        description={"Are you sure that you want to delete the order"}
        title={"Delete Expected"}
      />
    </div>
  );
}
