import { Button, Col, Form, Input, Row, Select } from "antd";
import { Dispatch, FC, SetStateAction, useState } from "react";
import useGetWarehouses from "../../hooks/warehouses/useWarehouses.hook";
import ShowLessIcon from "../../assets/icons/ShowLessIcon";
import { SearchIcon } from "../../assets/icons/SearchIcon";
import { WarehouseType } from "@repo/types/src/warehouse-type";

interface Props {
  setFilterData: Dispatch<SetStateAction<Record<string, any>>>;
}
const ConsignmentTopActions: FC<Props> = ({ setFilterData }) => {
  const [more, setMore] = useState(false);
  const [warehouse, setWarehouse] = useState<WarehouseType | undefined>();
  const { data: warehouses } = useGetWarehouses();
  const [form] = Form.useForm();
  const onFinish = (values: Record<string, any>) => {
    let newValues: Record<string, any> = {};
    Object.entries(values).forEach(([key, val]) => {
      if (val) {
        newValues[key] = val;
      }
    });
    setFilterData(newValues);
  };

  const onReset = () => {
    form.resetFields();
  };

  return (
    <div className={"_paper mb-[24px]"}>
      <Form layout="vertical" onFinish={onFinish} form={form}>
        <Row gutter={16} className="row">
          <Col lg={3}>
            <Form.Item name="name">
              <Input placeholder="Consignment name" />
            </Form.Item>
          </Col>
          <Col lg={3}>
            <Form.Item name="parcel_id">
              <Input placeholder="Consignment ID" />
            </Form.Item>
          </Col>
          <Col lg={3}>
            <Form.Item name="air_waybill">
              <Input placeholder="Air way bill" />
            </Form.Item>
          </Col>
          <Col lg={4}>
            <Form.Item name="freight_forwarder">
              <Input placeholder="Freight forwarder" />
            </Form.Item>
          </Col>
          <Col lg={3}>
            <Form.Item name="warehouse_id">
              <Select
                style={{ height: 36 }}
                placeholder="All Warehouse"
                onChange={(val) => {
                  setWarehouse(warehouses?.find((el) => el?.value === val));
                  form.setFieldValue("dispatch_id", null);
                }}
                options={warehouses}
              />
            </Form.Item>
          </Col>
          <Col lg={3} className="fly-sea">
            <Form.Item name="dispatch_id">
              <Select placeholder={"Select dispatch"} style={{ height: 36 }}>
                {warehouse?.dispatches?.map((dispatch, i) => (
                  <Select.Option key={i} value={dispatch?.type}>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      {
                        <img
                          alt={"dispatch"}
                          src={dispatch?.icon}
                          width={24}
                          style={{ margin: "0 8px 0 0" }}
                        />
                      }
                      {dispatch?.name}
                    </div>
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col lg={2}>
            <Form.Item name="total_weight">
              <Input placeholder="Weight" />
            </Form.Item>
          </Col>
          <Col lg={3}>
            <Form.Item name="comment">
              <Input placeholder="Onex comment" />
            </Form.Item>
          </Col>
        </Row>
        <div className="ml-auto gap-[16px] flex w-fit">
          <Button htmlType="reset" type="default" onClick={onReset}>
            Reset
          </Button>
          <Button htmlType="submit" type="primary" icon={<SearchIcon />}>
            Search
          </Button>
        </div>
      </Form>
    </div>
  );
};
export default ConsignmentTopActions;
