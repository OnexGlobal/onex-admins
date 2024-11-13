import {
  AutoComplete,
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Space,
} from "antd";
import { AdditionalInfoIcon } from "@repo/ui/assets/icons/AdditionalInfoIcon";
import DangerousIcon from "@repo/ui/assets/icons/DangerousIcon";
import FlyIcon from "@repo/ui/assets/icons/FlyIcon";
import MissingIcon from "@repo/ui/assets/icons/MissingIcon";
import { SearchIcon } from "@repo/ui/assets/icons/SearchIcon";
import ShowLessIcon from "@repo/ui/assets/icons/ShowLessIcon";
import useCategories from "@repo/ui/hooks/categories/useCategories.hook";
import useGetRecipients from "@repo/ui/hooks/recipients/useGetRecipients.hook";
import useSmartServices from "@repo/ui/hooks/smart-services/useSmartServices.hook";
import useGetWarehouses from "@repo/ui/hooks/warehouses/useWarehouses.hook";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Filters } from "@repo/types/src/orders";
import useGetParcel from "@repo/ui/hooks/parcel/useGetParcel.hook";
import useGetPickupPoints from "@repo/ui/hooks/pickup-point/useGetPickupPoints.hook";
import dayjs from "dayjs";
import ShipIcon from "@repo/ui/assets/icons/ShipIcon";

const { RangePicker } = DatePicker;

interface Props {
  setFilters: Dispatch<SetStateAction<Filters>> | (() => void);
}

