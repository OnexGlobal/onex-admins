import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { DownloadExcelService } from "../../services/downloadExcel";
import { Button, Drawer } from "antd";
import { Loader } from "../../components/loader/Loader";
import { Consignment } from "../../../types/src/consignment";
import { SendToHubPopover } from "./SendToHubPopover";
import { EditIcon } from "../../assets/icons/EditIcon";
import dayjs from "dayjs";
import NotifyUser from "./notify-user";
import EditConsignment from "./Edit";
import ConsignmentDetailsTable from "./DetailsTable";
import DownloadIcon from "../../assets/icons/DownloadIcon";
import { Refetch } from "@repo/types";
interface Props {
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  consignment: Consignment;
  loading: boolean;
  reFetchConsignment: Refetch;
  reFetchList: Refetch;
  parcel_edit: boolean;
}

const ConsignmentModal: FC<Props> = ({
  modalOpen,
  setModalOpen,
  consignment,
  loading,
  reFetchConsignment,
  reFetchList,
  parcel_edit,
}) => {
  const [editable, setEditable] = useState(false);

  useEffect(() => {
    if (!modalOpen) {
      setEditable(false);
    }
  }, [modalOpen]);

  const importExel = async () => {
    await DownloadExcelService(consignment.id);
  };
  let weight = 0;
  let v_weight = 0;
  consignment?.boxes?.forEach((box) => {
    weight += Number(box.total_weight);
    v_weight += Number(box.total_v_weight);
  });
  return (
    <Drawer
      styles={{ header: { display: "none" } }}
      placement="right"
      onClose={() => setModalOpen(false)}
      open={modalOpen}
      width="80%"
      className="!bg-oxford-blue-25"
    >
      {loading ? (
        <Loader />
      ) : (
        <div>
          <div>
            {!editable ? (
              <>
                <div className="flex items-center justify-between mb-[24px]">
                  <div className="flex items-center gap-[16px]">
                    <img
                      src={consignment?.warehouse?.round_flag}
                      width={24}
                      height={28}
                    />

                    <img
                      src={consignment?.dispatch?.icon}
                      width={28}
                      height={28}
                    />
                    <p className="text-[22px] font-[500] text-black">
                      Consignment
                    </p>
                    <p className="text-[22px] font-[500] text-oxford-blue-400 ">
                      {consignment?.id}
                    </p>
                  </div>
                  <div className="flex gap-[16px]">
                    <SendToHubPopover
                      id={consignment?.id}
                      refetch={reFetchConsignment}
                    />
                    {parcel_edit ? (
                      <Button
                        type="default"
                        icon={<EditIcon />}
                        onClick={() => setEditable(true)}
                      >
                        Edit
                      </Button>
                    ) : null}
                  </div>
                </div>

                <div
                  className="flex gap-[17px] _paper !min-h-0 [&>div:not(:first-child)]:pl-[12px]
[&>div:not(:first-child)]:border-l-[1px] [&>div:not(:first-child)]:border-l-oxford-blue-50 mb-[24px]"
                >
                  <div>
                    <p className="text-oxford-blue-400 text-[14px] font-[500] pb-[4px]">
                      Consignment name
                    </p>
                    <p className="text-black text-[14px] font-[400] pb-[4px]">
                      {consignment?.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-oxford-blue-400 text-[14px] font-[500] pb-[4px]">
                      On the way date
                    </p>
                    <p className="text-black text-[14px] font-[400] pb-[4px]">
                      {consignment?.on_way_date
                        ? dayjs(consignment?.on_way_date).format("DD.MM.YYYY")
                        : ""}
                    </p>
                  </div>
                  {consignment?.estimated_date_to ? (
                    <div>
                      <p className="text-oxford-blue-400 text-[14px] font-[500] pb-[4px]">
                        Estimated delivery date to
                      </p>
                      <p className="text-black text-[14px] font-[400] pb-[4px]">
                        {consignment?.estimated_date_to
                          ? dayjs(consignment?.estimated_date_to).format(
                              "DD.MM.YYYY"
                            )
                          : ""}
                      </p>
                    </div>
                  ) : (
                    ""
                  )}
                  <div>
                    <p className="text-oxford-blue-400 text-[14px] font-[500] pb-[4px]">
                      Air way bill
                    </p>
                    <p className="text-black text-[14px] font-[400] pb-[4px]">
                      {consignment?.air_waybill}
                    </p>
                  </div>
                </div>

                <div className="flex gap-[16px] [&>div]:flex-1 [&>div]:h-fit mb-[24px] [&>div]:p-[16px] [&>div]:rounded-[12px] [&>div]:bg-white">
                  <div>
                    <div
                      className="flex [&>div:not(:first-child)]:pl-[12px]
[&>div:not(:first-child)]:border-l-[1px] [&>div:not(:first-child)]:border-l-oxford-blue-50"
                    >
                      <div className="mr-[16px]">
                        <p className="text-oxford-blue-400 text-[14px] font-[500] pb-[4px]">
                          Freight Forwarder
                        </p>
                        <p className="text-black text-[14px] font-[400] pb-[4px]">
                          {consignment?.freight_forwarder}
                        </p>
                      </div>
                      <div>
                        <p className="text-oxford-blue-400 text-[14px] font-[500] pb-[4px]">
                          Comment
                        </p>
                        <p className="text-black text-[14px] font-[400] pb-[4px]">
                          {consignment?.comment}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div
                      className="flex  [&>div:not(:first-child)]:pl-[12px]
[&>div:not(:first-child)]:border-l-[1px] [&>div:not(:first-child)]:border-l-oxford-blue-50"
                    >
                      <div className="mr-[16px]">
                        <p className="text-oxford-blue-400 text-[14px] font-[500] pb-[4px]">
                          Weight
                        </p>
                        <p className="text-black text-[14px] font-[400] pb-[4px]">
                          {weight ? weight.toFixed(2) + " kg" : "kg"}
                        </p>
                      </div>
                      <div>
                        <p className="text-oxford-blue-400 text-[14px] font-[500] pb-[4px]">
                          V Weight
                        </p>
                        <p className="text-black text-[14px] font-[400] pb-[4px]">
                          {v_weight ? v_weight.toFixed(2) + " kg" : "kg"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <NotifyUser consignment={consignment} />
              </>
            ) : (
              <EditConsignment
                setEditable={setEditable}
                consignment={consignment}
                reFetchConsignment={reFetchConsignment}
              />
            )}
            <ConsignmentDetailsTable
              boxDetails={consignment?.boxes}
              reFetchConsignment={reFetchConsignment}
              reFetchList={reFetchList}
            />
          </div>
          <div className="footer mt-[24px]">
            <div className="flex items-center justify-between">
              <Button
                type="default"
                icon={<DownloadIcon />}
                onClick={importExel}
              >
                Excel
              </Button>

              <div>
                <div className="flex items-center">
                  <div className="flex">
                    <p className="text-oxford-blue-300 text-[14px] font-[500]">
                      Total Items
                    </p>
                    <p className="text-oxford-blue-200 text-[14px] font-[400] pl-[8px]">
                      {consignment?.boxes?.length}
                    </p>
                  </div>
                  <div className="flex">
                    <p className="text-oxford-blue-300 text-[14px] font-[500]">
                      Weight
                    </p>
                    <p className="text-oxford-blue-200 text-[14px] font-[400] pl-[8px]">
                      {`${weight?.toFixed(2) || "0"} kg`}
                    </p>
                  </div>
                  <div className="flex">
                    <p className="text-oxford-blue-300 text-[14px] font-[500]">
                      V weight
                    </p>
                    <p className="text-oxford-blue-200 text-[14px] font-[400] pl-[8px]">
                      {`${v_weight?.toFixed(2) || "0"} kg`}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Drawer>
  );
};
export default ConsignmentModal;
