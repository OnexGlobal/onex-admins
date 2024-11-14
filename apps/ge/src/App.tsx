import { Sidebar } from "@repo/ui";
import { sidebar } from "./utils/constants/sidebar";
import Unauthenticated from "./routes/unautheticated/Unauthenticated";
import Authenticated from "./routes/authenticated";
import { Loading } from "./components/general/Loading";
import { useContext } from "react";
import { AuthContext } from "./utils/hooks/useAuth";
import { usePermission } from "./utils/hooks/usePermissions";

const App = () => {
  const { auth, loading, user } = useContext(AuthContext);
  const permissions = usePermission();

  if (loading) return <Loading />;
  if (!auth) return <Unauthenticated />;

  return (
    <Sidebar menu={sidebar(permissions)} email={user?.email}>
      <Authenticated />
    </Sidebar>
  );
};

export default App;
