import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { Button, Form, FormInstance, Input, Select, Tabs } from "antd";
import apple from "../../assets/images/apple.svg";
import android from "../../assets/images/android.svg";
import { useFetchLanguages } from "../../hooks/banners/useFetchLanguages.hook";
import { ApiVersions } from "@repo/types/src/app-versions";
import { LanguagesType } from "@repo/types/src/marketing-content";
import { Refetch } from "@repo/types";
import { appVersionsApi } from "../../services/app-versions";
import DangerousIcon from "../../assets/icons/DangerousIcon";
import check from "../../assets/images/check-circle.svg";

interface FormValues {
  details: { title: string; description: string }[];
  update_type: string | string[];
  version: number | string;
  os: string;
}

interface Props {
  data?: ApiVersions;
  setOpenDrawer: Dispatch<SetStateAction<undefined | ApiVersions | true>>;
  setOpenDeleteModal: Dispatch<SetStateAction<number | undefined>>;
  refetch: Refetch;
  closeModal: () => void;
  form: FormInstance<FormValues>;
  languages?: LanguagesType[];
}

const CreateEdit: FC<Props> = ({
  data,
  setOpenDrawer,
  setOpenDeleteModal,
  refetch,
  form,
  closeModal = () => {},
}) => {
  const isEdit = Boolean(data?.id);
  const { languages } = useFetchLanguages();

  const handleSubmit = (values: FormValues) => {
    const afterSave = () => {
      closeModal();
      setOpenDrawer(undefined);
      refetch();
    };
    const form: { [key: string]: string | number | boolean | any[] } = {
      ...values,
      dev_mode: false,
      force_update: false,
    };

    const details = values.details.filter(
      (item) => item.title && item.description
    );
    for (let update_type of values.update_type) {
      if (update_type === "all_update_types") {
        form.force_update = true;
        form.dev_mode = true;
      } else {
        form[update_type] = true;
      }
    }
    form.details = details;
    delete form.update_type;
    if (isEdit) {
      appVersionsApi.editVersion(data?.id, form).then(afterSave);
    } else {
      appVersionsApi.createVersion(form).then(afterSave);
    }
  };
  const update_type: string[] = [];
  if (data?.id) {
    if (data?.force_update) update_type.push("force_update");
    if (data?.dev_mode) update_type.push("dev_mode");
  }

  useEffect(() => {
    if (isEdit) {
      const initialValues = {
        update_type,
        details: data?.apiVersionsMl,
        version: data?.version || "",
        os: data?.os || "",
      };
      form.setFieldsValue({
        ...initialValues,
      });
    } else {
      form.setFieldsValue({
        update_type: [],
        details: [],
        version: "",
        os: "",
      });
    }
  }, [isEdit]);
  return (
    <Form layout="vertical" onFinish={handleSubmit} form={form}>
      <>
        <div className="flex items-center justify-between mb-[24px]">
          <div className="page-title">
            <span className="text-[24px] block text-black font-[500]">
              {isEdit ? "Edit Version" : "Create Version"}
            </span>
          </div>
          <div className="flex items-center gap-[16px]">
            {isEdit && (
              <Button
                icon={<DangerousIcon />}
                onClick={() => {
                  setOpenDeleteModal(data?.id);
                }}
                htmlType="button"
                type="primary"
                danger
              >
                Delete
              </Button>
            )}
            <Button
              onClick={() => {
                form.resetFields();
                setOpenDrawer(undefined);
              }}
              htmlType="reset"
              type="default"
            >
              Cancel
            </Button>
            <Button htmlType="submit" type="primary">
              Save
            </Button>
          </div>
        </div>
        <div className="_paper flex gap-[16px] mb-[24px]">
          <Form.Item
            label="Version"
            name="version"
            className="flex-1"
            rules={[{ required: true, message: "Please add version" }]}
          >
            <Input placeholder="Version" />
          </Form.Item>
          <Form.Item
            label="Select system"
            name="os"
            className="flex-1"
            rules={[{ required: true, message: "Please select os" }]}
          >
            <Select
              style={{ height: "36px" }}
              placeholder={"Select system"}
              options={[
                {
                  value: "android",
                  label: (
                    <div className="flex items-center gap-[5px]">
                      <img alt={"android"} src={android} />
                      Android
                    </div>
                  ),
                },
                {
                  value: "ios",
                  label: (
                    <div className="flex items-center gap-[5px]">
                      <img alt={"apple"} src={apple} />
                      IOS
                    </div>
                  ),
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="All update types"
            name="update_type"
            className="flex-1"
            rules={[{ required: true, message: "Please select update types" }]}
          >
            <Select
              style={{ height: "36px" }}
              mode="multiple"
              placeholder={"All update types"}
              options={[
                {
                  value: "force_update",
                  label: "Force Update",
                  name: "force_update",
                },
                { value: "dev_mode", label: "Dev Mode", name: "dev_mode" },
              ]}
            />
          </Form.Item>
        </div>
        <Tabs
          style={{ marginBottom: 25 }}
          items={languages?.map((language, index) => {
            return {
              key: String(language?.id),
              label: (
                <div className="flex items-center">
                  <div
                    className={
                      isEdit &&
                      data?.apiVersionsMl?.some(
                        (item) => language?.id === item.language_id
                      )
                        ? "with-circle"
                        : "with-circle-none"
                    }
                  >
                    <img src={language?.flag} alt="" />
                    <img src={check} alt="" className="circle" />
                  </div>
                  <p className="pl-[7px] text-[14px] font-[500] text-oxford-blue-400">
                    {language?.name}
                  </p>
                </div>
              ),
              children: (
                <div className="title-box">
                  <Form.Item
                    hidden
                    name={["details", index, "language_id"]}
                    initialValue={`${language.id}`}
                  />
                  <Form.Item label="Title" name={["details", index, "title"]}>
                    <Input placeholder="Version" />
                  </Form.Item>
                  <Form.Item
                    label="Description"
                    name={["details", index, "description"]}
                  >
                    <Input placeholder="Description" />
                  </Form.Item>
                </div>
              ),
            };
          })}
        />
      </>
    </Form>
  );
};

export default CreateEdit;
