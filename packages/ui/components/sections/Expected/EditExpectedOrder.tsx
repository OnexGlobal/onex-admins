import { ExpectedOrdersType } from "@repo/types/src/expected-orders-type";
import { FC, useState } from "react";
import { AutoComplete, Button, Form, Input, Select, Space } from "antd";
import useGetWarehouses from "@repo/ui/hooks/warehouses/useWarehouses.hook";
import { CloseCircleIcon } from "@repo/ui/assets/icons/CloseCircleIcon";
import useGetCurrencies from "@repo/ui/hooks/currencies/useGetCurrencies.hooks";
import { AttachInvoice } from "@repo/ui/components/elements/AttachInvoice";
import useCategories from "@repo/ui/hooks/categories/useCategories.hook";
import useGetRecipients from "@repo/ui/hooks/recipients/useGetRecipients.hook";
import { useEditExpected } from "@repo/ui/hooks/expected/useEditExpected.hook";
import {
  notificationError,
  notificationSuccess,
} from "@repo/ui/helpers/notification";
import { WarehouseType } from "@repo/types/src/warehouse-type";
import { orderTypes } from "@repo/ui/constants/order-status-texts";
import { Refetch } from "@repo/types";

interface Props {
  expectedByID: ExpectedOrdersType;
  setEditable: (val: boolean) => void;
  setStatus: (val: boolean | string) => void;
  refetch: Refetch;
}

export const EditExpectedOrder: FC<Props> = ({
  expectedByID,
  setEditable,
  setStatus,
  refetch,
}) => {
  const [form] = Form.useForm();
  const { data: warehouse = [] } = useGetWarehouses();
  const { currencies = [] } = useGetCurrencies();
  const { categories } = useCategories();
  const [userInfo, setUserInfo] = useState<null | { user_info: string }>(null);
  const [recipientId, setRecipientId] = useState<string>(
    String(expectedByID?.recipient?.id) || ""
  );
  const [userId, setUserId] = useState<string>(
    String(expectedByID?.user?.id) || ""
  );
  const [dispatches, setDispatches] = useState<[]>(
    warehouse
      ?.find(
        (w: WarehouseType) => w.id === expectedByID?.dispatch?.warehouse?.id
      )
      ?.dispatches?.map((dis: { id: number; icon: string; name: string }) => ({
        value: dis?.id,
        label: (
          <div className="flex items-center">
            <img src={dis?.icon} alt="" width={24} />
            {dis?.name}
          </div>
        ),
      })) || []
  );
  const { recipients = [] } = useGetRecipients(userInfo);
  const { mutate } = useEditExpected(
    () => {
      refetch();
      notificationSuccess("Edit Expected", "Expected successfully Edited");
      setEditable(false);
    },
    () => {
      notificationError("Edit Expected", "something went wrong");
    }
  );

  const onFinish = (values: object) => {
    mutate({
      id: String(expectedByID.id),
      ...values,
      user_id: userId,
      recipient_id: recipientId,
      _method: "PUT",
    });
  };
  return (
    <Form
      className="flex flex-col gap-[16px]"
      layout={"vertical"}
      onFinish={onFinish}
      form={form}
      initialValues={{
        warehouse_id: expectedByID?.dispatch?.warehouse?.id || "",
        dispatch_id: expectedByID?.dispatch?.id || "",
        tracking_code: expectedByID?.tracking_code || "",
        price: expectedByID?.declaration_price || "",
        currency: expectedByID?.declaration_currency || "",
        category_id: expectedByID?.category?.id || "",
        recipient_id: expectedByID?.user?.full_name || "",
        order_type: expectedByID?.order_type || "",
        invoice: expectedByID?.invoice,
      }}
    >
      <div className="flex flex-row-reverse justify-between">
        <div className="flex gap-[16px]">
          <Button
            icon={<CloseCircleIcon />}
            onClick={() => setStatus("delete")}
            className="hover:!border-red-500 hover:!text-red-500"
          >
            Deactivate
          </Button>
          <Button
            className="bg-red-50 text-red-500 border-red-50 hover:!bg-red-50 hover:!text-red-500 hover:!border-red-50"
            onClick={() => setEditable(false)}
            htmlType="reset"
          >
            Cancel
          </Button>
          <Button htmlType="submit" type="primary">
            Save
          </Button>
        </div>
        <div className="flex rounded-[12px] bg-white pt-[16px] pl-[16px] pr-[16px] gap-[16px] h-max">
          <Form.Item
            label={"Warehouse"}
            name={"warehouse_id"}
            className="w-[180px] font-[500]"
          >
            <Select
              options={warehouse || []}
              onSelect={(_, val) => {
                form.setFieldValue("dispatch_id", val?.dispatches[0]?.id);
                setDispatches(
                  val?.dispatches?.map(
                    (dis: { id: number; icon: string; name: string }) => ({
                      value: dis?.id,
                      label: (
                        <div className="flex items-center">
                          <img src={dis?.icon} alt="" width={24} />
                          {dis?.name}
                        </div>
                      ),
                    })
                  )
                );
              }}
            />
          </Form.Item>
          <Form.Item
            name={"dispatch_id"}
            label={"Dispatch"}
            rules={[{ required: true, message: "Required" }]}
            className="font-[500] w-[150px]"
          >
            <Select
              placeholder={"Dispatch"}
              disabled={!dispatches.length}
              options={dispatches || []}
            />
          </Form.Item>
          <Form.Item
            name="tracking_code"
            label={"Tracking"}
            className="w-[280px] font-[500]"
          >
            <Input />
          </Form.Item>
        </div>
      </div>
      <div className="flex rounded-[12px] bg-white pt-[16px] pl-[16px] pr-[16px] gap-[16px] h-max">
        <Space.Compact style={{ alignItems: "flex-end" }}>
          <Form.Item
            name={"price"}
            label={"Declarated price"}
            className="font-[500]"
          >
            <Input placeholder={"Price"} type={"number"} />
          </Form.Item>
          <Form.Item name={"currency"} className="w-[80px] font-[500]">
            <Select options={currencies} placeholder={"Currency"} />
          </Form.Item>
        </Space.Compact>
        <Form.Item
          name={"invoice"}
          label={"Invoice"}
          className="min-w-[130px] font-[500]"
        >
          <AttachInvoice />
        </Form.Item>
        <Form.Item
          name={"order_type"}
          label={"Product type"}
          rules={[{ required: true, message: "Required" }]}
          className="font-[500] w-[250px]"
        >
          <Select placeholder="Product type" options={orderTypes} />
        </Form.Item>
        <Form.Item
          name={"category_id"}
          label={"Category"}
          className="w-[250px] font-[500]"
        >
          <Select options={categories} placeholder={"Category"} />
        </Form.Item>
      </div>
      <div className="rounded-[12px] bg-white pt-[16px] pl-[16px] pr-[16px] mb-[16px] h-max">
        <Form.Item
          label={"Recipient"}
          name={"recipient_id"}
          className="font-[500]"
        >
          <AutoComplete
            placeholder="Full name or User Code"
            onSearch={(val) => setUserInfo({ user_info: val })}
            options={recipients}
            onSelect={(_, info) => {
              setRecipientId(String(info.id));
              setUserId(String(info.user_id));
            }}
            className="w-[250px]"
          />
        </Form.Item>
      </div>
    </Form>
  );
};
