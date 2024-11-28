import { useEffect, useState } from "react";
import { useFetchSlides } from "../../hooks/slides/useFetchSlides.hook";
import { SlidesType } from "@repo/types/src/marketing-content";
import { useFetchLanguages } from "../../hooks/banners/useFetchLanguages.hook";
import { Button } from "antd";
import { Loader } from "../../components/loader/Loader";
import { NotFound } from "../../components/table/NotFound";
import { NoContentResultIcon } from "../../assets/icons/NoContentResultIcon";
import CreateSlideDrawer from "./CreateSlide";
import TableSlides from "./TableSlides";

interface Props {
  slider_delete?: boolean;
  slider_create?: boolean;
  slider_edit?: boolean;
}

export default function Slides({ slider_delete, slider_create }: Props) {
  const { slides = [], refetch, isLoading } = useFetchSlides();
  const [dataSource, setDataSource] = useState<SlidesType[]>([]);
  const [isActiveData, setIsActiveData] = useState<SlidesType[]>([]);
  const [slider, setSlider] = useState<boolean | SlidesType>(false);
  const { languages } = useFetchLanguages();

  useEffect(() => {
    if (slides?.length) setDataSource(slides);
    slides?.map((el: any) => {
      if (el?.is_active) {
        setIsActiveData((prevState) => [...prevState, el]);
      }
    });
  }, [slides?.length]);

  return (
    <>
      <h1 className="text-title mb-[24px]">Slides</h1>

      {dataSource?.length && slider_create ? (
        <Button
          className="mb-[16px] bg-oxford-blue-300 text-white hover:!bg-oxford-blue-300 hover:!text-white hover:!border-oxford-blue-300"
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
        <div className="flex flex-col gap-[16px]">
          <TableSlides
            dataSource={dataSource}
            setDataSource={setDataSource}
            setSlider={setSlider}
            languages={languages}
            isActiveData={isActiveData}
          />
        </div>
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
