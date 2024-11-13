import { Button, Form, Modal, Select } from "antd";
import InfoIcon from "@repo/ui/assets/icons/InfoIcon";
import { notificationSuccess } from "@repo/ui/helpers/notification";
import { useSendToHub } from "@repo/ui/hooks/orders/useSendToHub.hook";
import useGetParcel from "@repo/ui/hooks/parcel/useGetParcel.hook";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { OrderData } from "@repo/types/src/orders";
import { Box, ParcelType } from "@repo/types/src/parcel-type";

interface Props {
  setSendToHubStatus: Dispatch<SetStateAction<boolean>>;
  order: OrderData;
  sendToHubStatus: boolean;
}

export const SendToHubModal = ({
  sendToHubStatus,
  setSendToHubStatus,
  order,
}: Props) => {
  const [form] = Form.useForm();
  const [boxes, setBoxes] = useState<
    {
      key: number;
      value: number | string;
      label: number | string;
    }[]
  >([]);
  const { parcelList = [] } = useGetParcel({
    per_page: 10000,
    warehouse_id: order?.warehouse?.id,
  });
  const [filterList, setFilterList] = useState<[]>([]);
  const { mutate } = useSendToHub(() => {
    setSendToHubStatus(false);
    notificationSuccess(
      "Sent to hub",
      "This order successfully has been sent to hub!"
    );
  });
  useEffect(() => {
    if (parcelList?.length > 0) {
      setFilterList(parcelList);
    }
  }, [parcelList]);
  const onFinish = (values: object) => {
    if (order) mutate({ orders: [order?.id], ...values });
  };
  const onFilter = (val: string) => {
    const filterData = parcelList?.filter((parcel: { label: string }) =>
      parcel?.label.toLowerCase().includes(val.toLowerCase())
    );
    setFilterList(filterData);
  };
  return (
    <Modal
      title={<InfoIcon />}
      width={450}
      open={sendToHubStatus}
      onCancel={() => setSendToHubStatus(false)}
      footer={null}
    >
      <h1 className="text-description mb-[16px]">Send to hub</h1>
      <Form
        form={form}
        initialValues={{
          parcel_id: order?.parcel?.id || "",
          box_id: order?.box?.id || "",
        }}
        onFinish={onFinish}
      >
        <div className="flex justify-between">
          <Form.Item
            style={{ width: "48%" }}
            name="parcel_id"
            rules={[
              {
                required: true,
                message: "Please select a parcel!",
              },
            ]}
          >
            <Select
              placeholder={"Select parcel"}
              options={filterList}
              onSelect={(_, val: ParcelType) => {
                const boxes = val?.boxes?.map((box: Box, i: number) => ({
                  key: i,
                  value: box?.id,
                  label: box?.id,
                }));
                setBoxes(boxes);
                form.setFieldValue("box_id", "");
              }}
              showSearch
              optionFilterProp="children"
              onSearch={onFilter}
            />
          </Form.Item>
          <Form.Item
            style={{ width: "48%" }}
            name="box_id"
            rules={[
              {
                required: true,
                message: "Please select a box!",
              },
            ]}
          >
            <Select placeholder={"Box ID"} options={boxes} />
          </Form.Item>
        </div>
        <div className="flex gap-[16px]">
          <Button
            className="w-full bg-red-50 text-red-500 border-red-50 hover:!bg-red-50 hover:!text-red-500 hover:!border-red-50"
            onClick={() => setSendToHubStatus(false)}
          >
            Cancel
          </Button>
          <Button className="w-full" type="primary" htmlType="submit">
            Send to Hub
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
