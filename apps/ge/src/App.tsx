import { Sidebar } from "@repo/ui";

import { Route, Routes } from "react-router-dom";
import { sidebar } from "./utils/constants/sidebar";
const App = () => {
  return (
    <Sidebar menu={sidebar()}>
      <Routes>
        <Route path="/" element={<div>Dashboard</div>} />
      </Routes>
    </Sidebar>
  );
};

export default App;
