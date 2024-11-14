import { Refetch } from "@repo/types";
import { ShopsType } from "@repo/types/src/marketing-content";
import { Button, Drawer, Form, Switch } from "antd";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFetchLanguages } from "../../../hooks/banners/useFetchLanguages.hook";
import { useCreateAndEditShops } from "../../../hooks/shops/useCreateAndEditShops.hook";
import {
  notificationError,
  notificationSuccess,
} from "../../../helpers/notification";
import { useIsActiveShop } from "../../../hooks/shops/useIsActiveShop.hook";
import { useDeleteShops } from "../../../hooks/shops/useDeleteShops.hook";
import { shopsInitialValue } from "../initial-value-shops-form";
import AlertCircleIcon from "../../../assets/icons/AlertCircleIcon";
import { MainParts } from "./MainParts";
import { SelectParts } from "./SelectParts";
import { CheckboxFeatures } from "./CheckboxFeatures";
import { DetailsParts } from "./DetailsParts";
import { DeactivateModal } from "../../../components/modals/DeactivateModal";

interface Props {
  reFetchShops: Refetch;
  setShop: Dispatch<SetStateAction<boolean | ShopsType>>;
  shop: boolean | ShopsType;
  shop_delete?: boolean;
}

export default function CreateShopsDrawer({
  reFetchShops,
  setShop = () => {},
  shop,
  shop_delete,
}: Props) {
  const { languages = [] } = useFetchLanguages();
  const [languageId, setLanguageId] = useState(1);
  const [imageUrl, setImageUrl] = useState<Record<string, string>>({});
  const [status, setStatus] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectBlog, setSelectBlog] = useState<boolean>(false);
  const [showVlog, setShowVlog] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    if (typeof shop === "object") {
      Object.entries(shop)?.forEach(([key, val]) => {
        if (key === "warehouse") {
          form.setFieldValue("warehouse_id", val?.id);
        } else if (key === "categories") {
          const cat_ids = val?.map((cat: { id: number }) => cat?.id);
          form.setFieldValue("category_ids", cat_ids);
        } else if (key === "logo") {
          setImageUrl((pre) => ({ ...pre, web: val }));
          form.setFieldValue(key, val);
        } else if (key === "mobile_logo") {
          setImageUrl((pre) => ({ ...pre, mob: val }));
          form.setFieldValue(key, val);
        } else if (key === "blog") {
          form.setFieldValue("blog_id", val?.id || null);
          setSelectBlog(val ? true : false);
        } else if (key === "details") {
          const details = [];
          val?.forEach(
            (det: {
              language_id: number;
              description: string;
              vlog: string;
            }) => {
              const item = {
                language_id: det?.language_id || "",
                description: det?.description || "",
                vlog: det?.vlog || "",
              };

              details[det?.language_id - 1] = item;
            }
          );
          form.setFieldValue("details", val);
        } else {
          form.setFieldValue(key, val);
        }
      });

      setStatus(shop.is_active);
    }
  }, [shop]);

  const { mutate } = useCreateAndEditShops((data) => {
    setShop(false);
    setImageUrl({});
    notificationSuccess(
      shop ? "Shop update" : "Shop create",
      data?.data?.message
    );
    reFetchShops();
    form.resetFields();
    setLanguageId(1);
    setSelectBlog(false);
    setShowVlog(false);
  });

  const createBlogs = (values: object) => {
    const formData = new FormData();
    formData.append("sorting", "0");
    Object.entries(values)?.forEach(([key, val]) => {
      if (val !== null && !Array.isArray(val)) {
        if (key === "logo" && typeof val === "string") {
          formData.delete(key);
        } else if (key === "mobile_logo" && typeof val === "string") {
          formData.delete(key);
        } else if (key === "blog_id" && !val) {
          formData.delete(key);
        } else {
          formData.append(key, val);
        }
      } else if (key === "details") {
        val?.forEach((detail: object, index: number) => {
          Object.entries(detail)?.forEach(([key, value]) => {
            if (value) {
              formData.append(`details[${index}][${key}]`, value as string);
            }
          });
        });
      } else if (key === "category_ids") {
        val?.forEach((id: string, i: number) => {
          formData.append(`category_ids[${i}]`, id);
        });
      }
    });
    if (typeof shop === "object") {
      formData.append("_method", "put");
    }
    mutate({ id: typeof shop === "object" ? shop?.id : undefined, formData });
  };

  const closeEditModal = () => {
    form.resetFields();
    setImageUrl({});
    setShop(false);
    setLanguageId(1);
  };

  const { mutate: mutateIsActive, isPending } = useIsActiveShop(
    (data) => {
      notificationSuccess("Shops", data?.data?.message);
      setStatus((data?.data?.data as { is_active: number })?.is_active);
      reFetchShops();
    },
    () => {
      notificationError("Activate", "something went wrong");
    }
  );

  const { mutate: deleteShop } = useDeleteShops(
    (data) => {
      notificationSuccess(data?.data?.message, "Shop delete");
      setOpen(false);
      reFetchShops();
      closeEditModal();
    },
    () => {
      notificationError("Activate", "something went wrong");
    }
  );

  return (
    <Drawer
      styles={{ header: { display: "none" } }}
      onClose={() => closeEditModal()}
      open={!!shop}
      width="1112px"
      className="p-[16px]"
    >
      <Form
        initialValues={shopsInitialValue}
        form={form}
        name="createBlog"
        layout="vertical"
        onFinish={createBlogs}
      >
        <div className="flex items-center gap-[16px] mb-[16px]">
          <span className="info-title ">
            {typeof shop === "object" ? "Edit shop" : "Create shop"}
          </span>

          {typeof shop === "object" ? (
            <>
              {shop_delete ? (
                <Button
                  icon={<AlertCircleIcon />}
                  onClick={() => {
                    setOpen(true);
                  }}
                  type="default"
                >
                  Delete Shop
                </Button>
              ) : null}

              <span>{status ? "Active" : "Inactive"}</span>
              <Switch
                loading={isPending}
                checked={Boolean(status)}
                onChange={(val) =>
                  mutateIsActive({ id: shop?.id, is_active: val })
                }
              />
            </>
          ) : null}
          <Button danger onClick={closeEditModal} type="primary">
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            {shop ? "Save" : "Create"}
          </Button>
        </div>

        <MainParts setImageUrl={setImageUrl} imageUrl={imageUrl} />
        <SelectParts />
        <CheckboxFeatures
          form={form}
          selectBlog={selectBlog}
          setSelectBlog={setSelectBlog}
        />

        <DetailsParts
          languages={languages}
          languageId={languageId}
          setLanguageId={setLanguageId}
          form={form}
          showVlog={showVlog}
          setShowVlog={setShowVlog}
        />
      </Form>
      <DeactivateModal
        setDeactivate={setOpen}
        deactivate={open}
        title={"Delete"}
        description={"Are you sure you want to delete shop"}
        useDeactivate={() => {
          if (typeof shop === "object") deleteShop({ id: shop?.id });
        }}
      />
    </Drawer>
  );
}
