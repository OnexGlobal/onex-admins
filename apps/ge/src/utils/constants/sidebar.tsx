import dashboard_icon from "../../assets/images/dashboard.svg";
import users_icon from "../../assets/images/users-icon.svg";
// import prime_users_icon from "../../assets/images/prime_users.svg";
// import layers_icon from "../../assets/images/layers-icon.svg";
// import expected_icon from "../../assets/images/expected-menu-icon.svg";
// import orders_check_icon from "../../assets/images/orders-check.svg";
// import orders_filed_icon from "../../assets/images/failed-orders.svg";
// import finance_icon from "../../assets/images/finance-icon.svg";
// import balance_icon from "../../assets/images/balance-icon.svg";
// import reports_icon from "../../assets/images/reports-icon.svg";
// import payment_icon from "../../assets/images/payment-icon.svg";
// import bonus_icon from "../../assets/images/bonus-tab-icon.svg";
// import consignment_icon from "../../assets/images/consignment.svg";
// import receive_orders_icon from "../../assets/images/receive-orders.svg";
// import members_icon from "../../assets/images/members-and-roles.svg";
// import roles_icon from "../../assets/images/roles-icon.svg";
// import actions_history_icon from "../../assets/images/actions_history.svg";
// import content_icon from "../../assets/images/content.svg";
// import banner_icon from "../../assets/images/banner.svg";
// import blog_icon from "../../assets/images/blog.svg";
// import shops_icon from "../../assets/images/shops.svg";
// import warehouses_icon from "../../assets/images/warehouses.svg";
// import story_icon from "../../assets/images/story.svg";
// import notification_icon from "../../assets/images/notification-box.svg";
// import best_offers_icon from "../../assets/images/best_offers.svg";
// import settings_icon from "../../assets/images/settings-icon.svg";
// import logout_icon from "../../assets/images/log-out-icon.svg";
import onex_logo from "../../assets/images/onex_logo_closed.svg";
// import app_versions from "../../assets/images/api-versions.svg";
// import tariffs_icon from "../../assets/images/line-chart-up.svg";
// import customized_pricing_icon from "../../assets/images/bar-chart-square.svg";
// import lost_icon from "../../assets/images/box-remove.svg";
import { MenuProps } from "antd";
import { usePermission } from "@repo/ui";

type MenuItem = Required<MenuProps>["items"][number];
export const sidebar = (): MenuItem[] => {
  const { dashboard_view, recipient_view } = usePermission();

  return [
    {
      key: "Home",
      label: "Home",
      icon: <img alt={"home"} src={onex_logo} />,
      title: "",
      style: {
        display: "flex",
      },
    },
    {
      key: "Dashboard",
      label: "Dashboard",
      icon: <img alt="dashboard" src={dashboard_icon} />,
      title: "Dashboard",
      style: {
        display: !dashboard_view ? "none" : "flex",
      },
    },
    {
      key: "Recipient",
      label: "Recipient",
      icon: <img alt="Recipient" src={users_icon} />,
      title: "Recipient",
      style: {
        display: !recipient_view ? "none" : "flex",
      },
    },
  ];
};
