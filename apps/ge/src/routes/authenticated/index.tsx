import { ProtectedRoute } from "@repo/ui";
import { Route, Routes } from "react-router-dom";
import { usePermission } from "../../utils/hooks/usePermissions";

const AuthRoutes = () => {
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
  } = usePermission();

  const routes = [
    {
      path: "/",
      component: <div>Home</div>,
      permission: true,
    },
    {
      path: "/dashboard",
      component: <div>Dashboard</div>,
      permission: dashboard_view,
    },
    {
      path: "/customers",
      component: <div>Customers</div>,
      permission: recipient_view,
    },
    {
      path: "/prime",
      component: <div>Prime</div>,
      permission: recipient_view,
    },
    {
      path: "/test-users",
      component: <div>Test users</div>,
      permission: recipient_view,
    },
    {
      path: "/expected",
      component: <div>Expected</div>,
      permission: expected_view,
    },
    {
      path: "/orders",
      component: <div>Orders</div>,
      permission: order_view,
    },
    {
      path: "/orders-check",
      component: <div>Orders check</div>,
      permission: order_view,
    },
    {
      path: "/failed-orders",
      component: <div>Failed orders</div>,
      permission: order_view,
    },
    {
      path: "/balance",
      component: <div>Balance</div>,
      permission: balance_view,
    },
    {
      path: "/reports",
      component: <div>Report</div>,
      permission: report_full,
    },
    {
      path: "/online-payment",
      component: <div>Online payment</div>,
      permission: balance_view,
    },
    {
      path: "/bonus",
      component: <div>Bonus</div>,
      permission: bonus_view,
    },
    {
      path: "/receive-orders",
      component: <div>Receive orders</div>,
      permission: order_view,
    },
    {
      path: "/members",
      component: <div>Members</div>,
      permission: role_view,
    },
    {
      path: "/roles",
      component: <div>Roles</div>,
      permission: role_view,
    },
    {
      path: "/actions-history",
      component: <div>Actions history</div>,
      permission: role_view,
    },
    {
      path: "/banners",
      component: <div>Header</div>,
      permission: header_message_view,
    },
    {
      path: "/slides",
      component: <div>Slides</div>,
      permission: slider_view,
    },
    {
      path: "/blog",
      component: <div>Blog</div>,
      permission: blog_view,
    },
    {
      path: "/shops",
      component: <div>Shops</div>,
      permission: shop_view,
    },
    {
      path: "/warehouses",
      component: <div>Warehouses</div>,
      permission: warehouse_view,
    },
    {
      path: "/app-versions",
      component: <div>App version</div>,
      permission: api_version_view,
    },
    {
      path: "/settings",
      component: <div>Settings</div>,
      permission: true,
    },
  ];

  return (
    <Routes>
      {routes.map((route) => (
        <Route
          path={route?.path}
          element={
            <ProtectedRoute permission={route?.permission}>
              {route?.component}
            </ProtectedRoute>
          }
        />
      ))}
    </Routes>
  );
};

export default AuthRoutes;
