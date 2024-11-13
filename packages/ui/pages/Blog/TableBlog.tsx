import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Tag } from "antd";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";

import dayjs from "dayjs";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { BlogType, LanguagesType } from "@repo/types/src/marketing-content";
import { Meta } from "@repo/types";
import { useSortBlogs } from "../../hooks/blog/useSortBlogs.hook";
import { notificationSuccess } from "../../helpers/notification";
import { EditIcon } from "../../assets/icons/EditIcon";
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
  dataSource: BlogType[];
  setDataSource: Dispatch<SetStateAction<BlogType[]>>;
  setBlog: Dispatch<SetStateAction<BlogType | boolean>>;

  languages: LanguagesType[];
  blog_edit?: boolean;
  meta: Meta;
}

const TableBlog: FC<Props> = ({
  dataSource,
  setDataSource = () => {},
  setBlog = () => {},
  languages,
  meta,
  blog_edit,
}) => {
  const [isDrag, setIsDrag] = useState(false);
  const [activeStatus, setActiveStatus] = useState(0);
  const [overStatus, setOverSatus] = useState(0);
  const { mutate } = useSortBlogs(
    (data) => {
      notificationSuccess(`Success`, data?.data?.message);
      setIsDrag(false);
    },
    (e) => {
      console.log(e, "error");
    }
  );

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    setIsDrag(true);
    let localActiveStatus = 0;
    let localOverStatus = 0;
    if (active.id !== over?.id) {
      setDataSource((previous) => {
        const activeIndex = previous.findIndex((b) => {
          setActiveStatus(b?.is_active);
          localActiveStatus = b?.is_active;
          return b?.is_active && b.id === active.id;
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
      const isActiveData = dataSource?.filter((el: BlogType) => el?.is_active);
      dataSource.forEach((el, i) => {
        if (el.is_active) {
          newData.push({
            id: el.id,
            priority: isActiveData?.length - 1 - i + 1,
          });
        }
      });
      mutate({ blog_sort: newData });
    }
  }, [isDrag, activeStatus, overStatus]);

  const openModal = (item: BlogType, index?: number) => {
    const newData = { ...item, language_id: index ? index + 1 : index };
    setBlog(newData);
  };

  const newData = dataSource?.map((el, i) => ({
    key: el.id,
    title: (
      <div className="flex ">
        {el?.is_active ? (
          <span className="text-oxford-blue-200">
            {i < 9 ? "0" + (i + 1) : i + 1}
          </span>
        ) : null}
        <span className={el?.is_active ? "ml-[12px]" : "ml-[28px]"}>
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
                onClick={() => openModal(el, index)}
                src={ml.flag}
                style={{
                  opacity: el?.blogsMl?.find((d) => d.language_id === ml.id)
                    ? "1"
                    : ".5",
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
    edit: blog_edit ? (
      <EditIcon style={{ cursor: "pointer" }} onClick={() => openModal(el)} />
    ) : null,
  }));
  return (
    <div className={"table_wrapper"}>
      <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
        <SortableContext
          // rowKey array
          items={dataSource?.map((d) => d.id) || []}
          strategy={verticalListSortingStrategy}
        >
          <Table
            meta={meta}
            components={{
              body: {
                row: Row,
              },
            }}
            rowKey="key"
            columns={columns || []}
            dataSource={newData}
            pagination={false}
            scroll={{ y: "54vh" }}
          />
        </SortableContext>
      </DndContext>
    </div>
  );
};
export default TableBlog;
