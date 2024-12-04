import { Meta } from "@repo/types";
import { Consignment } from "@repo/types/src/consignment";
import dayjs from "dayjs";
import { Dispatch, FC, SetStateAction } from "react";
import OnTheWayIcon from "../../assets/icons/OnTheWayIcon";
import EstimateIcon from "../../assets/icons/EstimateIcon";
import { EyeIcon } from "../../assets/icons/EyeIcon";
import { Loader } from "../../components/loader/Loader";
import Table from "../../components/table/Table";

interface Props {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  setId: Dispatch<SetStateAction<number | null>>;
  params: Record<string, string | number>;
  setFilterData: Dispatch<SetStateAction<Record<string, string | number>>>;
  consignmentList: Consignment[];
  meta: Meta;
  isLoading: boolean;
  parcel_view: boolean;
}
const ConsignmentTable: FC<Props> = ({
  setModalOpen,
  setId,
  params,
  setFilterData,
  consignmentList,
  meta,
  isLoading,
  parcel_view,
}) => {
  const columns = [
    {
      key: "parcel",
      dataIndex: "parcel",
      title: "Parcel",
    },
    {
      key: "country",
      dataIndex: "country",
      title: "Country",
    },
    {
      key: "bill",
      dataIndex: "bill",
      title: "Bill",
    },
    {
      key: "forwarder",
      dataIndex: "forwarder",
      title: "Forwarder",
    },
    {
      key: "weight",
      dataIndex: "weight",
      title: "Weight",
    },

    {
      key: "status",
      dataIndex: "status",
      title: "Status",
    },
    {
      key: "eye",
      dataIndex: "eye",
      title: "",
    },
  ];
  const newData = consignmentList?.map((consignment, i) => {
    let weight = 0;
    let v_weight = 0;
    consignment?.boxes?.forEach((box) => {
      weight += Number(box.total_weight);
      v_weight += Number(box.total_v_weight);
    });
    return {
      key: i,
      id: consignment?.id || i,
      parcel: (
        <>
          <p className="text-black text-[14px] pt-[8px] font-[500]">
            {consignment?.name}
          </p>
          <p className="text-oxford-blue-300 text-[14px] pt-[8px] font-[500]">
            {consignment?.id}
          </p>
        </>
      ),
      country: (
        <div>
          <div className="flex item-center">
            <img
              src={consignment?.warehouse?.round_flag}
              height={24}
              width={24}
            />
            <div
              style={{ paddingLeft: 8 }}
              id="dispatch"
              data-tip="React-tooltip"
            >
              {/*<FlyIcon />*/}
              <img src={consignment?.dispatch?.icon} height={28} width={28} />
            </div>
          </div>
        </div>
      ),
      bill: consignment?.air_waybill
        ? consignment?.air_waybill
        : "No Air Way Bill",
      forwarder: (
        <div>
          <p className="text-black text-[14px] pt-[8px] font-[500]">
            {consignment?.freight_forwarder}
          </p>
          <p className="text-oxford-blue-300 text-[14px] pt-[8px] font-[500]">
            {consignment?.comment}
          </p>
        </div>
      ),
      weight: (
        <>
          <p className="text-black text-[14px] pt-[8px] font-[500]">
            {weight ? weight.toFixed(2) + " kg" : "0 kg"}
          </p>
          <p className="text-oxford-blue-300 text-[14px] pt-[8px] font-[500]">
            {v_weight ? v_weight.toFixed(2) + " kg" : ""}
          </p>
        </>
      ),

      status: (
        <div>
          <div className="flex items-center gap-[5px]">
            <OnTheWayIcon />

            <p className="text-oxford-blue-300 text-[14px] font-[500]">
              On the way
            </p>
            <p className="text-black text-[14px] font-[500]">
              {consignment?.on_way_date
                ? dayjs(consignment?.on_way_date).format("DD.MM.YYYY")
                : ""}
            </p>
          </div>
          <div className="flex items-center pt-[10px] gap-[5px]">
            <EstimateIcon />

            <p className="text-black text-[14px] font-[500]">Estimated</p>
            <p className="text-oxford-blue-300 text-[14px] font-[500]">
              {consignment?.estimated_date_to
                ? dayjs(consignment?.estimated_date_to).format("DD.MM.YYYY")
                : ""}
            </p>
          </div>
        </div>
      ),
      eye: parcel_view ? (
        <button
          className="show-details"
          onClick={() => {
            setId(consignment?.id);
            setModalOpen(true);
          }}
        >
          <EyeIcon />
        </button>
      ) : null,
    };
  });

  if (isLoading) return <Loader />;
  return (
    <Table
      loading={false}
      columns={columns}
      dataSource={newData}
      bordered
      meta={meta}
      onChangePage={(page) => setFilterData({ ...params, page })}
    />
  );
};
export default ConsignmentTable;
