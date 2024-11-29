import { Refetch } from "@repo/types";
import { LanguagesType, SlidesType } from "@repo/types/src/marketing-content";
import { Button, Drawer, Form, Input, Switch, Tooltip } from "antd";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useCheckEmptyArrItem } from "../../hooks/helpers/useCheckEmptyArrItem";
import { useCreateAndEditSlid } from "../../hooks/slides/useCreateAndEditSlide.hook";
import {
  notificationError,
  notificationSuccess,
} from "../../helpers/notification";
import { useIsActiveSlide } from "../../hooks/slides/useIsActiveSlide.hook";
import { useDeleteSlider } from "../../hooks/slides/useDeleteSlider.hook";
import { sliderInitialValue } from "./initial-value-slider-form";
import AlertCircleIcon from "../../assets/icons/AlertCircleIcon";
import TabList from "../../components/tabs/TabList";
import InfoIcon from "../../assets/icons/InfoIcon";
import { UploadImages } from "../../components/buttons/UploadImages";
import { DeactivateModal } from "../../components/modals/DeactivateModal";

interface Props {
  slider: SlidesType | boolean;
  setSlider: Dispatch<SetStateAction<SlidesType | boolean>>;
  reFetchSlider: Refetch;
  languages?: LanguagesType[];
  slider_delete?: boolean;
}

