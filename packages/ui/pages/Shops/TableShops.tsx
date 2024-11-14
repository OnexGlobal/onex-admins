import { Meta } from "@repo/types";
import { ShopsType } from "@repo/types/src/marketing-content";
import { Button, Tag, Tooltip } from "antd";
import { Dispatch, SetStateAction, useState } from "react";
import { Special } from "../../assets/icons/shop-features/special";
import { BuyForMe } from "../../assets/icons/shop-features/buy-for-me";
import { Dropify } from "../../assets/icons/shop-features/dropify";
import { Video } from "../../assets/icons/shop-features/video";
import { Blog } from "../../assets/icons/shop-features/blog";
import { OneClick } from "../../assets/icons/shop-features/one-click";
import { EditIcon } from "../../assets/icons/EditIcon";
import { SortModal } from "./SortModal";
import Table from "../../components/table/Table";

const columns = [
  {
    title: "Shop",
    dataIndex: "shop",
    key: "shop",
  },
  {
    title: "Country",
    dataIndex: "country",
    key: "country",
  },
  {
    title: "Features",
    dataIndex: "features",
    key: "features",
  },
  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    width: 200,
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    width: 120,
  },
  {
    title: " ",
    dataIndex: "edit",
    key: "edit",
    width: 70,
  },
];

interface Props {
  data: ShopsType[];
  setShop: Dispatch<SetStateAction<ShopsType | boolean>>;
  setFilters: Dispatch<SetStateAction<object>>;
  meta: Meta;
  shop_edit?: boolean;
}

const TableShops = ({
  data,
  setShop = () => {},
  setFilters = () => {},
  meta,
  shop_edit,
}: Props) => {
  const [openModal, setOpenModal] = useState(false);
  const dataSource = data?.map((shop, i) => ({
    key: i,
    shop: (
      <div className="flex items-center gap-[12px]">
        <img src={shop?.logo} alt={shop?.name} width={60} height={50} />
        <span>{shop?.name}</span>
      </div>
    ),
    country: (
      <div className="flex items-center gap-[12px]">
        <img
          src={`${shop?.warehouse?.round_flag}`}
          alt={shop?.name}
          width={28}
          height={28}
        />
        <span>{shop?.warehouse?.country}</span>
      </div>
    ),
    features: (
      <div className="flex">
        {!!shop?.is_special && (
          <Tooltip title={"Special"} placement={"bottom"} color={"#0A2540"}>
            <Special />
          </Tooltip>
        )}
        {!!shop?.is_buyforme && (
          <Tooltip title={"Buy For Me"} placement={"bottom"} color={"#0A2540"}>
            <BuyForMe />
          </Tooltip>
        )}
        {!!shop?.is_dropify && (
          <Tooltip title={"Dropify"} placement={"bottom"}>
            <Dropify />
          </Tooltip>
        )}
        {!!shop?.vlog && (
          <Tooltip title={"Video"} placement={"bottom"}>
            <Video />
          </Tooltip>
        )}
        {!!shop?.blog && (
          <Tooltip title={"Blog"} placement={"bottom"}>
            <Blog />
          </Tooltip>
        )}
        {!!shop?.is_one_click && (
          <Tooltip title={"One Click"} placement={"bottom"}>
            <OneClick />
          </Tooltip>
        )}
      </div>
    ),
    actions: (
      <>
        {!!shop?.for_home_page && (
          <Button onClick={() => setOpenModal(true)} type="default">
            Sort for homepage
          </Button>
        )}
      </>
    ),
    status: (
      <Tag color={shop?.is_active ? "green" : "red"}>
        {shop?.is_active ? "Active" : "Inactive"}
      </Tag>
    ),
    edit: shop_edit ? (
      <EditIcon style={{ cursor: "pointer" }} onClick={() => setShop(shop)} />
    ) : null,
  }));

  return (
    <div>
      <Table
        columns={columns || []}
        dataSource={dataSource}
        meta={meta}
        onChangePage={(page) => setFilters((p) => ({ ...p, page }))}
        onChangePerPage={(per_page) => setFilters((p) => ({ ...p, per_page }))}
      />
      {openModal && <SortModal open={openModal} setOpen={setOpenModal} />}
    </div>
  );
};
export default TableShops;
