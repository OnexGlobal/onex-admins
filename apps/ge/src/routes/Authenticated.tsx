import {
  ActionsHistory,
  AppVersions,
  Balance,
  Banners,
  Blogs,
  Bonus,
  Customers,
  Dashboard,
  Expected,
  Home,
  Members,
  OnlinePayment,
  Orders,
  OrdersCheck,
  OrdersFailed,
  PrimeUser,
  ProtectedRoute,
  ReceiveOrders,
  Reports,
  Roles,
  Shops,
  Slides,
  TestUsers,
  usePermission,
} from "@repo/ui";
import { Route, Routes } from "react-router-dom";
import { georgiaRegions } from "onex-ge/src/constants/georgia-regions";

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
    role_edit,
    header_message_edit,
    header_message_create,
    slider_delete,
    slider_create,
    slider_edit,
    blog_create,
    blog_edit,
    blog_delete,
    shop_create,
    shop_edit,
    shop_delete,
  } = usePermission();

  const routes = [
    {
      path: "/",
      component: <Home />,
      permission: true,
    },
    {
      path: "/dashboard",
      component: <Dashboard dashboardRegions={georgiaRegions} />,
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
      component: <Orders />,
      permission: order_view,
    },
    {
      path: "/orders-check",
      component: <OrdersCheck />,
      permission: order_view,
    },
    {
      path: "/failed-orders",
      component: <OrdersFailed />,
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
      component: <ReceiveOrders />,
      permission: order_view,
    },
    {
      path: "/members",
      component: <Members role_edit={role_edit} />,
      permission: role_view,
    },
    {
      path: "/roles",
      component: <Roles />,
      permission: role_view,
    },
    {
      path: "/actions-history",
      component: <ActionsHistory />,
      permission: role_view,
    },
    {
      path: "/banners",
      component: (
        <Banners
          header_message_edit={header_message_edit}
          header_message_create={header_message_create}
        />
      ),
      permission: header_message_view,
    },
    {
      path: "/slides",
      component: (
        <Slides
          slider_delete={slider_delete}
          slider_create={slider_create}
          slider_edit={slider_edit}
        />
      ),
      permission: slider_view,
    },
    {
      path: "/blog",
      component: (
        <Blogs
          blog_create={blog_create}
          blog_edit={blog_edit}
          blog_delete={blog_delete}
        />
      ),
      permission: blog_view,
    },
    {
      path: "/shops",
      component: (
        <Shops
          shop_create={shop_create}
          shop_edit={shop_edit}
          shop_delete={shop_delete}
        />
      ),
      permission: shop_view,
    },
    {
      path: "/warehouses",
      component: <div>Warehouses</div>,
      permission: warehouse_view,
    },
    {
      path: "/app-versions",
      component: <AppVersions />,
      permission: api_version_view,
    },
  ];

  return (
    <Routes>
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route?.path}
          element={
            <ProtectedRoute permission={route?.permission}>
              {route?.component}
            </ProtectedRoute>
          }
        />
      ))}
      <Route path="*" element={<Home />} />
    </Routes>
  );
};

export default AuthRoutes;
