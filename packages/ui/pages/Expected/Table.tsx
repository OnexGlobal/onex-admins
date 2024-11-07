import { message, Tag, Tooltip } from "antd";
import { ExpectedOrdersType } from "@repo/types/src/expected-orders-type";
import FileIcon from "@repo/ui/assets/icons/FileIcon";
import ExpectedIcon from "@repo/ui/assets/icons/ExpectedIcon";
import { MetaType } from "@repo/types/src/meta-type";
import { PermissionFinder } from "@repo/ui/helpers/permissionFinder";
import { EyeIcon } from "@repo/ui/assets/icons/EyeIcon";
import TrashIcon from "@repo/ui/assets/icons/TrashIcon";
import { Users } from "@repo/types";
import Table from "../../components/table/Table";
import { HTMLAttributes } from "react";

interface Props {
  setStatus: (val: string) => void;
  setId: (val: number | string) => void;
  data?: ExpectedOrdersType[];
  isLoading: boolean;
  filter: Record<string, string | number | undefined | boolean>;
  setFilter: (
    val: Record<string, string | number | boolean | undefined>
  ) => void;
  permissions: [];
  meta: MetaType;
}

export default function ExpectedTable({
  setStatus,
  setId,
  data,
  isLoading,
  filter,
  setFilter,
  permissions,
  meta,
}: Users.CustomersTableType & Props) {
  const [messageApi, contextHolder] = message.useMessage();

  const columns = [
    {
      key: "country",
      dataIndex: "country",
      title: "",
      width: "5%",
    },
    {
      key: "name",
      dataIndex: "name",
      title: "",
      width: "24%",
    },
    {
      key: "tracking",
      dataIndex: "tracking",
      title: "",
      width: "10%",
    },
    {
      key: "invoice",
      dataIndex: "invoice",
      title: "",
      width: "7%",
    },
    {
      key: "shop",
      dataIndex: "shop",
      title: "",
    },
    {
      key: "status",
      dataIndex: "status",
      title: "",
    },
    {
      key: "activeStatus",
      dataIndex: "activeStatus",
      title: "",
    },
    {
      key: "eye",
      dataIndex: "eye",
      title: " ",

      width: 100,
    },
  ];

  const dataSource = data?.map((item: ExpectedOrdersType, i: number) => ({
    key: i,
    id: item.id,
    country: (
      <div className="flex w-[50px]">
        <img src={item?.warehouse?.round_flag} className="w-[24px]" />
        <img className="w-[24px] ml-[8px]" src={item?.dispatch?.icon} />
      </div>
    ),
    name: (
      <div className="flex">
        <h1 className="text-info">{`${item?.recipient?.first_name} ${item?.recipient?.last_name} ${item?.recipient?.user_code}`}</h1>
      </div>
    ),
    tracking: (
      <div
        className="flex flex-col"
        onClick={() => {
          navigator.clipboard.writeText(item.tracking_code);
          messageApi.success("Copied");
        }}
      >
        <div className="flex justify-start flex-nowrap" key={i}>
          <Tooltip
            title="Click to copy"
            color={"#0A2540"}
            overlayInnerStyle={{ fontSize: 12 }}
          >
            <h1 className="text-info">{item.tracking_code}</h1>
          </Tooltip>
        </div>
        <div className="flex justify-start flex-nowrap" key={i}>
          <Tooltip
            title={<span>{item.customer_comment}</span>}
            trigger="hover"
            color={"#0a2540"}
          >
            <h1 className="text-info text-oxford-blue-300 overflow-hidden text-ellipsis whitespace-nowrap max-w-[250px] cursor-pointer relative">
              {item.customer_comment}
            </h1>
          </Tooltip>
        </div>
      </div>
    ),

    invoice: (
      <div className="flex flex-col">
        {item.invoice && (
          <a href={item.invoice.file} target={"_blank"}>
            <div className="flex items-center  flex-nowrap">
              <FileIcon />
              <h1 className="text-info pl-[8px]">Invoice</h1>
            </div>
          </a>
        )}
        <h1 className="text-info text-oxford-blue-300">
          {`${item?.declaration_price || ""} ${
            item?.declaration_currency || ""
          }`}
        </h1>
      </div>
    ),
    shop: (
      <div className="flex justify-start flex-nowrap" key={i}>
        <Tooltip
          title={<span>{item.shop_name}</span>}
          trigger="hover"
          color={"#0a2540"}
        >
          <h1 className="text-info text-oxford-blue-300 overflow-hidden text-ellipsis whitespace-nowrap max-w-[250px] cursor-pointer relative">
            {item.shop_name}
          </h1>
        </Tooltip>
      </div>
    ),
    status: (
      <>
        <div className="flex items-center">
          <ExpectedIcon />
          <div className="flex">
            <h1 className="text-info text-oxford-blue-300 ml-[5px]">
              Expected
            </h1>
            <Tooltip title={item.created_at}>
              <h1 className="text-info ml-[5px] whitespace-nowrap">
                {item.created_at?.substr(0, 10)}
              </h1>
            </Tooltip>
          </div>
        </div>
        {item.order_smart_services && (
          <div className="flex items-center pt-[10px]">
            <img
              src={item?.order_smart_services?.smart_service.image}
              width="25"
            />
            <div className="flex items-center">
              <h1 className="text-info text-oxford-blue-300 ml-[5px]">
                {
                  item?.order_smart_services?.smart_service
                    ?.current_smart_service?.name
                }
              </h1>
              <Tag className="bg-cyan-50 text-cyan-600 ml-[8px]">
                {item?.order_smart_services?.status}
              </Tag>
            </div>
          </div>
        )}
      </>
    ),
    activeStatus: item.is_active ? (
      <Tag className="bg-sea-green-50 text-sea-green-500 ml-[8px]">Active</Tag>
    ) : (
      <Tag className="bg-orange-50 text-orange-600 ml-[8px]">Deleted</Tag>
    ),
    eye: !PermissionFinder(permissions, "expected-view") ? (
      <div className="flex">
        <EyeIcon
          onClick={() => {
            setStatus("detail-drawer");
            setId(item.id);
          }}
          margin={"0 16px 0 0"}
        />

        <TrashIcon
          onClick={() => {
            setId(item.id);
            setStatus("delete");
          }}
        />
      </div>
    ) : (
      ""
    ),
  }));

  return (
    <div className="w-[100%] h-[100%]">
      {contextHolder}

      <Table
        className="w-[100%] custom-table"
        columns={columns}
        dataSource={dataSource}
        loading={isLoading}
        meta={meta}
        onChangePage={(page) => setFilter({ ...filter, page })}
        components={{
          header: {
            wrapper: (props: HTMLAttributes<HTMLTableSectionElement>) => (
              <thead {...props} className="hidden" />
            ),
          },
        }}
      />
    </div>
  );
}
