import { useQuery } from "@tanstack/react-query";
import { membersAndRoles } from "../../services/members-and-roles";

interface Permission {
  id: number;
  name: string;
  group: string;
}

export const useRolesPermissions = () => {
  const { isLoading, data: rolesPermissions } = useQuery({
    queryKey: ["consignment_list"],
    queryFn: () => membersAndRoles.fetchRolesPermissions(),
    staleTime: Infinity,
    select: ({ data }) => {
      const permission = [
        {
          title: "Role",
          list: data?.data?.filter((el: Permission) =>
            el?.name?.includes("role")
          ),
        },
        {
          title: "Region",
          list: data?.data?.filter((el: Permission) =>
            el?.name?.includes("region")
          ),
        },
        {
          title: "State",
          list: data?.data?.filter((el: Permission) =>
            el?.name?.includes("state")
          ),
        },
        {
          title: "User",
          list: data?.data?.filter((el: Permission) =>
            el?.name?.includes("user")
          ),
        },
        {
          title: "Recipient",
          list: data?.data?.filter((el: Permission) =>
            el?.name?.includes("recipient")
          ),
        },
        {
          title: "Warehouse",
          list: data?.data?.filter((el: Permission) =>
            el?.name?.includes("warehouse")
          ),
        },
        {
          title: "Dispatch",
          list: data?.data?.filter((el: Permission) =>
            el?.name?.includes("dispatch")
          ),
        },
        {
          title: "Forbidden",
          list: data?.data?.filter((el: Permission) =>
            el?.name?.includes("forbidden")
          ),
        },
        {
          title: "Tariff",
          list: data?.data?.filter((el: Permission) =>
            el?.name?.includes("tariff")
          ),
        },
        {
          title: "Expected",
          list: data?.data?.filter((el: Permission) =>
            el?.name?.includes("expected")
          ),
        },
        {
          title: "Order",
          list: data?.data?.filter((el: Permission) =>
            el?.name?.includes("order")
          ),
        },
        {
          title: "Balance",
          list: data?.data?.filter((el: Permission) =>
            el?.name?.includes("balance")
          ),
        },
        {
          title: "Bonus",
          list: data?.data?.filter((el: Permission) =>
            el?.name?.includes("bonus")
          ),
        },
        {
          title: "Pickup",
          list: data?.data?.filter((el: Permission) =>
            el?.name?.includes("pickup-point")
          ),
        },
        {
          title: "Delivery",
          list: data?.data?.filter((el: Permission) =>
            el?.name?.includes("delivery")
          ),
        },
        {
          title: "Haypost",
          list: data?.data?.filter((el: Permission) =>
            el?.name?.includes("haypost")
          ),
        },
        {
          title: "Parcel",
          list: data?.data?.filter((el: Permission) =>
            el?.name?.includes("parcel")
          ),
        },
        {
          title: "Box",
          list: data?.data?.filter((el: Permission) =>
            el?.name?.includes("box")
          ),
        },
        {
          title: "Tag",
          list: data?.data?.filter((el: Permission) =>
            el?.name?.includes("tag")
          ),
        },
        {
          title: "Wholesale",
          list: data?.data?.filter((el: Permission) =>
            el?.name?.includes("wholesale")
          ),
        },
        {
          title: "Statex",
          list: data?.data?.filter((el: Permission) =>
            el?.name?.includes("statex")
          ),
        },
        {
          title: "Tnvd",
          list: data?.data?.filter((el: Permission) =>
            el?.name?.includes("tnvd")
          ),
        },
        {
          title: "Category",
          list: data?.data?.filter((el: Permission) =>
            el?.name?.includes("category")
          ),
        },
        {
          title: "Blog",
          list: data?.data?.filter((el: Permission) =>
            el?.name?.includes("blog")
          ),
        },
        {
          title: "Shop",
          list: data?.data?.filter((el: Permission) =>
            el?.name?.includes("shop")
          ),
        },
        {
          title: "Country",
          list: data?.data?.filter((el: Permission) =>
            el?.name?.includes("country")
          ),
        },
        {
          title: "Export",
          list: data?.data?.filter((el: Permission) =>
            el?.name?.includes("export")
          ),
        },
        {
          title: "Ameria",
          list: data?.data?.filter((el: Permission) =>
            el?.name?.includes("ameria")
          ),
        },
        {
          title: "Pay",
          list: data?.data?.filter((el: Permission) =>
            el?.name?.includes("pay")
          ),
        },
        {
          title: "Notification",
          list: data?.data?.filter((el: Permission) =>
            el?.name?.includes("notification")
          ),
        },
        {
          title: "Slider",
          list: data?.data?.filter((el: Permission) =>
            el?.name?.includes("slider")
          ),
        },
        {
          title: "Smart Service",
          list: data?.data?.filter((el: Permission) =>
            el?.name?.includes("smart-service")
          ),
        },
        {
          title: "Community",
          list: data?.data?.filter((el: Permission) =>
            el?.name?.includes("community")
          ),
        },
        {
          title: "Header",
          list: data?.data?.filter((el: Permission) =>
            el?.name?.includes("header")
          ),
        },
        {
          title: "We Aare Trusted",
          list: data?.data?.filter((el: Permission) =>
            el?.name?.includes("we-are-trusted")
          ),
        },
        {
          title: "Partner",
          list: data?.data?.filter((el: Permission) =>
            el?.name?.includes("partner")
          ),
        },
        {
          title: "Bog Transaction",
          list: data?.data?.filter((el: Permission) =>
            el?.name?.includes("bog-transaction")
          ),
        },
        {
          title: "Dashboard",
          list: data?.data?.filter((el: Permission) =>
            el?.name?.includes("dashboard")
          ),
        },
      ];
      return permission;
    },
  });
  return {
    isLoading,
    rolesPermissions,
  };
};
