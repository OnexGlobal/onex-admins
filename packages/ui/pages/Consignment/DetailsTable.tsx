import { Button, Form, Input, Table } from "antd";
import { FC, useState } from "react";
import { consignmentApi } from "../../services/consignment";
import { Box } from "../../../types/src/consignment";
import { useMutation } from "@tanstack/react-query";
import { notificationSuccess } from "../../helpers/notification";
import VWeightInput from "../../components/inputs/VWeightInput";
import CancelIcon from "../../assets/icons/CancelIcon";
import CheckIcon from "../../assets/icons/CheckIcon";
import { EditIcon } from "../../assets/icons/EditIcon";

interface Props {
  boxDetails: Box[];
  reFetchConsignment: () => void;
  reFetchList: () => void;
}
const ConsignmentDetailsTable: FC<Props> = ({
  boxDetails = [],
  reFetchConsignment = () => {},
  reFetchList = () => {},
}) => {
  const [form] = Form.useForm();
  const [editable, setEditable] = useState(false);
  const [id, setId] = useState<number | null | string>(null);

  const { mutate } = useMutation({
    mutationKey: ["edit-condignment-box"],
    mutationFn: consignmentApi.editConsignmentBox,
    onSuccess: (data) => {
      boxDetails?.forEach((order, i) => {
        if (order.id === data?.data?.data.id) {
          return (boxDetails[i] = data?.data?.data);
        }
      });
      reFetchConsignment();
      reFetchList();
      notificationSuccess(
        "Box Orders",
        "Box Order information updated successfully"
      );
      setEditable(false);
    },
    onError: (e) => {
      console.log(e, "errrr");
    },
  });
  const onReset = () => {
    form.resetFields();
    setEditable(false);
  };
  const edit = (el: Box) => {
    setId(el.id);
    form.setFieldsValue({
      tracking_code: el?.tracking_code,
      total_weight: el?.total_weight || 0,
      total_v_weight: el?.total_v_weight,
      width: el?.width,
      length: el?.length,
      height: el?.height,
    });
    setEditable(true);
  };
  const save = async () => {
    const row = await form.validateFields();
    mutate({ id: id, ...row });
  };
  const columns = [
    {
      key: "id",
      dataIndex: "id",
      title: "ID",
    },
    {
      key: "packages",
      dataIndex: "packages",
      title: "Packages",
    },
    {
      key: "dimensions",
      dataIndex: "dimensions",
      title: "Dimensions",
    },
    {
      key: "tracking",
      dataIndex: "tracking",
      title: "Tracking",
    },
    {
      key: "weight",
      dataIndex: "weight",
      title: "Weight",
    },
    {
      key: "v_weight",
      dataIndex: "v_weight",
      title: "V weight",
    },
    {
      key: "edit",
      dataIndex: "edit",
      title: " ",
    },
  ];
  const data = boxDetails?.map((el, i) => ({
    key: i,
    id: (
      <span className="text-black text-[14px] font-[400]">
        {el?.reference_id}
      </span>
    ),
    packages: (
      <span className="text-black text-[14px] font-[400]">
        {el?.orders_count}
      </span>
    ),
    dimensions: (
      <span className="text-black text-[14px] font-[400]">
        {el?.width} x {el?.height} x {el?.length}
      </span>
    ),
    tracking:
      editable && el?.id === id ? (
        <Form.Item name="tracking_code">
          <Input />
        </Form.Item>
      ) : (
        <span className="text-black text-[14px] font-[400]">
          {el?.tracking_code}
        </span>
      ),
    weight:
      editable && el?.id === id ? (
        <Form.Item name="total_weight">
          <Input />
        </Form.Item>
      ) : (
        <span className="text-black text-[14px] font-[400]">
          {el?.total_weight}
        </span>
      ),
    v_weight:
      editable && el?.id === id ? (
        <VWeightInput form={form} />
      ) : (
        <span className="text-black text-[14px] font-[400]">
          {el?.total_v_weight}
        </span>
      ),
    edit: (
      <div>
        {editable && el?.id === id ? (
          <div className="flex">
            <div style={{ marginRight: 8 }} onClick={onReset}>
              <CancelIcon />
            </div>
            <Button
              className="bg-green-50"
              icon={<CheckIcon />}
              onClick={save}
            />
          </div>
        ) : (
          <Button
            className="bg-green-50"
            icon={<EditIcon />}
            onClick={() => edit(el)}
          />
        )}
      </div>
    ),
  }));

  return (
    <Form form={form} component={false}>
      <Table columns={columns} dataSource={data} pagination={false} />
    </Form>
  );
};

export default ConsignmentDetailsTable;
