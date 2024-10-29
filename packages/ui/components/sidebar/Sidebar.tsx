import { FC, ReactNode, useState } from "react";
import { Menu, MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];

interface Props {
  menu: MenuItem[];
  children: ReactNode;
}
const Sidebar: FC<Props> = ({ menu, children }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className={`grid ${collapsed ? "grid-cols-[80px_auto]" : "grid-cols-[200px_auto]"}`}
    >
      <Menu
        theme="light"
        inlineCollapsed={collapsed}
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
