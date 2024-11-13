import { Meta } from "@repo/types";
import { LanguagesType, SlidesType } from "@repo/types/src/marketing-content";
import { Tag } from "antd";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSortSlide } from "../../hooks/slides/useSortSlide.hook";
import { notificationSuccess } from "../../helpers/notification";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import dayjs from "dayjs";
import { EditIcon } from "../../assets/icons/EditIcon";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { Row } from "../../components/elements/Row";
import Table from "../../components/table/Table";

const columns = [
  {
    key: "sort",
    width: 50,
  },
  {
    title: "Title",
    dataIndex: "title",
    key: "title",
  },
  {
    title: "Language",
    dataIndex: "language",
    key: "language",
  },
  {
    title: "Created date",
    dataIndex: "created_date",
    key: "created_date",
  },
  {
    title: "Updated date",
    dataIndex: "updated_date",
    key: "updated_date",
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
  },
  {
    title: " ",
    dataIndex: "edit",
    key: "edit",
    width: 70,
  },
];

interface Props {
  dataSource: SlidesType[];
  setDataSource: Dispatch<SetStateAction<SlidesType[]>>;
  setSlider: Dispatch<SetStateAction<SlidesType | boolean>>;
  languages: LanguagesType[];
  slider_delete?: boolean;
  meta: Meta;
  slider_edit?: boolean;
}

const TableSlides = ({
  dataSource,
  setDataSource = () => {},
  setSlider = () => {},
  languages,
  slider_edit,
  meta,
}: Props) => {
  const [isDrag, setIsDrag] = useState(false);
  const [activeStatus, setActiveStatus] = useState(0);
  const [overStatus, setOverSatus] = useState(0);
  const { mutate } = useSortSlide((data) => {
    notificationSuccess("Success", data?.data?.message);
    setIsDrag(false);
  });

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
      const isActiveData = dataSource?.filter(
        (el: SlidesType) => el?.is_active
      );
      dataSource.forEach((el: SlidesType, i) => {
        if (el.is_active) {
          newData.push({
            id: el.id,
            priority: isActiveData?.length - 1 - i + 1,
          });
        }
      });
      mutate({ slider_sort: newData });
    }
  }, [isDrag, activeStatus, overStatus]);

  const openModal = (item: SlidesType, index?: number) => {
    const newData = { ...item, language_id: index ? index + 1 : index };
    setSlider(newData);
  };

  const newData = dataSource?.map((el: SlidesType, i) => ({
    key: el?.id,
    title: (
      <div className="flex">
        {el?.is_active ? (
          <span className="text-oxford-blue-200">
            {i < 9 ? "0" + (i + 1) : i + 1}
          </span>
        ) : (
          ""
        )}
        <span className={`${el?.is_active ? "ml-[12px]" : "ml-[28px]"}`}>
          {el?.title}
        </span>
      </div>
    ),
    language: (
      <div className="flex gap-[10px]">
        {languages?.length > 0
          ? languages?.map((ml, index) => (
              <img
                alt={ml.code}
                key={ml.id}
                src={ml.flag}
                onClick={() => openModal(el, index)}
                style={{
                  opacity: el?.slidersMl?.find((d) => d.language_id === ml.id)
                    ? "1"
                    : "0.5",
                  cursor: "pointer",
                }}
                width="24"
              />
            ))
          : ""}
      </div>
    ),

    created_date: (
      <div className="flex gap-[4px]">
        <span>
          {el?.created_at
            ? dayjs(el?.created_at).format("DD.MM.YYYY") + ","
            : ""}
        </span>
        <span className="text-oxford-blue-200">
          {el?.created_at ? dayjs(el?.created_at).format("HH:mm") : ""}
        </span>
      </div>
    ),
    updated_date: (
      <div className="flex gap-[4px]">
        <span>
          {el?.updated_at
            ? dayjs(el?.updated_at).format("DD.MM.YYYY") + ","
            : ""}
        </span>
        <span className="text-oxford-blue-200">
          {el?.updated_at ? dayjs(el?.updated_at).format("HH:mm") : "-"}
        </span>
      </div>
    ),
    status: (
      <Tag color={el?.is_active ? "green" : "red"}>
        {el?.is_active ? "Active" : "Inactive"}
      </Tag>
    ),
    edit: slider_edit ? <EditIcon onClick={() => openModal(el)} /> : null,
  }));

  return (
    <div className={"table_wrapper"}>
      <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
        <SortableContext
          // rowKey array
          items={dataSource.map((d: SlidesType) => d.id)}
          strategy={verticalListSortingStrategy}
        >
          <Table
            components={{
              body: {
                row: Row,
              },
            }}
            meta={meta}
            rowKey="key"
            columns={columns || []}
            dataSource={newData}
            scroll={{ y: "54vh" }}
            pagination={false}
          />
        </SortableContext>
      </DndContext>
    </div>
  );
};
export default TableSlides;
