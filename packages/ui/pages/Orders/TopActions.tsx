import {
  AutoComplete,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Space,
} from "antd";
import { PrimaryButton } from "components/elements/Button";
import Flex from "components/elements/Flex";
import { AdditionalInfoIcon } from "components/svg-components/AdditionalInfoIcon";
import DangerousIcon from "components/svg-components/DangerousIcon";
import FlyIcon from "components/svg-components/FlyIcon";
import MissingIcon from "components/svg-components/MissingIcon";
import { SearchIcon } from "components/svg-components/SearchIcon";
import ShowLessIcon from "components/svg-components/ShowLessIcon";
import useCategories from "hooks/categories/useCategories.hook";
import useGetRecipients from "hooks/recipients/useGetRecipients.hook";
import useSmartServices from "hooks/smart-services/useSmartServices.hook";
import useGetWarehouses from "hooks/warehouses/useWarehouses.hook";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Filters } from "types/orders";
import useGetParcel from "hooks/parcel/useGetParcel.hook";
import useGetPickupPoints from "hooks/pickup-point/useGetPickupPoints.hook";
import dayjs from "dayjs";
import ShipIcon from "components/svg-components/ShipIcon";

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
    userInfo && userInfo?.user_info?.trim()?.length === 0 ? null : userInfo,
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
      className={"_paper"}
      layout="vertical"
      onFinish={handleFinish}
    >
      <Row
        gutter={16}
        className="row"
        style={{
          overflow: "hidden",
          maxHeight: more ? "1000px" : "55px",
          transition: "0.3s",
        }}
      >
        <Col lg={4}>
          <Form.Item name="user_info">
            <AutoComplete
              placeholder="Full name or GA"
              onSearch={(val) => {
                setUserInfo({ user_info: val });
              }}
              options={usersList}
            />
          </Form.Item>
        </Col>
        <Col lg={4}>
          <Form.Item name="tracking_code" rules={[{ min: 7 }]}>
            <Input placeholder="Tracking code" />
          </Form.Item>
        </Col>
        <Col lg={3}>
          <Form.Item name="parcel_id">
            <AutoComplete
              placeholder="Parcel"
              onSearch={(val) => setParcelSearch({ name: val || null })}
              options={parcelList}
            />
          </Form.Item>
        </Col>
        <Col lg={4}>
          <Form.Item name={"date"}>
            <RangePicker />
          </Form.Item>
        </Col>
        <Col lg={3}>
          <Form.Item name="order_status">
            <Select placeholder="Order Status">
              <Select.Option value="at_warehouse">At Warehouse</Select.Option>
              <Select.Option value="on_the_way">On the way</Select.Option>
              <Select.Option value="scan">Scanned</Select.Option>
              <Select.Option value="in_georgia">In georgia</Select.Option>
              <Select.Option value="received">Received</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col lg={3}>
          <Form.Item name="warehouse_id">
            <Select placeholder="All Warehouses" options={warehouses} />
          </Form.Item>
        </Col>
        <Col lg={3}>
          <Form.Item name="is_declared">
            <Select placeholder="Declaration">
              <Select.Option value="1">Declared</Select.Option>
              <Select.Option value="0">Not Declared</Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col lg={2} className="fly-sea">
          <Form.Item name="dispatch_type">
            <Select
              placeholder={
                <Flex alignItems="center" gap={"8px"}>
                  <FlyIcon />
                  <ShipIcon />
                </Flex>
              }
            >
              <Select.Option value="air">
                <Flex alignItems={"center"}>
                  <FlyIcon margin={"0 5px 0 0"} />
                  Air
                </Flex>
              </Select.Option>
            </Select>
          </Form.Item>
        </Col>
        <Col lg={4}>
          <Form.Item name="comment">
            <Input placeholder="Comment" />
          </Form.Item>
        </Col>
        <Col lg={4}>
          <Form.Item name="pickup_point_id">
            <AutoComplete
              placeholder="Pickup Point"
              onSearch={(val) => setPointSearch({ address: val || null })}
              options={pickupPointList}
            />
          </Form.Item>
        </Col>

        <Col lg={3}>
          <Form.Item name="category_id">
            <Select placeholder="Select category" options={categories || []} />
          </Form.Item>
        </Col>
        <Col lg={4}>
          <Form.Item name="services">
            <Select
              placeholder="Service type"
              options={[{ value: null, label: "All" }, ...smartServices]}
              mode={"multiple"}
            />
          </Form.Item>
        </Col>
        <Col lg={3}>
          <Form.Item name="has_invoice">
            <Select
              placeholder={"Invoice"}
              options={[
                { value: 1, label: "Has invoice" },
                { value: 0, label: "Hasn't invoice" },
              ]}
            />
          </Form.Item>
        </Col>
        <Col lg={3}>
          <Form.Item name="indicator">
            <Select
              placeholder={"Indicators"}
              options={[
                {
                  value: 1,
                  label: (
                    <Flex alignItems={"center"} style={{ color: "#5B6D7F" }}>
                      {" "}
                      <AdditionalInfoIcon margin={"0 8px 0 0"} />
                      Additional info text{" "}
                    </Flex>
                  ),
                },
                {
                  value: "missing",
                  label: (
                    <Flex alignItems={"center"} style={{ color: "#5B6D7F" }}>
                      {" "}
                      <MissingIcon margin={"0 8px 0 0"} />
                      Missing{" "}
                    </Flex>
                  ),
                },
                {
                  value: "dangerous",
                  label: (
                    <Flex alignItems={"center"} style={{ color: "#5B6D7F" }}>
                      {" "}
                      <DangerousIcon margin={"0 8px 0 0"} />
                      Dangerous{" "}
                    </Flex>
                  ),
                },
              ]}
            />
          </Form.Item>
        </Col>
        <Col lg={3}>
          <Form.Item name="cost">
            <Input placeholder={"Onex cost"} />
          </Form.Item>
        </Col>

        <Col>
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
        </Col>
      </Row>
      <Flex width={"100%"} justifyContent={"flex-end"} gap={"16px"}>
        {" "}
        <PrimaryButton
          text={more ? "Show less" : "Show more"}
          onClick={() => setMore(!more)}
          type={"link"}
          icon={<ShowLessIcon rotate={more ? "0deg" : "-180deg"} />}
        />
        <PrimaryButton
          text="Reset"
          type={"default"}
          onClick={() => handleResetForm()}
        />
        <PrimaryButton
          text="Search"
          icon={<SearchIcon />}
          htmlType={"submit"}
        />
      </Flex>
    </Form>
  );
}