export default function CreateSlideDrawer({
  reFetchSlider,
  setSlider = () => {},
  slider,
  languages,
  slider_delete,
}: Props) {
  const [languageId, setLanguageId] = useState<number>(
    typeof slider === "object" && slider?.language_id ? slider?.language_id : 1
  );
  const [imageUrl, setImageUrl] = useState<Record<number, string>>({});
  const [status, setStatus] = useState(0);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const sliderWatch = Form.useWatch("details", form);
  const isTrueAllItems = useCheckEmptyArrItem(sliderWatch);
  useEffect(() => {
    if (typeof slider === "object") {
      slider?.slidersMl?.forEach((ml) => {
        Object.entries(ml).forEach(([key, val]) => {
          form.setFieldValue(["details", +ml?.language_id - 1, key], val);
        });
        setImageUrl((pre) => ({ ...pre, [+ml?.language_id]: ml?.image }));
      });
      setStatus(slider.is_active);
      if (slider?.language_id) {
        setLanguageId(slider.language_id);
        form.setFieldValue(
          ["details", slider?.language_id - 1, "language_id"],
          slider?.language_id
        );
      }
    }
  }, [slider]);
  const closeEditModal = () => {
    form.resetFields();
    setImageUrl({});
    setSlider(false);
    setLanguageId(1);
  };
  const { mutate } = useCreateAndEditSlid(
    (data) => {
      notificationSuccess(data?.data?.message, "Success");
      reFetchSlider();
      closeEditModal();
    },
    (e) => {
      Object.values(e?.response?.data?.data).forEach((val) => {
        notificationError(val[0], "Something went wrong");
      });
    }
  );
  const createSlide = (values: { details: SlidesType["slidersMl"] }) => {
    if (values) {
      const formData = new FormData();
      values?.details?.map((detail, index) => {
        if (
          detail.language_id &&
          detail.title &&
          detail.description &&
          detail.image &&
          detail.url
        ) {
          Object.entries(detail).forEach(([key, value]) => {
            formData.append(`details[${index}][${key}]`, value as string);
          });
        }
      });

      if (typeof slider === "object") {
        formData.append("_method", "put");
      }
      mutate({
        id: typeof slider === "object" ? slider?.id : undefined,
        formData,
      });
    }
  };

  const { mutate: mutateIsActive, isPending } = useIsActiveSlide(
    (data) => {
      notificationSuccess(data?.data?.message, "Success");
      setStatus(Number((data?.data?.data as { is_active: number })?.is_active));
      reFetchSlider();
      closeEditModal();
    },
    (e) => {
      if (e) {
        notificationError("Action failed.", e?.response?.data?.message);
      }
    }
  );

  const { mutate: deleteSlider } = useDeleteSlider(
    (data) => {
      notificationSuccess(data?.data?.message, "Success");
      setOpen(false);
      reFetchSlider();
    },
    () => notificationError("Activate", "something went wrong")
  );

  return (
    <Drawer
      styles={{ header: { display: "none" }, body: { background: "#f9fafb" } }}
      onClose={() => closeEditModal()}
      open={!!slider}
      width="1112px"
    >
      <Form
        initialValues={sliderInitialValue}
        form={form}
        name="createSlide"
        layout="vertical"
        onFinish={createSlide}
      >
        <div className="flex items-center gap-[16px] mb-[16px]">
          <span className="text-[22px] mr-auto font-[500]">
            {typeof slider === "object" ? "Edit slide" : "Create slide"}
          </span>

          {typeof slider === "object" ? (
            <>
              {slider_delete ? (
                <Button
                  icon={<AlertCircleIcon />}
                  onClick={() => {
                    setOpen(true);
                  }}
                  type="default"
                  className="hover:!border-oxford-blue-50 hover:!text-black"
                >
                  Delete Slide
                </Button>
              ) : (
                ""
              )}

              <span>{status ? "Active" : "Inactive"}</span>
              <Switch
                loading={isPending}
                checked={Boolean(status)}
                onChange={(val) => {
                  if (typeof slider === "object")
                    mutateIsActive({ id: slider?.id, is_active: val });
                }}
              />
            </>
          ) : (
            ""
          )}
          <Button
            onClick={closeEditModal}
            className="bg-red-50 text-red-500 border-red-50 hover:!bg-red-50 hover:!text-red-500 hover:!border-red-50"
          >
            Cancel
          </Button>
          <Button htmlType="submit" type="primary">
            {typeof slider === "object" ? "Save" : "Create"}
          </Button>
        </div>

        <Form.List name={"details"}>
          {() => {
            return (
              <div>
                <TabList
                  data={languages}
                  isTrueAllItems={isTrueAllItems}
                  onChange={(key) => {
                    setLanguageId(+key);
                    form.setFieldValue(
                      ["details", +key - 1, "language_id"],
                      key
                    );
                  }}
                  value={languageId}
                />

                <div className={"rounded-[12px] bg-white p-[16px]"}>
                  <Form.Item
                    name={[languageId - 1, "image"]}
                    rules={[
                      {
                        required: true,
                        message: "Missing Image.",
                      },
                    ]}
                    label={
                      <div className="flex gap-[4px] items-center">
                        Image
                        <Tooltip
                          color={"#0A2540"}
                          title={
                            <span>
                              Dimensions{" "}
                              <span style={{ fontWeight: 700 }}>
                                456 × 348px
                              </span>{" "}
                              <br />
                              SVG, JPG, PNG
                            </span>
                          }
                          placement={"right"}
                        >
                          <InfoIcon color={"#5B6D7F"} />
                        </Tooltip>
                      </div>
                    }
                  >
                    <UploadImages
                      imageUrl={imageUrl[languageId] || ""}
                      setImageUrl={(img) =>
                        setImageUrl({ ...imageUrl, [languageId]: img })
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    name={[languageId - 1, "title"]}
                    label="Slide title"
                    rules={[
                      {
                        required: true,
                        message: "Missing Title.",
                      },
                    ]}
                  >
                    <Input
                      style={{ minHeight: "52px" }}
                      placeholder={"Slide title"}
                      maxLength={32}
                      showCount={true}
                    />
                  </Form.Item>
                  <div style={{ margin: "32px 0 0 0" }}>
                    <Form.Item
                      name={[languageId - 1, "description"]}
                      label="Description"
                      rules={[
                        {
                          required: true,
                          message: "Missing Description.",
                        },
                      ]}
                    >
                      <Input
                        style={{ minHeight: "52px" }}
                        placeholder={"Description"}
                        maxLength={100}
                        showCount={true}
                      />
                    </Form.Item>
                  </div>
                  <div className="w-full mt-[32px]">
                    <div className="mr-16" style={{ width: "100%" }}>
                      <Form.Item
                        name={[languageId - 1, "url"]}
                        label={"URL"}
                        rules={[
                          {
                            required: true,
                            message: "Missing URL.",
                          },
                        ]}
                        // rules={[{ required: true, message: "Required" }]}
                      >
                        <Input placeholder={"URL"} />
                      </Form.Item>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        width: "100%",
                      }}
                    >
                      <Form.Item
                        name={[languageId - 1, "button_name"]}
                        label={"Button name"}
                        rules={[
                          {
                            required: true,
                            message: "Missing Button Name.",
                          },
                        ]}
                        // rules={[{ required: true, message: "Required" }]}
                      >
                        <Input placeholder={"Button name"} />
                      </Form.Item>
                    </div>
                  </div>
                </div>
              </div>
            );
          }}
        </Form.List>
      </Form>
      <DeactivateModal
        setDeactivate={setOpen}
        deactivate={open}
        title={"Delete slide"}
        description={"Are you sure you want to delete slide"}
        useDeactivate={() => {
          if (typeof slider === "object") deleteSlider({ id: slider?.id });
        }}
      />
    </Drawer>
  );
}
