import { Checkbox, Tooltip } from "antd";
import InArmeniaIcon from "@repo/ui/assets/icons/InArmeniaIcon";
import dayjs from "dayjs";
import ReadyIcon from "@repo/ui/assets/icons/ReadyIcon";
import LockerIcon from "@repo/ui/assets/icons/LockerIcon";
import { OrderData } from "@repo/types/src/orders";
import { Dispatch, SetStateAction } from "react";
import { Meta, Users } from "@repo/types";
import Table from "../../components/table/Table";

interface Props {
  orders: OrderData[];
  tabKey?: string;
  totalWeight?: string;
  totalPrice?: string;
  selectedRowKeys: number[];
  setSelectedRowKeys: Dispatch<SetStateAction<number[]>>;
  meta: Meta;
  setFilter: (
    val: Record<string, string | number | undefined | boolean>
  ) => void;
}

export default function ReceiveTableContent({
  orders,
  tabKey,
  totalWeight,
  totalPrice,
  selectedRowKeys,
  setSelectedRowKeys,
  meta,
  setFilter,
}: Props & Users.CustomersTableType) {
  const columns = [
    {
      key: "id",
      dataIndex: "id",
      title: "",
      width: 100,
    },
    {
      key: "country",
      dataIndex: "country",
      title: "",
    },
    {
      key: "name",
      dataIndex: "name",
      title: "",
    },
    {
      key: "tracking",
      dataIndex: "tracking",
      title: "",
    },
    {
      key: "weight",
      dataIndex: "weight",
      title: "",
    },
    {
      key: "price",
      dataIndex: "price",
      title: "",
    },
    {
      key: "status",
      dataIndex: "status",
      title: "",
    },
    {
      key: "pickup_point",
      dataIndex: "pickup_point",
      title: "",
    },
  ];
  const data = orders?.map((item, i) => ({
    key: item?.id || i,
    id: item?.id || i,
    country: (
      <div>
        <div className="flex items-center">
          <img src={item?.warehouse?.round_flag} height={24} width={24} />
          <div
            style={{ paddingLeft: 8 }}
            id="dispatch"
            data-tip="React-tooltip"
          >
            <img src={item?.dispatch?.icon} height={28} width={28} />
            {/*<FlyIcon />*/}
          </div>
        </div>
        <h1 className="text-info pt-[8px] font-[500]">
          {item?.parcel?.name || ""}
        </h1>
      </div>
    ),
    name: (
      <div className="flex">
        <h1 className="text-info font-[500]">
          {item?.recipient?.first_name +
            " " +
            item?.recipient?.last_name +
            " " +
            item?.recipient?.user_code}
        </h1>
      </div>
    ),
    tracking: (
      <div>
        <h1 className="text-info">{item?.tracking_code || ""}</h1>
        <div className="flex">
          <div>
            <h1 className="text-info text-[12px] pt-[10px] text-oxford-blue-300">
              {item?.customer_comment || ""}
            </h1>
          </div>
        </div>
      </div>
    ),
    weight: (
      <>
        <div>
          <h1 className="text-info">{`${item?.weight || "0"} kg`}</h1>
        </div>
        <div>
          <h1 className="text-info pt-[10px]">
            {`${item?.v_weight || "0"} kg`}
          </h1>
        </div>
      </>
    ),
    price: (
      <>
        <h1 className="text-info pb-[10px] pr-[7px]">
          {`${item?.cost || "0 "} ${import.meta.env.VITE_APP_CURRENCY}`}
        </h1>
        {item?.additional_cost ? (
          <Tooltip title={`Add. cost`}>
            <h1 className="text-info text-oxford-blue-200">
              {item?.additional_cost + import.meta.env.VITE_APP_CURRENCY}
            </h1>
          </Tooltip>
        ) : null}
        <h1 className="text-info text-oxford-blue-300 pt-[10px]">
          {`${item?.declaration_price || ""} ${
            item?.declaration_currency || ""
          }`}
        </h1>
      </>
    ),
    status: (
      <div>
        <div className="flex items-center">
          <InArmeniaIcon />
          <div className="flex">
            <h1 className="text-info text-oxford-blue-300 pl-[5px]">
              In Local country
            </h1>
            <h1 className="text-info pl-[5px]">
              {item?.created_at
                ? dayjs(item?.created_at).format("DD.MM.YYYY")
                : ""}
            </h1>
          </div>
        </div>
        <div className="flex items-center pt-[10px]">
          {item?.ready_for_pickup ? (
            <>
              <ReadyIcon />
              <h1 className="text-info text-green-500 text-[12px] pl-[5px]">
                Ready
              </h1>
            </>
          ) : (
            ""
          )}
        </div>
      </div>
    ),
    pickup_point: (
      <>
        <h1 className="text-info">{item?.pickup_point?.name || ""}</h1>
        <div className="flex mt-[10px]">
          <LockerIcon />
          <h1 className="text-info text-[12px] ml-[5px]">
            {item?.pickup_point?.address || ""}
          </h1>
        </div>
      </>
    ),
  }));

  const rowSelection = {
    selectedRowKeys,
    onChange: (value: unknown) => {
      setSelectedRowKeys(value as number[]);
    },
  };
  const handleSelectAll = (val: boolean) => {
    if (val) {
      const selectedIds: number[] = [];
      orders?.forEach((el) => {
        selectedIds.push(el?.id);
      });
      setSelectedRowKeys(selectedIds);
    } else {
      setSelectedRowKeys([]);
    }
  };
  return (
    <Table
      columns={columns}
      dataSource={data}
      bordered
      meta={meta}
      onChangePage={(page) => setFilter((p) => ({ ...p, page }))}
      onChangePerPage={(per_page) => setFilter((p) => ({ ...p, per_page }))}
      className="w-full"
      rowSelection={rowSelection}
      components={{
        header: {
          wrapper: () => null,
        },
      }}
      title={() => (
        <div className="flex items-center w-full py-[4px]">
          <Checkbox onChange={(e) => handleSelectAll(e.target.checked)} />
          <h1 className="text-info font-[500] text-oxford-blue-300 pr-[16px] pl-[25px]">
            {tabKey}
          </h1>
          <h1 className="text-info text-oxford-blue-200 pr-[8px]">Packages</h1>
          <h1 className="text-info text-oxford-blue-300 pr-[8px]">
            {orders?.length || "0"}
          </h1>
          <h1 className="text-info text-oxford-blue-200 pr-[8px]">
            | Total weight
          </h1>
          <h1 className="text-info text-oxford-blue-300 pr-[8px]">
            {`${totalWeight} kg |`}
          </h1>
          <h1 className="text-info text-oxford-blue-200 pr-[8px]">
            Total price
          </h1>
          <h1 className="text-info text-oxford-blue-300 pr-[8px]">
            {`${totalPrice} ${import.meta.env.VITE_APP_CURRENCY}`}
          </h1>
        </div>
      )}
    />
  );
}
