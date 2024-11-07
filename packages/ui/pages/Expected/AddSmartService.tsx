import { Button, Form, Input, Select } from "antd";
import useSmartServices from "@repo/ui/hooks/smart-services/useSmartServices.hook";
import { useState } from "react";
import { useAddExpected } from "@repo/ui/hooks/expected/useAddExpected.hook";
import {
  notificationError,
  notificationSuccess,
} from "@repo/ui/helpers/notification";
import PrimeIcon from "@repo/ui/assets/icons/PrimeIcon";
import { ExpectedOrdersType } from "@repo/types/src/expected-orders-type";

interface SmartProps {
  id: number | string | null;
  setAddService: (val: boolean) => void;
  expectedByID: ExpectedOrdersType;
}

export default function AddSmartService({
  id,
  setAddService,
  expectedByID,
}: SmartProps) {
  const { smartServices = [] } = useSmartServices();
  const [price, setPrice] = useState("");

  const { mutate } = useAddExpected(
    () => {
      notificationSuccess("Smart service", "service successfully added");
      setAddService(false);
    },
    () => notificationError("Smart service", "something went wrong")
  );

  const onFinish = ({ serviceId }: { serviceId: string }) => {
    mutate({ id, serviceId });
  };

  return (
    <Form layout={"vertical"} onFinish={onFinish}>
      <div className="flex justify-between mb-[16px]">
        <h1 className="text-title">Add smart service</h1>
        <div className="flex gap-[16px]">
          <Button
            className="bg-red-50 text-red-500 border-red-50 hover:!bg-red-50 hover:!text-red-500 hover:!border-red-50"
            onClick={() => setAddService(false)}
          >
            Cancel
          </Button>

          <Button htmlType="submit" type="primary">
            Create
          </Button>
        </div>
      </div>
      <div className="border-l-[1px] border-oxford-blue-50 pl-[10px] h-max">
        <h1 className="text-info font-[500] text-oxford-blue-400 pb-[4px]">{`The receiver in ${expectedByID?.recipient?.address}`}</h1>
        <div className="flex items-center">
          <h1 className="text-info font-[500]">{`${expectedByID?.recipient?.first_name} ${expectedByID?.recipient?.last_name} ${expectedByID?.recipient?.user_code}`}</h1>
          {expectedByID?.user?.is_prime && <PrimeIcon margin={"0 0 0 5px"} />}
        </div>
      </div>
      <div className="border-l-[1px] border-oxford-blue-50 pl-[10px] h-max mt-[16px] mb-[16px]">
        <h1 className="text-info font-[500] text-oxford-blue-400 pb-[4px]">
          Tracking code
        </h1>
        <h1 className="text-info font-[500] pr-[4px]">
          {expectedByID?.tracking_code}
        </h1>
      </div>

      <div className="flex gap-[16px]">
        <Form.Item
          label={"Add smart service"}
          name={"serviceId"}
          className="font-[600]"
          rules={[
            {
              required: true,
              message: "Please select a smart service!",
            },
          ]}
        >
          <Select
            style={{ width: 420 }}
            onSelect={(_, val) => setPrice(val.cost)}
            options={smartServices}
            placeholder={"Select smart service"}
          />
        </Form.Item>
        <Form.Item label={"Cost"} className="font-[600]">
          <Input
            value={price}
            suffix="֏"
            style={{ width: 216 }}
            readOnly
            disabled
          />
        </Form.Item>
      </div>
    </Form>
  );
}
