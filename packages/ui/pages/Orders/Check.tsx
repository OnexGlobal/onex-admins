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
    },
    {
      key: "3",
      label: `Unchecked`,
    },
  ];

  return (
    <div className="flex flex-col items-start justify-start w-[100%] h-[100%] ">
      <h1 className="text-title mb-[24px]">Orders check</h1>
      <OrdersTopActions setFilters={() => {}} />
      <div className="w-full flex mt-[16px] items-center">
        <Search
          className="w-[330px]"
          enterButton="Check"
          placeholder="Tracking code"
        />
        <div className="w-max ml-[24px]">
          <Tabs items={items} defaultActiveKey="1" />
        </div>
      </div>
      <CheckTable />
    </div>
  );
}
