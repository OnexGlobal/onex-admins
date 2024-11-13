import { Refetch } from "@repo/types";
import { BlogType, LanguagesType } from "@repo/types/src/marketing-content";
import { Button, Drawer, Form, Input, Switch, Tooltip } from "antd";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useCheckEmptyArrItem } from "../../hooks/helpers/useCheckEmptyArrItem";
import { useCreateAndEditBlog } from "../../hooks/blog/useCreateAndEditBlog.hook";
import {
  notificationError,
  notificationSuccess,
} from "../../helpers/notification";
import { useIsActiveBlog } from "../../hooks/blog/useIsActiveBlog.hook";
import { useDeleteBlog } from "../../hooks/blog/useDeleteBlog.hook";
import { blogInitialValue } from "./initial-value-blog-form";
import AlertCircleIcon from "../../assets/icons/AlertCircleIcon";
import TabList from "../../components/tabs/TabList";
import InfoIcon from "../../assets/icons/InfoIcon";
import { UploadImages } from "../../components/buttons/UploadImages";
import { DeactivateModal } from "../../components/modals/DeactivateModal";

interface Props {
  blog: BlogType | boolean;
  setBlog: Dispatch<SetStateAction<BlogType | boolean>>;
  reFetchBlogs: Refetch;
  languages: LanguagesType[];
  blog_delete?: boolean;
}

export default function CreateBlogDrawer({
  reFetchBlogs,
  setBlog = () => {},
  blog,
  languages,
  blog_delete,
}: Props) {
  const [languageId, setLanguageId] = useState(1);
  const [imageUrl, setImageUrl] = useState<Record<number, string>>({});

  const [status, setStatus] = useState(0);
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm();
  const blogs = Form.useWatch("details", form);
  const isTrueAllItems = useCheckEmptyArrItem(blogs);

  useEffect(() => {
    if (typeof blog === "object") {
      blog?.blogsMl?.forEach((ml) => {
        Object.entries(ml).forEach(([key, val]) => {
          form.setFieldValue(["details", +ml?.language_id - 1, key], val);
        });
        setImageUrl((pre) => ({ ...pre, [+ml?.language_id]: ml?.image }));
      });
      setStatus(blog.is_active);
      if (blog?.language_id) {
        setLanguageId(blog.language_id);
        form.setFieldValue(
          ["details", blog?.language_id - 1, "language_id"],
          blog?.language_id
        );
      }
    }
  }, [blog]);

  const { mutate } = useCreateAndEditBlog(
    (data) => {
      setBlog(false);
      setImageUrl({});
      notificationSuccess("Blog", data?.data?.message);
      reFetchBlogs();
      form.resetFields();
      setLanguageId(1);
    },
    (e) => {
      Object.values(e?.response?.data?.data).forEach((val) => {
        notificationSuccess(val[0], "Something went wrong");
      });
    }
  );
  const createBlogs = (values: { details: BlogType["blogsMl"] }) => {
    const formData = new FormData();
    if (values) {
      values?.details?.map((detail, index) => {
        if (isTrueAllItems[index]) {
          Object.entries(detail).forEach(([key, value]) => {
            if (value) {
              formData.append(`details[${index}][${key}]`, value as string);
            }
          });
        }
      });

      if (typeof blog === "object") {
        formData.append("_method", "put");
      }
      mutate({ id: typeof blog === "object" ? blog.id : undefined, formData });
    }
  };

  const closeEditModal = () => {
    form.resetFields();
    setImageUrl({});
    setBlog(false);
    setLanguageId(1);
  };

  const { mutate: mutateIsActive, isPending } = useIsActiveBlog(
    (data) => {
      notificationSuccess("Blog Active", data?.data?.message);
      setStatus((data?.data?.data as { is_active: number })?.is_active);
      reFetchBlogs();
    },
    (e) => {
      notificationError(
        "Blog Activate",
        e?.response?.data?.message || "something went wrong"
      );
    }
  );

  const { mutate: deleteBlog } = useDeleteBlog(
    (data) => {
      notificationSuccess("Success", data?.data?.message);
      setImageUrl({});
      setOpen(false);
      form.resetFields();
      reFetchBlogs();
      setBlog(false);
      setLanguageId(1);
    },
    () => {
      notificationError("Activate", "something went wrong");
    }
  );

  return (
    <Drawer onClose={closeEditModal} open={!!blog} width="1112px">
      <Form
        initialValues={blogInitialValue}
        form={form}
        name="createBlog"
        layout="vertical"
        onFinish={createBlogs}
      >
        <div className="flex items-center gap-[16px] mb-[16px]">
          <span className="text-[22px] font-[500] ">
            {typeof blog === "object" ? "Edit blog" : "Create blog"}
          </span>

          {typeof blog === "object" ? (
            <>
              {blog_delete ? (
                <Button
                  type="default"
                  icon={<AlertCircleIcon />}
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  Delete Blog
                </Button>
              ) : null}
              <span>{status ? "Active" : "Inactive"}</span>
              <Switch
                loading={isPending}
                checked={Boolean(status)}
                style={{ margin: "0 16px 0 0" }}
                onChange={(val) => {
                  mutateIsActive({ id: blog?.id, is_active: +val });
                }}
              />
            </>
          ) : null}
          <Button danger onClick={closeEditModal}>
            Cancel
          </Button>
          <Button htmlType="submit" type="primary">
            {blog ? "Save" : "Create"}
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

                <div className={"_paper"}>
                  <Form.Item
                    name={[languageId - 1, "image"]}
                    rules={[
                      {
                        required: true,
                        message: "Missing Images.",
                      },
                    ]}
                    label={
                      <div className="flex items-center gap-[4px]">
                        Image
                        <Tooltip
                          color={"#0A2540"}
                          title={
                            <span>
                              Dimensions{" "}
                              <span style={{ fontWeight: 700 }}>
                                315 × 315px
                              </span>{" "}
                              <br />
                              SVG, JPG, PNG
                            </span>
                          }
                          placement={"right"}
                        >
                          <InfoIcon
                            color={"#5B6D7F"}
                            style={{ margin: "0 0 0 4px" }}
                          />
                        </Tooltip>
                      </div>
                    }
                  >
                    <UploadImages
                      imageUrl={imageUrl ? imageUrl[languageId] : ""}
                      setImageUrl={(img) =>
                        setImageUrl({ ...imageUrl, [languageId]: img })
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    name={[languageId - 1, "title"]}
                    label="Blog title"
                    rules={[
                      {
                        required: true,
                        message: "Missing Blog Title.",
                      },
                    ]}
                  >
                    <Input
                      style={{ minHeight: "52px" }}
                      placeholder={"Blog title"}
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
                  <div className="flex mt-[32px] w-full">
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
                            message: "Missing Button name.",
                          },
                        ]}
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
        title={"Delete blog"}
        description={"Are you sure you want to delete blog"}
        useDeactivate={() => {
          if (typeof blog === "object") deleteBlog({ id: blog?.id });
        }}
      />
    </Drawer>
  );
}