export default function OrdersTopActions({ setFilters }: Props) {
  const [more, setMore] = useState(false);
  const [pointSearch, setPointSearch] = useState({});
  const { pickupPointList } = useGetPickupPoints(pointSearch);
  const [parcelSearch, setParcelSearch] = useState({});
  const { parcelList } = useGetParcel(parcelSearch);
  const [userInfo, setUserInfo] = useState<{ user_info: string } | null>(null);
  const [hasCost, setHasCost] = useState(false);
  const { recipients: usersList } = useGetRecipients(
    userInfo && userInfo?.user_info?.trim()?.length === 0 ? null : userInfo
  );
  const { categories } = useCategories();
  const [form] = Form.useForm();

  const { data: warehouses = [] } = useGetWarehouses();
  const { smartServices = [] } = useSmartServices();
  const handleFinish = (values: object) => {
    const newValues: { [key: string]: string } = {};
    Object.entries(values).forEach(([key, val]) => {
      if (key === "date" && val) {
        newValues["start_date"] = dayjs(val[0]).format("YYYY-MM-DD");
        newValues["end_date"] = dayjs(val[1]).format("YYYY-MM-DD");
      } else if (val) {
        newValues[key] = val;
      }
    });

    setFilters(newValues);
  };

  useEffect(() => {
    const search = window.location.search;
    if (search) {
      const searchKeys = search.split("=");

      // search come from receive orders
      if (searchKeys[0] === "?user_info") {
        setFilters({ user_info: searchKeys[1] });
        form.setFieldValue("user_info", searchKeys[1]);
      } else {
        // search come from customer single page
        const status = searchKeys[1].split("&")[0];
        setFilters({ user_info: searchKeys[2], order_status: status });

        form.setFieldsValue({ user_info: searchKeys[2], order_status: status });
      }
    }
  }, []);

  const handleResetForm = () => {
    form.resetFields();
    setFilters({});
  };

  return (
    <Form
      form={form}
      className="rounded-[12px] bg-white pt-[16px] pl-[16px] pr-[16px] mb-[16px] h-max"
      layout="vertical"
      onFinish={handleFinish}
    >
      <div
        className={`w-[100%] overflow-hidden justify-between ${
          more ? "max-h-[500px]" : "max-h-[55px]"
        } transition-all transition-duration-[0.3s]`}
      >
        <div className="flex flex-wrap gap-x-[16px]">
          <Form.Item name="user_info" className="w-[250px]">
            <AutoComplete
              placeholder="Full name or GA"
              onSearch={(val) => {
                setUserInfo({ user_info: val });
              }}
              options={usersList}
            />
          </Form.Item>

          <Form.Item
            name="tracking_code"
            rules={[{ min: 7 }]}
            className="w-[250px]"
          >
            <Input placeholder="Tracking code" />
          </Form.Item>

          <Form.Item name="parcel_id" className="w-[250px]">
            <AutoComplete
              placeholder="Parcel"
              onSearch={(val) => setParcelSearch({ name: val || null })}
              options={parcelList}
            />
          </Form.Item>

          <Form.Item name={"date"}>
            <RangePicker />
          </Form.Item>

          <Form.Item name="order_status" className="w-[250px]">
            <Select placeholder="Order Status">
              <Select.Option value="at_warehouse">At Warehouse</Select.Option>
              <Select.Option value="on_the_way">On the way</Select.Option>
              <Select.Option value="scan">Scanned</Select.Option>
              <Select.Option value="in_georgia">In georgia</Select.Option>
              <Select.Option value="received">Received</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="warehouse_id" className="w-[180px]">
            <Select placeholder="All Warehouses" options={warehouses} />
          </Form.Item>

          <Form.Item name="is_declared" className="w-[250px]">
            <Select placeholder="Declaration">
              <Select.Option value="1">Declared</Select.Option>
              <Select.Option value="0">Not Declared</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="dispatch_type" className="w-[120px]">
            <Select
              placeholder={
                <div className="flex items-center gap-[8px]">
                  <FlyIcon />
                  <ShipIcon />
                </div>
              }
            >
              <Select.Option value="air">
                <div className="flex items-center">
                  <FlyIcon margin={"0 5px 0 0"} />
                  Air
                </div>
              </Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="comment" className="w-[250px]">
            <Input placeholder="Comment" />
          </Form.Item>

          <Form.Item name="pickup_point_id" className="w-[250px]">
            <AutoComplete
              placeholder="Pickup Point"
              onSearch={(val) => setPointSearch({ address: val || null })}
              options={pickupPointList}
            />
          </Form.Item>

          <Form.Item name="category_id" className="w-[250px]">
            <Select placeholder="Select category" options={categories || []} />
          </Form.Item>

          <Form.Item name="services" className="w-[250px]">
            <Select
              placeholder="Service type"
              options={[{ value: null, label: "All" }, ...smartServices]}
              mode={"multiple"}
            />
          </Form.Item>

          <Form.Item name="has_invoice" className="w-[250px]">
            <Select
              placeholder={"Invoice"}
              options={[
                { value: 1, label: "Has invoice" },
                { value: 0, label: "Hasn't invoice" },
              ]}
            />
          </Form.Item>

          <Form.Item name="indicator" className="w-[250px]">
            <Select
              placeholder={"Indicators"}
              options={[
                {
                  value: 1,
                  label: (
                    <div className="flex items-center text-oxford-blue-300">
                      <AdditionalInfoIcon margin={"0 8px 0 0"} />
                      Additional info text{" "}
                    </div>
                  ),
                },
                {
                  value: "missing",
                  label: (
                    <div className="flex items-center text-oxford-blue-300">
                      {" "}
                      <MissingIcon margin={"0 8px 0 0"} />
                      Missing{" "}
                    </div>
                  ),
                },
                {
                  value: "dangerous",
                  label: (
                    <div className="flex items-center text-oxford-blue-300">
                      {" "}
                      <DangerousIcon margin={"0 8px 0 0"} />
                      Dangerous{" "}
                    </div>
                  ),
                },
              ]}
            />
          </Form.Item>

          <Form.Item name="cost">
            <Input placeholder={"Onex cost"} />
          </Form.Item>

          <Space.Compact>
            <Form.Item name="has_additional_cost">
              <Select
                style={{ width: 120 }}
                placeholder={"Add cost"}
                options={[
                  { value: 0, label: "No add cost" },
                  { value: 1, label: "Add cost" },
                ]}
                onSelect={(val) => {
                  setHasCost(val);
                  form.setFieldValue("additional_cost", "");
                }}
              />
            </Form.Item>
            <Form.Item name="additional_cost">
              <Input
                placeholder={"Cost amount"}
                disabled={!hasCost}
                type={"number"}
              />
            </Form.Item>
          </Space.Compact>
        </div>
      </div>
      <div className="flex w-[100%] justify-end gap-[16px] mb-[16px]">
        <Button
          onClick={() => setMore(!more)}
          type={"link"}
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
  );
}
