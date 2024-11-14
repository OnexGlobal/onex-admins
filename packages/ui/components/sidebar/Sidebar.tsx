import { FC, ReactNode, useEffect, useState } from "react";
import { Menu, MenuProps } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import logo_open from "../../assets/images/logo-open.svg";
import logo_closed from "../../assets/images/logo-closed.svg";
import avatar from "../../assets/images/avatar.svg";
import chevron_left from "../../assets/images/chevron-left.svg";
type MenuItem = Required<MenuProps>["items"][number];

interface Props {
  menu: MenuItem[];
  children: ReactNode;
  email?: string;
}
const Sidebar: FC<Props> = ({ menu, children, email }) => {
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
      <div className=" bg-white h-[100dvh] relative">
        <div className="px-[24px]">
          <div className="mt-[32px]">
            {collapsed ? <img src={logo_closed} /> : <img src={logo_open} />}
          </div>

          <div className="my-[20px] flex items-center gap-[8px]">
            <img src={avatar} width={24} height={24} />
            {!collapsed && (
              <span className="text-oxford-blue-400">{email}</span>
            )}
          </div>
        </div>
        <div className="overflow-y-auto max-h-[85dvh] bg-white ">
          <Menu
            className="!border-r-[0]"
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
            items={menu}
          />
        </div>
        <div
          className="absolute w-[20px] h-[61px] bg-white right-[-20px] rounded-[0_18px_18px_0] top-[50%] translate-y-[-50%] transition-all cursor-pointer z-[0]"
          onClick={() => setCollapsed((p) => !p)}
        >
          <img
            src={chevron_left}
            className={`absolute transition-all right-[5px] top-[50%] translate-y-[-50%] ${collapsed ? "rotate-180" : "rotate-0"} `}
          />
        </div>
      </div>

      <div className="p-[25px] max-h-[100dvh] overflow-auto">{children}</div>
    </div>
  );
};

export default Sidebar;
