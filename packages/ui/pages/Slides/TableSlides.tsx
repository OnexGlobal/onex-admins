import React, {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { DragEndEvent } from "@dnd-kit/core";
import { DndContext } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Button, notification, Table, Tag } from "antd";
import { LanguagesType, SlidesType } from "@repo/types/src/marketing-content";
import { EditIcon } from "../../assets/icons/EditIcon";
import dayjs from "dayjs";
import { useMutation } from "@tanstack/react-query";
import { slidesApi } from "../../services/slides-sort";
import { TableDots } from "../../assets/icons/TableDots";

interface RowContextProps {
  setActivatorNodeRef?: (element: HTMLElement | null) => void;
  listeners?: SyntheticListenerMap;
}

const RowContext = React.createContext<RowContextProps>({});

const DragHandle: React.FC = () => {
  const { setActivatorNodeRef, listeners } = useContext(RowContext);
  return (
    <Button
      type="text"
      size="small"
      icon={<TableDots />}
      style={{ cursor: "move" }}
      ref={setActivatorNodeRef}
      {...listeners}
    />
  );
};

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  "data-row-key": string;
}

const Row: React.FC<RowProps> = (props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: props["data-row-key"] });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Translate.toString(transform),
    transition,
    ...(isDragging
      ? {
          position: "relative",
          zIndex: 9999,
          pointerEvents: "none",
          boxShadow: "0px 4px 14px 0px rgba(0, 31, 77, 0.25)",
          borderRadius: "12px",
        }
      : {}),
  };

  const contextValue = useMemo<RowContextProps>(
    () => ({ setActivatorNodeRef, listeners }),
    [setActivatorNodeRef, listeners]
  );

  return (
    <RowContext.Provider value={contextValue}>
      <tr {...props} ref={setNodeRef} style={style} {...attributes} />
    </RowContext.Provider>
  );
};

interface Props {
  dataSource: SlidesType[];
  isActiveData: SlidesType[];
  setDataSource: Dispatch<SetStateAction<SlidesType[]>>;
  setSlider: Dispatch<SetStateAction<SlidesType | boolean>>;
  languages?: LanguagesType[];
}

const TableSlides = ({
  dataSource,
  setDataSource = () => {},
  setSlider = () => {},
  languages = [],
  isActiveData,
}: Props) => {
  const [api, contextHolder] = notification.useNotification();
  const [isDrag, setIsDrag] = useState(false);
  const [activeStatus, setActiveStatus] = useState(0);
  const [overStatus, setOverStatus] = useState(0);
  const { mutate } = useMutation({
    mutationFn: slidesApi.sortSlides,
    onSuccess: (data) => {
      api.success({
        message: `Success`,
        description: data?.data?.message,
        placement: "topRight",
      });
      setIsDrag(false);
    },
    onError: (e) => {
      console.log(e, "error");
    },
  });

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    setIsDrag(true);
    let localActiveStatus = 0;
    let localOverStatus = 0;
    if (active.id !== over?.id) {
      setDataSource((previous) => {
        const activeIndex = previous.findIndex((i) => {
          setActiveStatus(i?.is_active);
          localActiveStatus = i?.is_active;
          return i?.is_active && i.id === active.id;
        });

        const overIndex = previous.findIndex((i) => {
          setOverStatus(i.is_active);
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
    const newData: { id: string | number; priority: number }[] = []; // Explicitly typed array
    if (isDrag && activeStatus && overStatus) {
      dataSource.forEach((el, i) => {
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
    const newData = { ...item, language_id: index };
    setSlider(newData);
  };

  return (
    <DndContext modifiers={[restrictToVerticalAxis]} onDragEnd={onDragEnd}>
      {contextHolder}
      <SortableContext
        items={dataSource.map((i) => i.id)}
        strategy={verticalListSortingStrategy}
      >
        <Table<SlidesType>
          bordered
          rowKey="id"
          components={{ body: { row: Row } }}
          columns={[
            {
              key: "sort",
              width: 50,
              render: (_, record) => (
                <div>{record?.is_active ? <DragHandle /> : null}</div>
              ),
            },
            {
              title: "Title",
              dataIndex: "title",
              key: "title",
              render: (_, record, index) => (
                <div className="flex">
                  {record?.is_active ? (
                    <h1 className="text-info text-oxford-blue-200">
                      {index < 9 ? "0" + (index + 1) : index + 1}
                    </h1>
                  ) : null}
                  <h1
                    className={`text-info ${
                      record?.is_active ? "ml-[12px]" : "ml-[28px]"
                    }`}
                  >
                    {record?.title || ""}
                  </h1>
                </div>
              ),
            },
            {
              title: "Language",
              dataIndex: "language",
              key: "language",
              render: (_, record) => (
                <div className="flex">
                  {languages.map((ml) => (
                    <img
                      key={ml.id}
                      alt={ml.code}
                      src={ml.flag}
                      onClick={() => openModal(record, ml.id)}
                      style={{
                        marginRight: "10px",
                        opacity: record.slidersMl?.some(
                          (d) => d.language_id === ml.id
                        )
                          ? 1
                          : 0.2,
                        cursor: "pointer",
                      }}
                      width="24"
                    />
                  ))}
                </div>
              ),
            },
            {
              title: "Created Date",
              dataIndex: "created_date",
              key: "created_date",
              render: (_, record) => (
                <div className="flex">
                  <h1 className="text-info">
                    {record?.created_at
                      ? dayjs(record?.created_at).format("DD.MM.YYYY") + ","
                      : ""}
                  </h1>
                  <h1 className="text-info ml-[4px]">
                    {record?.created_at
                      ? dayjs(record?.created_at).format("HH:mm")
                      : ""}
                  </h1>
                </div>
              ),
            },
            {
              title: "Updated Date",
              dataIndex: "updated_date",
              key: "updated_date",
              render: (_, record) => (
                <div className="flex">
                  <h1 className="text-info">
                    {record?.updated_at
                      ? dayjs(record?.updated_at).format("DD.MM.YYYY") + ","
                      : ""}
                  </h1>
                  <h1 className="text-info ml-[4px]">
                    {record?.updated_at
                      ? dayjs(record?.updated_at).format("HH:mm")
                      : "-"}
                  </h1>
                </div>
              ),
            },
            {
              title: "Status",
              dataIndex: "status",
              key: "status",
              render: (_, record) => (
                <Tag
                  className="ml-[4px]"
                  color={record?.is_active ? "green" : "red"}
                >
                  {record?.is_active ? "Active" : "Inactive"}
                </Tag>
              ),
            },
            {
              title: " ",
              dataIndex: "edit",
              key: "edit",
              width: 70,
              render: (_, record) => (
                <EditIcon
                  style={{ cursor: "pointer" }}
                  onClick={() => openModal(record)}
                />
              ),
            },
          ]}
          dataSource={dataSource}
        />
      </SortableContext>
    </DndContext>
  );
};

export default TableSlides;
