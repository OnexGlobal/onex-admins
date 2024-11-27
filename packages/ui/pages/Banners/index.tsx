import { BannersType } from "@repo/types/src/marketing-content";
import { useState } from "react";
import { useFetchBanners } from "../../hooks/banners/useFetchBanners.hook";
import { useFetchLanguages } from "../../hooks/banners/useFetchLanguages.hook";
import { Button } from "antd";
import TableBanners from "./TableBanners";
import { Loader } from "../../components/loader/Loader";
import { NotFound } from "../../components/table/NotFound";
import { NoContentResultIcon } from "../../assets/icons/NoContentResultIcon";
import CreateBannerDrawer from "./CreateBanner";

interface Props {
  header_message_edit?: boolean;
  header_message_create?: boolean;
}

export default function Banners({
  header_message_edit,
  header_message_create,
}: Props) {
  const [filters, setFilters] = useState({});
  const [banner, setBanner] = useState<boolean | BannersType>(false);
  const { banners = [], refetch, isLoading, meta } = useFetchBanners(filters);
  const { languages } = useFetchLanguages();

  return (
    <>
      {" "}
      <h1 className="text-title mb-[24px]">Header</h1>
      {banners?.length > 0 && header_message_create ? (
        <Button
          type="default"
          className="bg-oxford-blue-300 mb-[16px] text-white hover:!bg-oxford-blue-300 hover:!text-white hover:!border-oxford-blue-300"
          onClick={() => setBanner(true)}
        >
          Create header messages
        </Button>
      ) : (
        ""
      )}
      {banners?.length > 0 ? (
        <TableBanners
          languages={languages}
          data={banners}
          setBanner={setBanner}
          meta={meta}
          setFilters={setFilters}
          header_message_edit={header_message_edit}
        />
      ) : isLoading ? (
        <Loader />
      ) : (
        <NotFound
          icon={<NoContentResultIcon />}
          title={"No header messages yet"}
          text={"Once there will be header messages they will appear here"}
          reset={
            <Button
              type="default"
              className="bg-oxford-blue-300"
              onClick={() => setBanner(true)}
            >
              Create header messages
            </Button>
          }
        />
      )}
      <CreateBannerDrawer
        languages={languages}
        setBanner={setBanner}
        banner={banner}
        refetch={refetch}
      />
    </>
  );
}
