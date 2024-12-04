import { useQuery } from "@tanstack/react-query";
import { warehouseApi } from "@repo/ui/services/warehouses";
import { WarehouseType } from "@repo/types/src/warehouse-type";

export default function useGetWarehouses() {
  return useQuery({
    queryKey: ["get-warehouses"],
    queryFn: () => warehouseApi.getWareHouses(),
    staleTime: Infinity,
    select: ({ data }): (WarehouseType & { value: number })[] =>
      data.data.data?.map((warehouse: WarehouseType, i: number) => ({
        key: i,
        value: warehouse.id,
        label: (
          <div className="flex items-center flex-nowrap">
            <img
              className="w-[20px] mr-[5px]"
              src={warehouse.round_flag}
              alt=""
            />
            {warehouse.country}
          </div>
        ),
        ...warehouse,
      })),
  });
}
