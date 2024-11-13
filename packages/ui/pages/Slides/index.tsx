import { useEffect, useState } from "react";
import { useFetchSlides } from "../../hooks/slides/useFetchSlides.hook";
import { SlidesType } from "@repo/types/src/marketing-content";
import { useFetchLanguages } from "../../hooks/banners/useFetchLanguages.hook";
import { Button } from "antd";
import { Loader } from "../../components/loader/Loader";
import TableSlides from "./TableSlides";
import { NotFound } from "../../components/table/NotFound";
import { NoContentResultIcon } from "../../assets/icons/NoContentResultIcon";
import CreateSlideDrawer from "./CreateSlide";

interface Props {
  slider_delete?: boolean;
  slider_create?: boolean;
  slider_edit?: boolean;
}

export default function Slides({
  slider_delete,
  slider_create,
  slider_edit,
}: Props) {
  const [filters, setFilters] = useState<object>({});
  const { slides = [], refetch, isLoading, meta } = useFetchSlides(filters);
  const [dataSource, setDataSource] = useState<SlidesType[]>([]);
  const [slider, setSlider] = useState<boolean | SlidesType>(false);
  const { languages } = useFetchLanguages();

  useEffect(() => {
    if (slides?.length) setDataSource(slides);
  }, [slides]);

  return (
    <>
      <h1 className="text-title mb-[24px]">Slides</h1>

      {dataSource?.length && slider_create ? (
        <Button
          className="mb-[16px] bg-oxford-blue-300 text-white"
          type="default"
          onClick={() => setSlider(true)}
        >
          Create slide
        </Button>
      ) : (
        ""
      )}
      {isLoading ? (
        <Loader />
      ) : dataSource?.length > 0 ? (
        <TableSlides
          dataSource={dataSource}
          setDataSource={setDataSource}
          setSlider={setSlider}
          languages={languages}
          slider_delete={slider_delete}
          meta={meta}
          slider_edit={slider_edit}
          setFilters={setFilters}
        />
      ) : (
        <NotFound
          icon={<NoContentResultIcon />}
          title={"No slides yet"}
          text={"Once there will be slides they will appear here"}
          reset={
            <Button
              className="bg-oxford-blue-300"
              onClick={() => setSlider(true)}
              type="default"
            >
              Create slide
            </Button>
          }
        />
      )}

      <CreateSlideDrawer
        reFetchSlider={refetch}
        setSlider={setSlider}
        slider={slider}
        languages={languages}
        slider_delete={slider_delete}
      />
    </>
  );
}
