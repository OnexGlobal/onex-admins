import { Button, Checkbox, DatePicker, Form, Image, Input, Select } from "antd";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import dayjs from "dayjs";
import { consignmentApi } from "../../services/consignment";
import { Consignment } from "../../../types/src/consignment";
import { useMutation } from "@tanstack/react-query";
import {
  notificationError,
  notificationSuccess,
} from "../../helpers/notification";
import { Loader } from "../../components/loader/Loader";

const { RangePicker } = DatePicker;
// const StyledEdit = styled.div`
//   header {
//     margin-bottom: 17px;
//   }

//   .bg-white rounded-[12px] p-[16px] mb-[16px] flex-1 w-full  {
//     background: #ffffff;
//     border-radius: 12px;
//     padding: 16px;
//     margin-bottom: 16px;
//     width: 100%;
//   }
// `;
interface Props {
  setEditable: Dispatch<SetStateAction<boolean>>;
  consignment: Consignment;
  reFetchConsignment: () => void;
}
const EditConsignment: FC<Props> = ({
  setEditable,
  consignment,
  reFetchConsignment = () => {},
}) => {
  const [isLoad, setIsLoad] = useState(true);
  const [form] = Form.useForm();
  const { mutate } = useMutation({
    mutationKey: ["edit-consignment"],
    mutationFn: consignmentApi.editConsignment,
    onSuccess: () => {
      setEditable(false);
      reFetchConsignment();
      notificationSuccess("Edit orders", "Editing done successfully");
    },
    onError: (e) => {
      notificationError("Editing orders", "something went wrong");
    },
  });

  useEffect(() => {
    if (consignment) {
      setIsLoad(false);
      form.setFieldsValue({
        warehouse_id: consignment?.warehouse_id,
        air_waybill: consignment?.air_waybill || null,
        comment: consignment?.comment || null,
        dispatch_id: consignment?.dispatch ? consignment?.dispatch?.id : null,
        estimation_data:
          consignment?.dispatch?.type === "air"
            ? dayjs(consignment?.estimated_date_to || new Date())
            : [
                consignment?.estimated_date_from
                  ? dayjs(consignment?.estimated_date_from)
                  : null,
                consignment?.estimated_date_to
                  ? dayjs(consignment?.estimated_date_to)
                  : null,
              ],
        freight_forwarder: consignment?.freight_forwarder || null,
        name: consignment?.name || null,
        notify_by_app: false,
        notify_by_email: false,
        total_v_weight: consignment?.total_v_weight || null,
        total_weight: consignment?.total_weight || null,
      });
    }
  }, [consignment]);
  const onFinish = (values: Record<string, any>) => {
    let newValues = {
      parcel_data: {
        warehouse_id: consignment?.warehouse_id,
        dispatch_id: values.dispatch_id,
        name: values.name,
        air_waybill: values?.air_waybill,
        freight_forwarder: values?.freight_forwarder,
        comment: values?.comment,
        total_weight: values?.total_weight,
        total_v_weight: values?.total_v_weight,
      },
      estimation_data:
        typeof values?.estimation_data === "object"
          ? {
              estimated_date_to: dayjs(values.estimation_data).format(
                "YYYY-MM-DD"
              ),
            }
          : {
              estimated_date_to: dayjs(values.estimation_data[1]).format(
                "YYYY-MM-DD"
              ),
              estimated_date_from: dayjs(values.estimation_data[0]).format(
                "YYYY-MM-DD"
              ),
            },
      notification_instructions: {
        notify_by_app: values?.notify_by_app,
        notify_by_email: values?.notify_by_email,
      },
      id: consignment?.id,
    };

    mutate(newValues);
  };
  return !isLoad ? (
    <Form onFinish={onFinish} form={form} layout="vertical">
      <div>
        <header>
          <div className="flex items-center justify-between">
            <div className="flex">
              <p className="text-black pr-[8px] pl-[13px] text-[22px] font-[500]">
                Consignment
              </p>
              <p className="text-oxford-blue-400 pr-[8px] pl-[13px] text-[22px] font-[500]">
                {consignment?.id}
              </p>
            </div>
            <div className="flex">
              <Form.Item name={"notify_by_email"} valuePropName="checked">
                <Checkbox>Mail</Checkbox>
              </Form.Item>
              <Form.Item name={"notify_by_app"} valuePropName="checked">
                <Checkbox>Notifications</Checkbox>
              </Form.Item>
              <div className="flex gap-[16px]">
                <Button
                  htmlType="reset"
                  type="default"
                  onClick={() => setEditable(false)}
                >
                  Cancel
                </Button>
                <Button htmlType="submit" type="primary">
                  Save
                </Button>
              </div>
            </div>
          </div>
        </header>
        <div className="bg-white rounded-[12px] p-[16px] mb-[16px] flex-1 w-full ">
          <div className="flex justify-between">
            <Form.Item
              label="Dispatch"
              name={"dispatch_id"}
              rules={[{ required: true, message: "Please select dispatch id" }]}
            >
              <Select style={{ width: "100px" }}>
                {consignment?.warehouse?.dispatches?.map((dispatch, i) => (
                  <Select.Option value={dispatch?.id} key={i}>
                    <div className="flex items-center">
                      <Image src={dispatch?.icon} width={24} />
                      {dispatch?.name}
                    </div>
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              name={"name"}
              label="Consignment name"
              rules={[{ required: true, message: "Field is required" }]}
            >
              <Input style={{ width: 222 }} />
            </Form.Item>

            <Form.Item
              name={"estimation_data"}
              label="New Date"
              rules={[{ required: true, message: "Please select date" }]}
            >
              {consignment?.dispatch?.type === "air" ? (
                <DatePicker format="DD.MM.YYYY" inputReadOnly={true} />
              ) : (
                <RangePicker
                  defaultValue={[
                    dayjs(consignment?.estimated_date_from),
                    dayjs(consignment?.estimated_date_to),
                  ]}
                  format={"DD.MM.YYYY"}
                />
              )}
            </Form.Item>

            <Form.Item label="Air way bill" name={"air_waybill"}>
              <Input style={{ width: 222 }} />
            </Form.Item>
          </div>
        </div>

        <div className="flex gap-[16px] w-full [&>div]:flex-1">
          <div className="flex justify-between gap-[16px] bg-white rounded-[12px] p-[16px] mb-[16px] [&>div]:flex-1">
            <Form.Item name={"freight_forwarder"} label="Freight Forwarder">
              <Input style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item name={"comment"} label="Comment">
              <Input style={{ width: "100%" }} />
            </Form.Item>
          </div>
          <div className="flex justify-between gap-[16px] bg-white rounded-[12px] p-[16px] mb-[16px] [&>div]:flex-1">
            <Form.Item label="Weight" name={"total_weight"}>
              <Input suffix={"kg"} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item name={"total_v_weight"} label="V Weight">
              <Input suffix={"kg"} style={{ width: "100%" }} />
            </Form.Item>
          </div>
        </div>
      </div>
    </Form>
  ) : (
    <Loader />
  );
};
export default EditConsignment;
