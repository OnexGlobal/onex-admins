import { Sidebar } from "@repo/ui";

import { Route, Routes } from "react-router-dom";
import { sidebar } from "./utils/constants/sidebar";
import OnexTable from "@repo/ui/components/table/Table";

const App = () => {
  return (
    <Sidebar menu={sidebar()}>
      <Routes>
        <Route path="/" element={<div>Dashboard</div>} />
      </Routes>
      <OnexTable
        data={[
          {
            id: 100201,
            tracking_code: "43179072265100100035",
            status: "at_warehouse",
            ready_for_pickup: 0,
          },

          {
            id: 100200,
            tracking_code: "00340434720016563794",
            status: "at_warehouse",
            ready_for_pickup: 0,
          },
          {
            id: 100199,
            tracking_code: "YQ307694177GB",
            status: "at_warehouse",
            ready_for_pickup: 0,
          },
          {
            id: 100198,
            tracking_code: "OQ946073397GB",
            status: "at_warehouse",
            ready_for_pickup: 0,
          },
          {
            id: 100197,
            tracking_code: "GA03729",
            status: "at_warehouse",
            ready_for_pickup: 0,
          },
          {
            id: 100196,
            tracking_code: "GA03740",
            status: "at_warehouse",
            ready_for_pickup: 0,
          },
          {
            id: 100195,
            tracking_code: "H03CPA0028740030",
            status: "at_warehouse",
            ready_for_pickup: 0,
          },

          {
            id: 100194,
            tracking_code: "T0047A0472147177",
            status: "at_warehouse",
            ready_for_pickup: 0,
          },
          {
            id: 100193,
            tracking_code: "T00B8A0331978307",
            status: "at_warehouse",
            ready_for_pickup: 0,
          },
          {
            id: 100192,
            tracking_code: "C00HHA0525822154",
            status: "at_warehouse",
            ready_for_pickup: 0,
          },
        ]}
      />
    </Sidebar>
  );
};

export default App;
