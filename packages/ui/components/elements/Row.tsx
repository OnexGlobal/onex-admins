import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import React from "react";
import { TableDots } from "../../assets/icons/TableDots";

interface RowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  "data-row-key": string;
}

export const Row = ({ children, ...props }: RowProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props["data-row-key"],
  });
  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Transform.toString(
      transform && {
        ...transform,
        scaleY: 1,
      }
    ),
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
  return (
    <tr {...props} ref={setNodeRef} style={style} {...attributes}>
      {React.Children.map(children, (child) => {
        if (
          (child as React.ReactElement).key === "sort" &&
          (child as React.ReactElement).props?.record?.status?.props?.text ===
            "Active"
        ) {
          return React.cloneElement(child as React.ReactElement, {
            children: (
              <div
                ref={setActivatorNodeRef}
                style={{
                  touchAction: "none",
                  cursor: "move",
                }}
                {...listeners}
              >
                <TableDots />
              </div>
            ),
          });
        }
        return child;
      })}
    </tr>
  );
};
