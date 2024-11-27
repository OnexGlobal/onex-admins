import { useState } from "react";
import { useFetchShops } from "../../hooks/shops/useFetchShops.hook";
import { ShopsType } from "@repo/types/src/marketing-content";
import { Button } from "antd";
import ShopsTopSearchActions from "./TopSearchActions";
import { Loader } from "../../components/loader/Loader";
import TableShops from "./TableShops";
import { NotFound } from "../../components/table/NotFound";
import CreateShopsDrawer from "./Create/CreateShops";
import { NoContentResultIcon } from "../../assets/icons/NoContentResultIcon";
import { SearchCircleIcon } from "../../assets/icons/SearchCircleIcon";

interface Props {
  shop_create?: boolean;
  shop_edit?: boolean;
  shop_delete?: boolean;
}

export default function Shops({ shop_create, shop_edit, shop_delete }: Props) {
  const [filters, setFilters] = useState({});
  const { shops = [], meta, refetch, isLoading } = useFetchShops(filters);
  const isEmpty = !Object?.keys(filters)?.length;
  const [shop, setShop] = useState<boolean | ShopsType>(false);
  return (
    <>
      <h1 className="text-title mb-[24px]">Shops</h1>

      {shop_create ? (
        <Button
          className="bg-oxford-blue-300 text-white hover:!bg-oxford-blue-300 hover:!text-white hover:!border-oxford-blue-300"
          onClick={() => setShop(true)}
        >
          Create shop
        </Button>
      ) : null}
      <ShopsTopSearchActions setFilters={setFilters} />
      {isLoading ? (
        <Loader />
      ) : shops?.length > 0 ? (
        <>
          <TableShops
            data={shops}
            setShop={setShop}
            meta={meta}
            setFilters={setFilters}
            shop_edit={shop_edit}
          />
        </>
      ) : (
        <NotFound
          icon={isEmpty ? <NoContentResultIcon /> : <SearchCircleIcon />}
          title={`No shops ${isEmpty ? "yet" : "found"}`}
          text={
            isEmpty
              ? "Once there will be shops they will appear here"
              : "Your search  did not match any information. Please try again."
          }
          reset={
            isEmpty && shop_create ? (
              <Button
                className="bg-oxford-blue-300 text-white"
                onClick={() => setShop(true)}
              >
                Create shops
              </Button>
            ) : (
              ""
            )
          }
        />
      )}

      <CreateShopsDrawer
        shop_delete={shop_delete}
        reFetchShops={refetch}
        setShop={setShop}
        shop={shop}
      />
    </>
  );
}
