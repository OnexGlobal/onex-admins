import { Alert, Button, Modal, Table } from "antd";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFetchShops } from "../../hooks/shops/useFetchShops.hook";
import { ShopsType } from "@repo/types/src/marketing-content";
import { useSortShops } from "../../hooks/shops/useSortShops.hook";
import {
  notificationError,
  notificationSuccess,
} from "../../helpers/notification";
import TrashIcon from "../../assets/icons/TrashIcon";
import { WarningCircleIcon } from "../../assets/icons/WarningCircleIcon";
import InfoIcon from "../../assets/icons/InfoIcon";
import { Row } from "../../components/elements/Row";

const columns = [
  {
    key: "sort",
    width: 50,
  },
  {
    title: "Shop",
    dataIndex: "shop",
    key: "shop",
  },
  {
    title: "Shop Name",
    dataIndex: "shopName",
    key: "shopName",
  },
  {
    title: "Country",
    dataIndex: "country",
    key: "country",
  },

  {
    title: "Actions",
    dataIndex: "actions",
    key: "actions",
    width: 50,
  },
];

interface Props {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export const SortModal = ({ open, setOpen = () => {} }: Props) => {
  const [isDrag, setIsDrag] = useState(false);
  const { shops = [] } = useFetchShops({ for_home_page: 1 });
  const [activeStatus, setActiveStatus] = useState(0);
  const [overStatus, setOverSatus] = useState(0);
  const [dataSource, setDataSource] = useState<ShopsType[]>([]);
  const { mutate } = useSortShops(
    (data) => {
      notificationSuccess(`Success`, data?.data?.message);

      setIsDrag(false);
    },
    () => {
      notificationError("Sort", "Something went wrong");
    }
  );

  useEffect(() => {
    if (shops?.length) {
      setDataSource(shops);
    }
  }, [shops?.length]);

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    setIsDrag(true);
    let localActiveStatus = 0;
    let localOverStatus = 0;
    if (active.id !== over?.id) {
      setDataSource((previous) => {
        const activeIndex = previous.findIndex((i) => {
          setActiveStatus(i.is_active);
          localActiveStatus = i?.is_active;
          return i?.is_active && i.id === active.id;
        });

        const overIndex = previous.findIndex((i) => {
          setOverSatus(i.is_active);
          localOverStatus = i?.is_active;
          return i?.is_active && i.id === over?.id;
        });
        if (localActiveStatus && localOverStatus) {
          return arrayMove(previous, activeIndex, overIndex);
        } else {
          return previous;
        }
      });
    }
  };

  useEffect(() => {
    const newData: object[] = [];
    if (isDrag && activeStatus && overStatus) {
      const isActiveData = dataSource?.filter((el: ShopsType) => el?.is_active);
      dataSource.forEach((el: ShopsType, i) => {
        if (el.is_active) {
          newData.push({
            id: el.id,
            sorting: isActiveData?.length - 1 - i + 1,
          });
        }
      });
      mutate({ shop_sort: newData });
    }
  }, [isDrag, activeStatus, overStatus]);

  const newData = dataSource?.map((shop, i) => ({
    key: shop?.id,
    shop: (
      <div className="flex items-center gap-[12px]">
        <span className="text-oxford-blue-300">{i < 9 ? i + 1 : i + 1}</span>
        <img
          src={shop?.logo}
          alt={shop?.name}
          style={{
            borderRadius: "50%",
            width: 32,
            height: 32,

            border: "1px solid #E7E9EC",
            objectFit: "contain",
          }}
        />
      </div>
    ),
    shopName: shop?.name,
    country: (
      <div className="flex items-center gap-[12px]">
        <img
          src={`${shop?.warehouse?.round_flag}`}
          alt={shop?.name}
          width={24}
          height={24}
        />
        <span>{shop?.warehouse?.country}</span>
      </div>
    ),
    //@ts-ignore
    status: <span text={"Active"}>Active</span>,
    actions: <TrashIcon color={"#FC4447"} />,
  }));

  return (
    <Modal
      open={!!open}
      title={<WarningCircleIcon />}
      onCancel={() => setOpen(false)}
      footer={false}
    >
      <h2 className="text-info text-black mb-[16px]">
        Sort shops for the homepage
      </h2>

      <Alert
        type="warning"
        showIcon
        icon={<InfoIcon />}
        message="Remove one shop to add new"
        style={{ marginBottom: 16, fontWeight: 300 }}
      />
      <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
        <SortableContext
          items={dataSource.map((d: ShopsType) => d.id)}
          strategy={verticalListSortingStrategy}
        >
          <Table
            components={{
              body: {
                row: Row,
              },
            }}
            rowKey="key"
            columns={columns || []}
            dataSource={newData}
            pagination={false}
            showHeader={false}
            scroll={{ y: 500 }}
          />
        </SortableContext>
      </DndContext>
      <div className="flex justify-between mt-[24px] gap-[16px] [&>button]:flex-1">
        <Button type="default" onClick={() => setOpen(false)}>
          Back
        </Button>
        <Button className="bg-oxford-blue-100">Next</Button>
      </div>
    </Modal>
  );
};
