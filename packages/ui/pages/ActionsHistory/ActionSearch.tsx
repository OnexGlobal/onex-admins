import {
  AutoComplete,
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Space,
  Tag,
} from "antd";
import { Dispatch, SetStateAction, useState } from "react";
import dayjs from "dayjs";
import { useSubjectTypes } from "../../hooks/actions-history/useSubjectTypes.hook";
import useGetRecipients from "../../hooks/recipients/useGetRecipients.hook";
import { SearchIcon } from "../../assets/icons/SearchIcon";

interface Props {
  setFilter: Dispatch<SetStateAction<object>>;
}

export default function ActionSearch({ setFilter }: Props) {
  const { subject_types = [] } = useSubjectTypes();
  const [form] = Form.useForm();
  const [searchBy, setSearchBy] = useState("");
  const [user_info, setUserInfo] = useState("");
  const [selectId, setSelectId] = useState<string | null>(null);
  const { recipients: usersList = [] } = useGetRecipients(
    user_info ? { user_info } : null
  );
  const onFinish = (values: object) => {
    const newValues: { [key: string]: string } = {};
    Object.entries(values).forEach(([key, val]) => {
      if (val) {
        if (key === "date") {
          newValues["start_date"] = dayjs(val[0]).format("YYYY-MM-DD");
          newValues["end_date"] = dayjs(val[1]).format("YYYY-MM-DD");
        } else {
          newValues[key] = val;
        }
        if (selectId) {
          newValues["subject_id"] = selectId;
        }
      }
    });
    setFilter(newValues);
  };
  const reset = () => {
    form.resetFields();
    setFilter({});
    setSearchBy("");
    setSelectId(null);
  };
  return (
    <Form layout="vertical" onFinish={onFinish} form={form}>
      <div className="flex items-center gap-[16px]">
        <Space.Compact style={{ alignItems: "flex-end" }}>
          <Form.Item label={"Search by"} name={"subject_type"}>
            <Select
              defaultValue="All"
              style={{ width: 180 }}
              onSelect={(_, val) => {
                setSearchBy(val.label === "All" ? "" : val.label);
                setSelectId(null);
                form.setFieldValue("subject_id", "");
              }}
              options={[{ value: "", label: "All" }, ...subject_types]}
            />
          </Form.Item>
          <Form.Item
            name={"subject_id"}
            style={{ width: 290 }}
            rules={[
              {
                required: Boolean(searchBy),
                message: "This field is required",
              },
            ]}
          >
            {searchBy === "Recipient" ? (
              <AutoComplete
                placeholder="Search by User Code"
                onSearch={(val) => setUserInfo(val.trim())}
                onSelect={(_, el) => setSelectId(el.user_code)}
                options={usersList}
              />
            ) : (
              <Input
                placeholder={`Search by ${
                  searchBy === "Order"
                    ? "Tracking code"
                    : searchBy === "Recipient"
                      ? "User Code"
                      : "Id"
                }`}
                disabled={!searchBy}
                onKeyDown={(e) => {
                  if (e.keyCode === 13) {
                    // handleSearch();
                  }
                }}
              />
            )}
          </Form.Item>
        </Space.Compact>

        <Form.Item name={"event"}>
          <Select
            placeholder={"All Actions"}
            options={[
              { value: null, label: "All Actions" },
              {
                value: "created",
                label: <Tag color="green">Created</Tag>,
              },
              {
                value: "updated",
                label: <Tag color="blue">Updated</Tag>,
              },
              {
                value: "deleted",
                label: (
                  <Tag color="red">
                    <Tag color="blue">Updated</Tag>
                  </Tag>
                ),
              },
            ]}
          />
        </Form.Item>

        <Form.Item name={"date"}>
          <DatePicker.RangePicker
            onChange={(val) => {
              if (!val) {
                setFilter((pre) => ({
                  ...pre,
                  end_date: null,
                  start_date: null,
                }));
              }
            }}
          />
        </Form.Item>

        <Form.Item>
          <Button htmlType="reset" onClick={() => reset()} type={"default"}>
            Reset
          </Button>
        </Form.Item>

        <Form.Item>
          <Button icon={<SearchIcon />} htmlType={"submit"} type="primary">
            Search
          </Button>
        </Form.Item>
      </div>
    </Form>
  );
}
