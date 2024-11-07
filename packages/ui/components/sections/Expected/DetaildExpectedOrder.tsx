import { useState } from "react";
import useSingleExpected from "@repo/ui/hooks/expected/useSingleExpected.hook";
import BackArrowIcon from "@repo/ui/assets/icons/BackArrowIcon";
import AddSmartService from "@repo/ui/pages/Expected/AddSmartService";
import dayjs from "dayjs";
import { DetailsOrder } from "./Details/DetailsOrder";
import { EditExpectedOrder } from "./EditExpectedOrder";
import { Drawer } from "antd";

interface DetailProps {
  status?: boolean;
  setStatus: (val: string | boolean) => void;
  deactivateModalStatus?: boolean;

  id: number | string | null;
}

export default function DetailsExpectedOrder({
  status,
  setStatus,
  id,
}: DetailProps) {
  const [editable, setEditable] = useState(false);
  const { expectedByID, isLoading, refetch } = useSingleExpected(id);
  const [addService, setAddService] = useState(false);

  return (
    <Drawer
      onClose={() => setStatus(false)}
      open={status}
      width={addService ? "700px" : "70%"}
      styles={{
        header: { display: "none" },
        footer: { borderTop: "none" },
        body: { background: "#f9fafb" },
      }}
      footer={
        <div className="flex justify-between items-center">
          <BackArrowIcon
            onClick={() => setStatus(false)}
            className="cursor-pointer"
          />
          <div className="flex items-center gap-[8px]">
            <h1 className="text-info text-oxford-blue-100">
              Updated by Name at
            </h1>
            <h1 className="text-info text-oxford-blue-200">
              {dayjs(expectedByID?.created_at || "01.01.1001").format(
                "DD.MM.YYYY, HH:mm"
              )}
            </h1>
            <h1 className="text-info text-oxford-blue-100">{`| ID ${id}`}</h1>
          </div>
        </div>
      }
    >
      {addService ? (
        <AddSmartService
          id={id}
          setAddService={setAddService}
          expectedByID={expectedByID}
        />
      ) : editable ? (
        <EditExpectedOrder
          expectedByID={expectedByID}
          setEditable={setEditable}
          refetch={refetch}
          setStatus={setStatus}
        />
      ) : (
        <DetailsOrder
          expectedByID={expectedByID}
          setEditable={setEditable}
          setAddService={setAddService}
          refetch={refetch}
          isLoading={isLoading}
        />
      )}
    </Drawer>
  );
}
