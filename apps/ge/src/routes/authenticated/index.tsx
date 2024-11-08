import {
  Balance,
  Bonus,
  Customers,
  Dashboard,
  Expected,
  Home,
  OnlinePayment,
  PrimeUser,
  ProtectedRoute,
  Reports,
  TestUsers,
} from "@repo/ui";
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
    balance_edit,
    bonus_create,
  } = usePermission();
  console.log(bonus_create);
  const routes = [
    {
      path: "/",
      component: <Home />,
      permission: true,
    },
    {
      path: "/dashboard",
      component: <Dashboard />,
      permission: dashboard_view,
    },
    {
      path: "/customers",
      component: <Customers />,
      permission: recipient_view,
    },
    {
      path: "/prime",
      component: <PrimeUser />,
      permission: recipient_view,
    },
    {
      path: "/test-users",
      component: <TestUsers />,
      permission: recipient_view,
    },
    {
      path: "/expected",
      component: <Expected />,
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
      component: <Balance balance_edit={balance_edit} />,
      permission: balance_view,
    },
    {
      path: "/reports",
      component: <Reports />,
      permission: report_full,
    },
    {
      path: "/online-payment",
      component: <OnlinePayment />,
      permission: balance_view,
    },
    {
      path: "/bonus",
      component: <Bonus bonus_create={bonus_create} />,
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
