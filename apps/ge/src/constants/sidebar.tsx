import dashboard_icon from "../assets/images/dashboard.svg";
import users_icon from "../assets/images/users-icon.svg";
import prime_users_icon from "../assets/images/prime_users.svg";
import layers_icon from "../assets/images/layers-icon.svg";
import expected_icon from "../assets/images/expected-menu-icon.svg";
import orders_check_icon from "../assets/images/orders-check.svg";
import orders_failed_icon from "../assets/images/failed-orders.svg";
import balance_icon from "../assets/images/balance-icon.svg";
import reports_icon from "../assets/images/reports-icon.svg";
import payment_icon from "../assets/images/payment-icon.svg";
import bonus_icon from "../assets/images/bonus-tab-icon.svg";
import receive_orders_icon from "../assets/images/receive-orders.svg";
import members_icon from "../assets/images/members-and-roles.svg";
import roles_icon from "../assets/images/roles-icon.svg";
import actions_history_icon from "../assets/images/actions_history.svg";
import content_icon from "../assets/images/content.svg";
import banner_icon from "../assets/images/banner.svg";
import blog_icon from "../assets/images/blog.svg";
import shops_icon from "../assets/images/shops.svg";
import logout_icon from "../assets/images/log-out-icon.svg";
import onex_logo from "../assets/images/onex_logo_closed.svg";
import app_versions from "../assets/images/api-versions.svg";
import { MenuProps } from "antd";

type MenuItem = Required<MenuProps>["items"][number];
export const sidebar = (permissions: Record<string, boolean>): MenuItem[] => {
  const {
    dashboard_view,
    recipient_view,
    expected_view,
    order_view,
    balance_view,
    bonus_view,
    report_full,
    role_view,
    header_message_view,
    slider_view,
    blog_view,
    shop_view,
    warehouse_view,
    api_version_view,
  } = permissions;

  return [
    {
      key: "/",
      label: "Home",
      icon: <img alt={"home"} src={onex_logo} />,
      title: "",
      style: {
        display: "flex",
      },
    },
    {
      key: "/dashboard",
      label: "Dashboard",
      icon: <img alt="dashboard" src={dashboard_icon} />,
      style: {
        display: !dashboard_view ? "none" : "flex",
      },
    },
    {
      key: "/users",
      label: "Users",
      icon: <img alt="Recipient" src={users_icon} />,
      style: !recipient_view ? { display: "none" } : undefined,
      children: [
        {
          key: "/customers",
          label: "Customers",
          icon: <img alt="Customers" src={users_icon} />,
          style: recipient_view ? undefined : { display: "none" },
        },
        {
          key: "/prime",
          label: "Prime users",
          icon: <img alt="Prime users" src={prime_users_icon} />,
          style: recipient_view ? undefined : { display: "none" },
        },
        {
          key: "/test-users",
          label: "Test users",
          icon: <img alt="Prime users" src={prime_users_icon} />,
          style: recipient_view ? undefined : { display: "none" },
        },
      ],
    },
    {
      key: "/order",
      label: "Orders",
      icon: <img alt="Orders" src={layers_icon} />,
      style:
        order_view || expected_view || order_view
          ? undefined
          : { display: "none" },
      children: [
        {
          key: "/expected",
          label: "Expected",
          icon: <img alt="Expected" src={expected_icon} />,
          style: expected_view ? undefined : { display: "none" },
        },
        {
          key: "/orders",
          label: "Orders",
          icon: <img alt="Orders" src={layers_icon} />,
          style: order_view ? undefined : { display: "none" },
        },
        {
          key: "/orders-check",
          label: "Orders check",
          icon: <img alt="Orders check" src={orders_check_icon} />,
          style: order_view ? undefined : { display: "none" },
        },
        {
          key: "/failed-orders",
          label: "Failed orders",
          icon: <img alt="Failed orders" src={orders_failed_icon} />,
          style: order_view ? undefined : { display: "none" },
        },
      ],
    },
    {
      key: "/finances",
      label: "Finances",
      icon: <img alt="Finances" src={balance_icon} />,
      style:
        !balance_view && !report_full && !bonus_view
          ? { display: "none" }
          : undefined,
      children: [
        {
          key: "/balance",
          label: "Balance",
          icon: <img alt="Balance" src={balance_icon} />,
          style: balance_view ? undefined : { display: "none" },
        },
        {
          key: "/reports",
          label: "Report",
          icon: <img alt="Report" src={reports_icon} />,
          style: report_full ? undefined : { display: "none" },
        },
        {
          key: "/online-payment",
          label: "Online payment",
          icon: <img alt="Online payment" src={payment_icon} />,
          style: balance_view ? undefined : { display: "none" },
        },
        {
          key: "/bonus",
          label: "Bonus",
          icon: <img alt="Bonus" src={bonus_icon} />,
          style: bonus_view ? undefined : { display: "none" },
        },
      ],
    },
    {
      key: "/receive-orders",
      label: "Receive orders",
      icon: <img alt="Receive orders" src={receive_orders_icon} />,
      style: !order_view ? { display: "none" } : undefined,
    },
    {
      key: "/permissions",
      label: "Roles",
      icon: <img alt="Roles" src={roles_icon} />,
      style: !role_view ? { display: "none" } : undefined,
      children: [
        {
          key: "/members",
          label: "Members",
          icon: <img alt="Members" src={members_icon} />,
          style: !role_view ? { display: "none" } : undefined,
        },
        {
          key: "/roles",
          label: "Roles",
          icon: <img alt="Roles" src={roles_icon} />,
          style: !role_view ? { display: "none" } : undefined,
        },
      ],
    },
    {
      key: "/actions-history",
      label: "Actions history",
      icon: <img alt="Actions history" src={actions_history_icon} />,
      style: !role_view ? { display: "none" } : undefined,
    },
    {
      key: "/marketing",
      label: "Marketing",
      icon: <img alt="Marketing" src={content_icon} />,
      style:
        !header_message_view &&
        !slider_view &&
        !blog_view &&
        !shop_view &&
        !warehouse_view
          ? { display: "none" }
          : undefined,
      children: [
        {
          key: "/banners",
          label: "Header",
          icon: <img alt="Header" src={banner_icon} />,
          style: !header_message_view ? { display: "none" } : undefined,
        },
        {
          key: "/slides",
          label: "Slides",
          icon: <img alt="Slides" src={content_icon} />,
          style: !slider_view ? { display: "none" } : undefined,
        },
        {
          key: "/blog",
          label: "Blogs",
          icon: <img alt="Blogs" src={blog_icon} />,
          style: !blog_view ? { display: "none" } : undefined,
        },
        {
          key: "/shops",
          label: "Shops",
          icon: <img alt="Shops" src={shops_icon} />,
          style: !shop_view ? { display: "none" } : undefined,
        },
      ],
    },
    {
      key: "/app-versions",
      label: "App version",
      icon: <img alt="App version" src={app_versions} />,
      style: !api_version_view ? { display: "none" } : undefined,
    },
    {
      key: "/log-out",
      label: <span>Log out</span>,
      icon: <img alt="Log out" src={logout_icon} />,
      onClick: () => {
        localStorage.clear();
        window.location.replace("/");
      },
    },
  ];
};
