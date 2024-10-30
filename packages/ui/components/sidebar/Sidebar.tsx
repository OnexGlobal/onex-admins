import { FC, ReactNode, useEffect, useState } from "react";
import { Menu, MenuProps } from "antd";
import { useLocation, useNavigate } from "react-router-dom";

type MenuItem = Required<MenuProps>["items"][number];

interface Props {
  menu: MenuItem[];
  children: ReactNode;
}
const Sidebar: FC<Props> = ({ menu, children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [defaultSelectedKey, setDefaultSelectedKey] = useState("/");
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    setDefaultSelectedKey(location.pathname);
  }, [location?.pathname]);
  return (
    <div
      className={`grid ${collapsed ? "grid-cols-[80px_auto]" : "grid-cols-[200px_auto]"}`}
    >
      <Menu
        className="min-h-[100vh] max-h-[100dvh] overflow-y-auto"
        theme="light"
        inlineCollapsed={collapsed}
        defaultSelectedKeys={[defaultSelectedKey]}
        selectedKeys={[defaultSelectedKey]}
        defaultOpenKeys={["/orders"]}
        onClick={(item) => {
          navigate(item?.key);
          setDefaultSelectedKey(item.key);
        }}
        mode="inline"
        items={[
          {
            key: "",
            label: collapsed ? <span>open</span> : <span>close</span>,
            onClick: () => setCollapsed((p) => !p),
          },
          ...menu,
        ]}
      />
      <div className="p-[25px]">{children}</div>
    </div>
  );
};

export default Sidebar;
