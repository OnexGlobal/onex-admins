import { Sidebar } from "@repo/ui";

import { Route, Routes } from "react-router-dom";
import { sidebar } from "./utils/constants/sidebar";
import OnexTable from "@repo/ui/components/table/Table";
import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(15);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios("https://backadmin.onex.ge/api/orders", {
      params: {
        page,
        per_page: perPage,
      },
      headers: {
        Authorization:
          "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczovL2JhY2thZG1pbi5vbmV4LmdlL2FwaS9sb2dpbiIsImlhdCI6MTczMDIwNjA4OSwiZXhwIjoxNzkwMjA2MDI5LCJuYmYiOjE3MzAyMDYwODksImp0aSI6IjN2MHdnNHZyN1ROZ1BXTXYiLCJzdWIiOiIxIiwicHJ2IjoiMjNiZDVjODk0OWY2MDBhZGIzOWU3MDFjNDAwODcyZGI3YTU5NzZmNyIsInVuaXF1ZV9pZCI6ImZmZjFkZTUyLTQ3ZTEtNDA0Mi1hZmZhLTI1NmNiY2RiODRmcSJ9.0atAxPPuHP_4q-oZld9cHHufy7h90jmZ4fdUO6de2LY",
      },
    })
      .then((res) => {
        setData(res?.data?.data);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, perPage]);

  console.log(data?.meta?.total);
  return (
    <Sidebar menu={sidebar()}>
      <Routes>
        <Route path="/" element={<div>Dashboard</div>} />
      </Routes>
      <OnexTable
        dataSource={data?.data}
        columns={[{ dataIndex: "name", title: "Name" }]}
        className={"border border-grey-50 rounded"}
        meta={data?.meta}
        onChangePage={setPage}
        onChangePerPage={(size) => setPerPage(size)}
        loading={loading}
      />
    </Sidebar>
  );
};

export default App;
