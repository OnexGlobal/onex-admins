import { Button, Form, Modal, Select } from "antd";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import useGetParcel from "@repo/ui/hooks/parcel/useGetParcel.hook";
import { notificationSuccess } from "@repo/ui/helpers/notification";
import { useSendToHub } from "@repo/ui/hooks/orders/useSendToHub.hook";
import InfoIcon from "@repo/ui/assets/icons/InfoIcon";
import CloseIcon from "@repo/ui/assets/icons/CloseIcon";
import { OrderData } from "@repo/types/src/orders";
import { ParcelType } from "@repo/types/src/parcel-type";

interface Props {
  sendToHub: OrderData | false;
  setSendToHub: Dispatch<SetStateAction<OrderData | false>>;
}

export const SendToHubFailedOrderModal: FC<Props> = ({
  sendToHub,
  setSendToHub,
}) => {
  const [form] = Form.useForm();
  const [boxes, setBoxes] = useState<object[]>([]);
  const { parcelList = [] } = useGetParcel({
    per_page: 10000,
    warehouse_id: sendToHub ? sendToHub?.warehouse?.id : null,
  });
  const [filterList, setFilterList] = useState([]);
  const { mutate } = useSendToHub(() => {
    setSendToHub(false);
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
    if (sendToHub) mutate({ orders: [sendToHub?.id], ...values });
  };
  const onFilter = (val: string) => {
    const filterData = parcelList?.filter((parcel: ParcelType) =>
      parcel?.label.toLowerCase().includes(val.toLowerCase())
    );
    setFilterList(filterData);
  };
  if (!sendToHub) return <></>;
  return (
    <Modal
      open={!!sendToHub}
      title={<InfoIcon />}
      footer={false}
      onCancel={() => setSendToHub(false)}
      closeIcon={<CloseIcon />}
    >
      <h1 className="text-description mb-[16px]">Send to hub</h1>
      <Form
        form={form}
        style={{
          maxWidth: 600,
        }}
        initialValues={{
          parcel_id: sendToHub?.parcel?.id || "",
          box_id: sendToHub?.box?.id || "",
        }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <div className="flex justify-between">
          <Form.Item
            className="w-[48%]"
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
                const boxes = val?.boxes?.map((box, i) => ({
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
              filterOption={true}
            />
          </Form.Item>
          <Form.Item
            className="w-[48%]"
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
        <div className="flex justify-between mt-[16px]">
          <Button
            type={"default"}
            className="w-[48%] bg-red-50 text-red-500 border-red-50 hover:!bg-red-50 hover:!text-red-500 hover:!border-red-50"
            onClick={() => setSendToHub(false)}
          >
            Cancel
          </Button>
          <Button type="primary" className="w-[48%]" htmlType={"submit"}>
            Send to Hub
          </Button>
        </div>
      </Form>
    </Modal>
  );
};
