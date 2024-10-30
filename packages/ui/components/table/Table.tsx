import { Table, TableProps } from "antd";
import * as React from "react";
import { Meta } from "@repo/types";

interface OnexTableProps extends TableProps {
  meta?: Meta;
  onChangePage?: (value: number) => void;
  onChangePerPage?: (_: number | null, value: number) => void;
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
      pagination={{
        total: meta?.total,
        current: meta?.current_page,
        pageSize: meta?.per_page,
        onChange: onChangePage,
        onShowSizeChange: onChangePerPage,
        className: "pr-4",
      }}
    />
  );
};

export default OnexTable;
