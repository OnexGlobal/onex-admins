import { AutoComplete, Button, Drawer, Form } from "antd";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { testUsersAutocomplete } from "../../hooks/testusers/useTestUsersAutocomplete.hook";
import { makeUserTest } from "../../hooks/testusers/makeUserTest";
import {
  notificationError,
  notificationSuccess,
} from "../../components/alerts/notification";
import { UserType } from "@repo/types/src/users";
import {
  mail_icon,
  order_icon,
  phone_icon,
  recipients_icon,
  user_icon,
  year_icon,
} from "../../assets/images/prime";
import { Refetch } from "@repo/types";

interface Props {
  setAddTest: Dispatch<SetStateAction<boolean>>;
  setUserInfo: Dispatch<SetStateAction<null | Record<string, string | number>>>;
  userInfo: Record<string, string | number> | null;
  refetch: Refetch;
  addTest: boolean;
}

export const AddTestUsersModal: FC<Props> = ({
  refetch,
  addTest,
  setAddTest,
  userInfo,
  setUserInfo,
}) => {
  const [form] = Form.useForm();
  const [user, setUser] = useState<UserType | null>(null);
  const { usersList = [] } = testUsersAutocomplete({ is_test: 0 });
  const { mutate } = makeUserTest({
    onSuccess: () => {
      notificationSuccess("Make Test", "Test successfully created");
      setAddTest(false);
      form.resetFields();
      setUserInfo(null);
      refetch();
    },
    onError: () => {
      notificationError("Make Test", "something went wrong");
    },
  });
  const onFinish = () => {
    if (user?.id) mutate(user?.id);
  };

  const closeModal = () => {
    setAddTest(false);
    setUserInfo(null);
    form.resetFields();
    setUser(null);
  };

  return (
    <Drawer
      title=""
      placement="right"
      onClose={() => {
        closeModal();
        setUser(null);
      }}
      open={addTest}
      width={600}
      styles={{
        header: { display: "none" },
      }}
    >
      <>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <div className="flex items-center justify-between">
            <span className="text-black text-[22px] font-[500]">
              Add Test User
            </span>

            <div className="flex items-center">
              <Button
                type="default"
                danger
                htmlType="reset"
                style={{ margin: "0 16px" }}
                onClick={() => closeModal()}
              >
                Cancel
              </Button>
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            </div>
          </div>
          <div className="p-[16px] mx-[24px] bg-white rounded-[12px]">
            <Form.Item name="user_info" label={"Full name or User code"}>
              <AutoComplete
                style={{ width: "520px" }}
                placeholder="Full name or User code"
                value={userInfo}
                onSearch={(val) => {
                  setUserInfo({ user_info: val, is_test: 0 });
                }}
                onSelect={(_, user) => {
                  setUser(usersList.find((el) => el.id === user.id) || null);
                }}
                options={usersList || []}
              />
            </Form.Item>
          </div>
        </Form>
        {user ? (
          <div className="flex flex-col p-[16px] bg-white mx-[24px] rounded-[12px]">
            <div className="flex items-center justify-between gap-[8px]">
              <img alt={"user"} src={user_icon} />
              <span className="text-black font-[500] text-[14px]">
                {user?.full_name + " " + user?.recipient?.user_code}
              </span>
            </div>
            <div className="flex items-center justify-between gap-[8px]">
              <img alt={"user"} src={year_icon} />
              <span className="font-[500] text-[14px] text-oxford-blue-300">
                {user?.full_name + " " + user?.recipient?.user_code}
              </span>
              <img alt={"user"} src={order_icon} />
              <span className="font-[500] text-[14px] text-oxford-blue-300">
                {user?.full_name + " " + user?.recipient?.user_code}
              </span>
              {user?.orders_count_by_country?.map((el, index) => (
                <div className="flex items-center ml-[16px]" key={index}>
                  <img
                    alt={`country${index}`}
                    width={24}
                    height={24}
                    src={`${import.meta.env.VITE_APP_BASE_URL_DEV}/storage/images/warehouses/${el?.round_flag}`}
                  />
                  <span className="ml-[8px] text-oxford-blue-300 font-[400] ">
                    {el?.total}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center mt-[18px] gap-[8px]">
              <img alt={"recipients"} src={recipients_icon} />
              <span className="font-[400] text-oxford-blue-300 text-[14px]">
                {(user?.recipients?.length === 1
                  ? user?.recipients?.length + " " + "recipient"
                  : user?.recipients?.length + " " + "recipients") || 0}
              </span>
            </div>
            <div className="flex items-center justify-center mt-[18px] gap-[8px]">
              <img alt={"recipients"} src={phone_icon} />
              <span className="font-[400] text-oxford-blue-300 text-[14px]">
                {user?.phone}
              </span>
            </div>
            <div className="flex items-center justify-center mt-[18px] gap-[8px]">
              <img alt={"recipients"} src={mail_icon} />
              <span className="font-[400] text-oxford-blue-300 text-[14px]">
                {user?.email}
              </span>
            </div>
          </div>
        ) : null}
      </>
    </Drawer>
  );
};
