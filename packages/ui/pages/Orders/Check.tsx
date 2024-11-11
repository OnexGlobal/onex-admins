import CheckTable from "./CheckTable";
import OrdersTopActions from "./TopActions";
import { Tabs } from "antd";
import Search from "antd/es/input/Search";

export default function OrdersCheck() {
  const items = [
    {
      key: "1",
      label: `All`,
    },
    {
      key: "2",
      label: `Checked`,
      children: `Content of Tab Pane 2`,
    },
    {
      key: "3",
      label: `Unchecked`,
      children: `Content of Tab Pane 3`,
    },
  ];

  return (
    <div className="flex flex-col items-start justify-start w-[100%] h-[100%] ">
      <h1 className="text-title mb-[24px]">Orders check</h1>
      <OrdersTopActions setFilters={() => {}} />
      <div className="flex mt-[16px]">
        <Search
          className="w-[330px]"
          enterButton="Check"
          placeholder="Tracking code"
        />
        <Tabs
          className="tabs"
          items={items}
          defaultActiveKey="1"
          style={{ width: "100%" }}
        />
      </div>
      <CheckTable />
    </div>
  );
}
