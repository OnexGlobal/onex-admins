import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import * as React from "react";

type GenericDataType = Record<string, any>;

interface OnexTableProps {
  data: GenericDataType[];
}

const OnexTable: React.FC<OnexTableProps> = ({ data }) => {
  const generateColumns = (
    data: GenericDataType[]
  ): ColumnsType<GenericDataType> => {
    if (data.length === 0) return [];
    return Object.keys(data[0]).map((key) => ({
      title: key.charAt(0).toUpperCase() + key.slice(1).replaceAll("_", " "),
      dataIndex: key,
      key,
    }));
  };

  const columns: ColumnsType<GenericDataType> = generateColumns(data) || [];

  return <Table columns={columns} dataSource={data} rowKey="id" />;
};

export default OnexTable;
