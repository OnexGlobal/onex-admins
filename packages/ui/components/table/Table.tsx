import { Table, TableProps } from "antd";
import * as React from "react";
import { Meta } from "@repo/types";

interface OnexTableProps extends TableProps {
  meta: Meta;
  onChangePage?: (value: number) => void;
  onChangePerPage?: (value: number) => void;
}

const OnexTable: React.FC<OnexTableProps> = ({
  meta,
  onChangePage,
  onChangePerPage,
  ...props
}) => {
  return (
    <Table
      {...props}
      pagination={
        meta
          ? {
              total: meta?.total,
              current: meta?.current_page,
              pageSize: meta?.per_page,
              onChange: onChangePage,
              onShowSizeChange: (_, value) => {
                if (onChangePerPage) onChangePerPage(value);
              },
              className: "pr-[12px]",
            }
          : false
      }
    />
  );
};

export default OnexTable;
