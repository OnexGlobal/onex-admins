import { CloseCircleIcon } from "@repo/ui/assets/icons/CloseCircleIcon";
import { FC, useState } from "react";
import { ExpectedOrdersType } from "@repo/types/src/expected-orders-type";
import dayjs from "dayjs";
import { Tag, Tooltip } from "antd";
import { DeactivateModal } from "@repo/ui/components/modals/DeactivateModal";
import { useDeleteExpectedSmartService } from "@repo/ui/hooks/expected/useDeleteExpectedSmartService.hook";
import { Refetch } from "@repo/types";
import { notificationError } from "@repo/ui/helpers/notification";
import Primary from "@repo/ui/components/buttons/Primary";

interface Props {
  expectedByID: ExpectedOrdersType;
  refetch: Refetch;
}

const ServiceParts: FC<Props> = ({ expectedByID, refetch }) => {
  const [deactivate, setDeactivate] = useState(false);
  const { mutate } = useDeleteExpectedSmartService(
    () => {
      setDeactivate(false);
      refetch();
    },
    (e) => notificationError("Errore", e?.response?.data?.message)
  );
  return (
    <div className="flex justify-between items-start gap-[24px 50px] rounded-[12px] bg-white p-[16px] mb-[16px] h-max">
      <div className="border-l-[1px solid] border-oxford-blue-50 pl-[10px] h-max">
        <h1 className="text-info font-[500] text-oxford-blue-400 pb-[4px]">
          Smart Service
        </h1>
        <div className="flex items-center gap-[8px]">
          <img
            alt={"smart name"}
            src={expectedByID?.order_smart_services?.smart_service?.image}
            width="25"
          />
          <h1 className="text-info text-oxford-blue-300">
            {
              expectedByID?.order_smart_services?.smart_service
                ?.current_smart_service?.name
            }
          </h1>
          <Tag className="bg-cyan-50 text-cyan-600">
            {expectedByID?.order_smart_services?.status}
          </Tag>
        </div>
      </div>
      <div className="border-l-[1px solid] border-oxford-blue-50 pl-[16px] h-max">
        <h1 className="text-info font-[500] text-oxford-blue-400 pb-[4px]">
          Added date
        </h1>

        <h1 className="text-info">
          {dayjs(expectedByID?.created_at).format("DD.MM.YYYY, HH:mm")}
        </h1>
      </div>
      <div className="border-l-[1px solid] border-oxford-blue-50 pl-[16px] h-max">
        <h1 className="text-info font-[500] text-oxford-blue-400 pb-[4px]">
          Note
        </h1>

        <h1 className="text-info text-oxford-blue-400">
          {expectedByID?.order_smart_services?.smart_service?.description ||
            expectedByID?.customer_comment ||
            "."}
        </h1>
      </div>
      <div className="border-l-[1px solid] border-oxford-blue-50 pl-[16px] h-max">
        <h1 className="text-info font-[500] text-oxford-blue-400 pb-[4px]">
          Cost
        </h1>

        <h1 className="text-info">
          {`${expectedByID?.order_smart_services?.smart_service?.cost || ""} ₾`}
        </h1>
      </div>

      <Primary
        color="default"
        onClick={() => setDeactivate(true)}
        icon={
          <Tooltip title={"Deactivate service"} placement={"bottom"}>
            <CloseCircleIcon />
          </Tooltip>
        }
        className="ml-auto"
      />
      <DeactivateModal
        useDeactivate={() => mutate({ id: String(expectedByID?.id) })}
        title={"Deactivate service"}
        description={"Are you sure you want to deactivate service"}
        deactivate={deactivate}
        setDeactivate={setDeactivate}
      />
    </div>
  );
};
export default ServiceParts;
