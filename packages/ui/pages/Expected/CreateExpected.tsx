import { AutoComplete, Drawer, Form, Input, Select, Space } from "antd";
import useCategories from "@repo/ui/hooks/categories/useCategories.hook";
import { useState } from "react";
import useGetRecipients from "@repo/ui/hooks/recipients/useGetRecipients.hook";
import useGetCurrencies from "@repo/ui/hooks/currencies/useGetCurrencies.hooks";
import { useCreateExpected } from "@repo/ui//hooks/expected/useCreateExpected.hook";
import useGetWarehouses from "@repo/ui/hooks/warehouses/useWarehouses.hook";
import { notificationError } from "@repo/ui/helpers/notification";
import BackArrowIcon from "../../assets/icons/BackArrowIcon";
import { AttachInvoice } from "@repo/ui/components/elements/AttachInvoice";
import { orderTypes } from "@repo/ui/constants/order-status-texts";
import Primary from "../../components/buttons/Primary";

interface CreateProps {
  createStatus: boolean | string | number;
  setCreateStatus: (val: boolean | string) => void;
  refetch: () => void;
}

type User = {
  user_id: number;
  id: number;
};
export default function CreateExpectedDrawer({
  createStatus,
  setCreateStatus,
  refetch,
}: CreateProps) {
  const [form] = Form.useForm();

  const { data: warehouses = [] } = useGetWarehouses();
  const { categories } = useCategories();
  const [userInfo, setUserInfo] = useState<null | Record<
    string,
    string | number
  >>(null);
  const { recipients: usersList = [] } = useGetRecipients(userInfo);
  const { currencies = [] } = useGetCurrencies();
  const [dispatches, setDispatches] = useState([]);
  const [orderType, setOrderType] = useState("online_shopping");
  const [user, setUser] = useState({
    user_id: "",
    id: "",
  });
  const handleCancel = (ref: boolean) => {
    setCreateStatus(false);
    form.resetFields();
    if (ref) refetch();
  };

  const { mutate } = useCreateExpected(
    () => handleCancel(true),
    (e) => {
      if (e && e.response?.data?.data) {
        Object.entries(e.response?.data?.data).map((err) => {
          notificationError(`Error!`, err[1][0]);
        });
      } else {
        notificationError(`Error!`, "Something wen wrong");
      }
    }
  );

  const finishForm = ({ customer, ...values }: Record<string, string>) => {
    if (customer)
      mutate({ user_id: user?.user_id, recipient_id: user?.id, ...values });
  };

  return (
    <Drawer
      title=""
      placement="right"
      onClose={() => handleCancel(false)}
      open={!!createStatus}
      styles={{ header: { display: "none" }, footer: { borderTop: "none" } }}
      width="730px"
      footer={
        <BackArrowIcon
          className="mb-[16px] cursor-pointer"
          onClick={() => setCreateStatus(false)}
        />
      }
    >
      <Form
        name="createExpected"
        layout="vertical"
        onFinish={finishForm}
        form={form}
      >
        <div className="flex justify-between mb-[16px]">
          <h1 className="text-title">Create expected order</h1>

          <div className="flex gap-[16px]">
            <Primary
              color="danger"
              variant="solid"
              onClick={() => handleCancel(false)}
            >
              Cancel
            </Primary>
            <Primary htmlType="submit" color="primary" variant="solid">
              Create
            </Primary>
          </div>
        </div>
        <Form.Item
          name={"customer"}
          rules={[{ required: true, message: "Required" }]}
          label="Full name or User code"
          className="font-[600]"
        >
          <AutoComplete
            placeholder="Full name or User code"
            onSearch={(val) => setUserInfo({ user_info: val })}
            onSelect={(_, val: User) => {
              const selectedUser = {
                ...val,
                user_id: String(val.user_id),
                id: String(val.id),
              };
              setUser(selectedUser);
            }}
            options={usersList}
          />
        </Form.Item>
        <div className="flex flex-col">
          <div className="flex justify-between  gap-[16px]">
            <Form.Item
              name={"warehouse_id"}
              label={"Warehouse"}
              className="w-[100%] font-[600]"
              rules={[{ required: true, message: "Required" }]}
            >
              <Select
                placeholder={"Warehouse"}
                onSelect={(_, val) => {
                  form.setFieldValue("dispatch_id", val?.dispatches[0]?.id);
                  form.setFields([{ name: "dispatch_id", errors: [] }]);
                  setDispatches(
                    val?.dispatches?.map(
                      (dis: { id: number; icon: string; name: string }) => ({
                        value: dis?.id,
                        label: (
                          <div className="flex items-center">
                            <img src={dis?.icon} alt={dis?.name} width={24} />
                            {dis?.name}
                          </div>
                        ),
                      })
                    )
                  );
                }}
                className="w-[160px]"
                options={warehouses}
              />
            </Form.Item>
            <Form.Item
              className="w-[100%] font-[600]"
              name={"dispatch_id"}
              label={"Dispatch"}
              rules={[{ required: true, message: "Required" }]}
            >
              <Select
                className="w-[100px]"
                placeholder={"Dispatch"}
                disabled={!dispatches.length}
                options={dispatches || []}
              />
            </Form.Item>

            <Form.Item
              className="w-[100%] font-[600]"
              name="tracking_code"
              label="Tracking"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input placeholder={"Tracking number"} />
            </Form.Item>
          </div>
          <div className="w-[100%] flex justify-between">
            <Space.Compact style={{ alignItems: "flex-end", width: "100%" }}>
              <Form.Item
                name={"price"}
                label={"Declared price"}
                rules={[{ required: true, message: "Required" }]}
                className="font-[600]"
              >
                <Input type="number" placeholder={"Price"} />
              </Form.Item>
              <Form.Item
                name={"currency"}
                rules={[{ required: true, message: "Required" }]}
                className="font-[600]"
              >
                <Select placeholder="Cur" options={currencies || []} />
              </Form.Item>
            </Space.Compact>
            <Form.Item
              className="w-[100%] font-[600]"
              name={"invoice"}
              label={"Invoice"}
            >
              <AttachInvoice />
            </Form.Item>
          </div>
        </div>
        <div className="flex gap-[16px]">
          <Form.Item
            name={"order_type"}
            label={"Product type"}
            rules={[{ required: true, message: "Required" }]}
            className="w-[100%] font-[600]"
          >
            <Select
              placeholder="Product type"
              onChange={(val) => {
                setOrderType(val);
                form.setFieldValue("shop_name", "");
              }}
              options={orderTypes}
            />
          </Form.Item>
          <Form.Item
            name={"category_id"}
            label={"Category"}
            rules={[{ required: true, message: "Required" }]}
            className="w-[100%] font-[600]"
          >
            <Select placeholder="Category" options={categories || []} />
          </Form.Item>
          <Form.Item
            name={"shop_name"}
            label={
              orderType === "online_shopping" ? "Shop name" : "Sender name"
            }
            rules={[
              {
                required: true,
                message: "Required",
              },

              {
                pattern:
                  orderType === "online_shopping"
                    ? /^(?:https?:\/\/)?(?:www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\\+.~#?&\\/=]*)$/
                    : undefined,
                message: "Enter a valid URL",
              },
            ]}
            className="w-[100%] font-[600]"
          >
            <Input
              placeholder={
                orderType === "online_shopping" ? "Shop name" : "Sender name"
              }
            />
          </Form.Item>
        </div>

        <Form.Item
          name={"note"}
          label={"Product name"}
          rules={[{ required: true, message: "Required" }]}
          className="font-[600]"
        >
          <Input className="w-[100%]" placeholder={"Product name"} />
        </Form.Item>
      </Form>
    </Drawer>
  );
}
