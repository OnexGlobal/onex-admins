import { AuthContext, Loading, Sidebar, usePermission } from "@repo/ui";

import { useContext } from "react";
import { sidebar } from "./constants/sidebar";
import Unauthenticated from "./routes/Unauthenticated";
import Authenticated from "./routes/Authenticated";
const token = localStorage.getItem("token");
const App = () => {
  const { auth, loading, user } = useContext(AuthContext);
  const permissions = usePermission();
  if (loading) return <Loading />;
  if (!auth && !token) return <Unauthenticated />;

  return (
    <Sidebar menu={sidebar(permissions)} email={user?.email}>
      <Authenticated />
    </Sidebar>
  );
};

export default App;
