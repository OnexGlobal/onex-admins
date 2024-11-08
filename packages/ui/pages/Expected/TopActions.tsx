import {
  AutoComplete,
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Tag,
} from "antd";
import { useState } from "react";
import useSmartServices from "@repo/ui/hooks/smart-services/useSmartServices.hook";
import useCategories from "@repo/ui/hooks/categories/useCategories.hook";
import useGetRecipients from "@repo/ui/hooks/recipients/useGetRecipients.hook";
import FlyIcon from "@repo/ui/assets/icons/FlyIcon";
import { SearchIcon } from "@repo/ui/assets/icons/SearchIcon";
import useGetWarehouses from "@repo/ui/hooks/warehouses/useWarehouses.hook";
import dayjs from "dayjs";
import ShowLessIcon from "@repo/ui/assets/icons/ShowLessIcon";

const { RangePicker } = DatePicker;

interface Props {
  setFilters: (
    val: Record<string, string | number | boolean | undefined>
  ) => void;
  fullNameFromUrl?: string | null;
}

export default function ExpectedTopActions({
  setFilters,
  fullNameFromUrl,
}: Props) {
  const [more, setMore] = useState(false);
  const { data: warehouses } = useGetWarehouses();
  const { smartServices = [] } = useSmartServices();
  const { categories } = useCategories();
  const [userInfo, setUserInfo] = useState<null | Record<string, string>>(null);
  const { recipients = [] } = useGetRecipients(userInfo);
  const [form] = Form.useForm();

  const onFinish = (values: object) => {
    const newValue: { [key: string]: string | number } = {};
    Object.entries(values).forEach(([key, val]) => {
      if (val !== undefined) {
        if (key === "date") {
          newValue["start_date"] = dayjs(val[0]).format("YYYY-MM-DD");
          newValue["end_date"] = dayjs(val[1]).format("YYYY-MM-DD");
        } else {
          newValue[key] = val;
        }
      }
    });
    setFilters(newValue);
  };

  const handleResetForm = () => {
    form.resetFields();
    setFilters({ status: 1 });
  };

  return (
    <div className="flex flex-col w-[100%]">
      <Form
        className="rounded-[12px] bg-white pt-[16px] pl-[16px] pr-[16px] mb-[16px] h-max"
        form={form}
        initialValues={[
          {
            orderStatus: "status1",
            user_info: fullNameFromUrl ? fullNameFromUrl : "",
          },
        ]}
        onFinish={onFinish}
      >
        <div
          className={`w-[100%] overflow-hidden justify-between ${
            more ? "max-h-[500px]" : "max-h-[55px]"
          } transition-all transition-duration-[0.3s]`}
        >
          <div className="flex flex-wrap">
            <Form.Item name="user_info" style={{ width: 200, marginRight: 16 }}>
              <AutoComplete
                placeholder="Full name or user code"
                onSearch={(val) =>
                  setUserInfo(val ? { user_info: val?.trim() } : null)
                }
                options={recipients}
              />
            </Form.Item>

            <Form.Item
              name="tracking_code"
              rules={[{ min: 7 }]}
              className="w-[200px] mr-[16px]"
            >
              <Input placeholder="Tracking code" />
            </Form.Item>

            <Form.Item name={"date"} className="w-[250px] mr-[16px]">
              <RangePicker />
            </Form.Item>

            <Form.Item name="warehouse_id" className="w-[190px] mr-[16px]">
              <Select placeholder="All Warehouses" options={warehouses || []} />
            </Form.Item>

            <Form.Item name="dispatch_type" className="w-[200px] mr-[16px]">
              <Select
                placeholder={
                  <div className="flex items-center flex-nowrap">
                    <FlyIcon margin={"0 5px 0 0"} />
                    Air
                  </div>
                }
                options={[
                  {
                    value: "air",
                    label: (
                      <div className="flex items-center flex-nowrap">
                        <FlyIcon margin={"0 5px 0 0"} />
                        Air
                      </div>
                    ),
                  },
                ]}
              />
            </Form.Item>

            <Form.Item name="is_person" className="w-[200px] mr-[16px]">
              <Select
                placeholder="User Type"
                options={[
                  { value: "1", label: "Person" },
                  { value: "0", label: "Company" },
                ]}
              />
            </Form.Item>

            <Form.Item name="without_invoice" className="w-[200px] mr-[16px]">
              <Select
                placeholder="Invoice"
                options={[
                  { value: "0", label: "Has Invoice" },
                  { value: "1", label: "Missing Invoice" },
                ]}
              />
            </Form.Item>

            <Form.Item name="category_id" className="w-[250px] mr-[16px]">
              <Select
                placeholder="Select category"
                options={categories || []}
              />
            </Form.Item>

            <Form.Item name="status" className="w-[180px] mr-[16px]">
              <Select
                placeholder="Order condition"
                options={[
                  {
                    value: "1",
                    label: (
                      <Tag className="bg-sea-green-50 text-sea-green-500 mt-[2px]">
                        Active
                      </Tag>
                    ),
                  },
                  {
                    value: "0",
                    label: (
                      <Tag className="bg-orange-50 text-orange-600 mt-[2px]">
                        Deactivated
                      </Tag>
                    ),
                  },
                ]}
              />
            </Form.Item>

            <Form.Item name="services" className="w-[220px] mr-auto">
              <Select
                placeholder="Service type"
                options={[{ value: "all", label: "All" }, ...smartServices]}
              />
            </Form.Item>
          </div>
        </div>
        <div className="flex w-[100%] justify-end gap-[16px] mb-[16px]">
          <Button
            onClick={() => setMore(!more)}
            type="link"
            className="text-oxford-blue-300 hover:!text-green-500"
            icon={<ShowLessIcon rotate={more ? "0deg" : "-180deg"} />}
          >
            {more ? "Show less" : "Show more"}
          </Button>
          <Button
            color="default"
            onClick={() => handleResetForm()}
            className="hover:!text-black hover:!border-oxford-blue-50"
          >
            Reset
          </Button>
          <Button
            icon={<SearchIcon />}
            htmlType="submit"
            color="primary"
            variant="solid"
          >
            Search
          </Button>
        </div>
      </Form>
    </div>
  );
}
