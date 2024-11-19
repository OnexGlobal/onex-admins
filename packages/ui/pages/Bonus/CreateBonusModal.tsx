import { Refetch } from "@repo/types";
import {
  AutoComplete,
  Button,
  DatePicker,
  Drawer,
  Form,
  Input,
  Select,
} from "antd";
import { Dispatch, SetStateAction, useState } from "react";
import useGetRecipients from "../../hooks/recipients/useGetRecipients.hook";
import { useGetBonusTypeLis } from "../../hooks/bonus/useGetBonusTypeList.hook";
import { useCreateBonus } from "../../hooks/reports/useCreateBonus.hook";
import {
  notificationError,
  notificationSuccess,
} from "../../helpers/notification";
import dayjs from "dayjs";
import BackArrowIcon from "../../assets/icons/BackArrowIcon";

interface Props {
  status: boolean;
  setStatus: Dispatch<SetStateAction<boolean>>;
  reFetch: Refetch;
}

export default function CreateBonusModal({
  status,
  setStatus,
  reFetch,
}: Props) {
  const [form] = Form.useForm();
  const [userInfo, setUserInfo] = useState<{ user_info: string } | null>(null);
  const [selectId, setSelectId] = useState<null | number>(null);
  const { recipients } = useGetRecipients(userInfo);
  const { bonusTypeList = [] } = useGetBonusTypeLis();
  const { mutate } = useCreateBonus(
    () => {
      notificationSuccess("Create bonus", "Bonus successfully created");
      reFetch();
      setStatus(false);
      form.resetFields();
    },
    () => {
      notificationError("Create bonus", "something went wrong");
    }
  );
  const d = new Date();
  const year = d.getFullYear();
  const month = d.getMonth();
  const day = d.getDate();
  const c = new Date(year + 1, month, day);

  const onFinish = ({ user_id, date, ...value }: Record<string, string>) => {
    if (!user_id) return;
    const expire_date = date
      ? dayjs(date).format("YYYY-MM-DD")
      : dayjs(c).format("YYYY-MM-DD");

    mutate({
      user_id: String(selectId),
      type: "in",
      expire_date: expire_date,
      ...value,
    });
  };

  return (
    <Drawer
      onClose={() => setStatus(false)}
      open={status}
      width={800}
      footer={<BackArrowIcon onClick={() => setStatus(false)} />}
      styles={{
        header: {
          display: "none",
        },
        body: { background: "#f9fafb" },
        footer: { borderTop: "none" },
      }}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ date: dayjs(c) }}
      >
        <div className="flex gap-[16px] mb-[24px] w-full">
          <div className="flex-1 text-[22px] text-black font-[500]">
            Create bonus
          </div>
          <div className="flex items-center gap-[16px]">
            <Button
              className="bg-red-50 text-red-500 border-red-50 hover:!bg-red-50 hover:!text-red-500 hover:!border-red-50"
              htmlType="reset"
              onClick={() => setStatus(false)}
            >
              Cancel
            </Button>

            <Button htmlType="submit" type="primary">
              Save
            </Button>
          </div>
        </div>
        <div
          className={
            "rounded-[12px] bg-white p-[16px] grid grid-cols-2 gap-x-[16px]"
          }
        >
          <Form.Item
            name="user_id"
            rules={[{ required: true }]}
            className="font-[500]"
            label={"Full name or User code"}
          >
            <AutoComplete
              placeholder="Full name or User code"
              onSearch={(val) => setUserInfo({ user_info: val })}
              onSelect={(_, el) => {
                setSelectId(el?.user_id);
              }}
              options={recipients}
            />
          </Form.Item>
          <Form.Item
            className="font-[500]"
            name="bonus_type_id"
            rules={[{ required: true }]}
            label={"Bonus type"}
          >
            <Select options={bonusTypeList} placeholder={"Bonus type"} />
          </Form.Item>
          <Form.Item
            className="font-[500]"
            name="sum"
            rules={[{ required: true }]}
            label={"Bonus amount"}
          >
            <Input type={"number"} placeholder={"Bonus amount"} />
          </Form.Item>
          <Form.Item
            className="font-[500]"
            name="date"
            rules={[{ required: true }]}
            label={"Expire date"}
          >
            <DatePicker
              placeholder={"Expire date"}
              style={{ width: "100%" }}
              disabledDate={(d) => !d || d.isBefore(Date.now())}
            />
          </Form.Item>
        </div>
      </Form>
    </Drawer>
  );
}
