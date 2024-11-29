import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { Button, Form, FormInstance, Input, Select } from "antd";
import apple from "../../assets/images/apple.svg";
import android from "../../assets/images/android.svg";
import { useFetchLanguages } from "../../hooks/banners/useFetchLanguages.hook";
import { ApiVersions } from "@repo/types/src/app-versions";
import { LanguagesType } from "@repo/types/src/marketing-content";
import { Refetch } from "@repo/types";
import { appVersionsApi } from "../../services/app-versions";
import DangerousIcon from "../../assets/icons/DangerousIcon";
import { useCheckEmptyArrItem } from "../../hooks/helpers/useCheckEmptyArrItem";
import TabList from "../../components/tabs/TabList";
import { initialValuesAppDetails } from "./initial-values-app-details";

interface FormValues {
  details: {
    title: string;
    description: string;
    language_id: any;
  }[];
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
  const [languageId, setLanguageId] = useState<number>(
    typeof data === "object" && data?.language_id ? data?.language_id : 1
  );

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
  const appWatch = Form.useWatch("details", form);
  const isTrueAllItems = useCheckEmptyArrItem(appWatch);
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
        details: initialValuesAppDetails,
        version: "",
        os: "",
      });
    }
    if (data?.language_id) {
      setLanguageId(data.language_id);
      form.setFieldValue(
        ["details", data?.language_id - 1, "language_id"],
        data?.language_id
      );
    }
  }, [isEdit]);

  return (
    <Form layout="vertical" onFinish={handleSubmit} form={form}>
      <>
        <div className="flex items-center justify-between mb-[24px]">
          <h1 className="text-title">
            {isEdit ? "Edit Version" : "Create Version"}
          </h1>
          <div className="flex items-center gap-[16px]">
            {isEdit && (
              <Button
                icon={<DangerousIcon />}
                onClick={() => {
                  setOpenDeleteModal(data?.id);
                }}
                type="default"
                className="hover:!border-oxford-blue-50 hover:!text-black"
              >
                Delete version
              </Button>
            )}
            <Button
              onClick={() => {
                form.resetFields();
                setOpenDrawer(undefined);
              }}
              className="bg-red-50 text-red-500 border-red-50 hover:!bg-red-50 hover:!text-red-500 hover:!border-red-50"
              htmlType="reset"
            >
              Cancel
            </Button>
            <Button htmlType="submit" type="primary">
              Save
            </Button>
          </div>
        </div>
        <div className="rounded-[12px] bg-white pt-[16px] pl-[16px] pr-[16px] flex gap-[16px] mb-[24px]">
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
                </div>
              </div>
            );
          }}
        </Form.List>
      </>
    </Form>
  );
};

export default CreateEdit;
