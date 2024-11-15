import { AutoComplete, Button, Drawer, Form } from "antd";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { testUsersAutocomplete } from "../../hooks/testusers/useTestUsersAutocomplete.hook";
import { makeUserTest } from "../../hooks/testusers/makeUserTest";
import {
  notificationError,
  notificationSuccess,
} from "../../components/alerts/notification";
import { UserType } from "@repo/types/src/users";
import { Refetch } from "@repo/types";
import UserIcon from "../../assets/icons/UserIcon";
import CalendarIcon from "../../assets/icons/CalendarIcon";
import { analyzeDay } from "../../helpers/analyzeDayOfYear";
import OrdersCountIcon from "../../assets/icons/OrdersCountIcon";
import { CustomersIcon } from "../../assets/icons/CustomersIcon";
import PhoneIcon from "../../assets/icons/PhoneIcon";
import EmailIcon from "../../assets/icons/EmailIcon";

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
  const { usersList = [] } = testUsersAutocomplete({
    is_test: 0,
    per_page: 1000,
  });
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
        body: { background: "#f9fafb" },
      }}
    >
      <>
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <div className="flex items-center justify-between">
            <span className="text-title">Add Test User</span>

            <div className="flex items-center gap-x-[16px]">
              <Button
                className="bg-red-50 text-red-500 border-red-50 hover:!bg-red-50 hover:!text-red-500 hover:!border-red-50"
                onClick={closeModal}
              >
                Cancel
              </Button>
              <Button
                type="primary"
                className="disabled:!bg-oxford-blue-100 disabled:!text-white"
                htmlType="submit"
                disabled={user === null}
              >
                Make test
              </Button>
            </div>
          </div>
          <div className="p-[16px] mt-[24px] mb-[16px] bg-white rounded-[12px]">
            <Form.Item name="user_info" label={"Full name or User code"}>
              <AutoComplete
                className="w-full"
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
          <div className="rounded-[12px] bg-white p-[16px] mb-[16px] h-max grid gap-[16px] [&>div]:flex [&>div]:items-center [&>div]:gap-[8px]">
            <div>
              <UserIcon size={"30"} />
              <span className="text-[16px] font-[500]">{user?.label}</span>
            </div>
            <div>
              <CalendarIcon />
              <span className="text-oxford-blue-300">
                {analyzeDay(user?.registered_days)}
              </span>

              <OrdersCountIcon />
              <span className="text-oxford-blue-300 ">
                {user?.orders_count}
              </span>

              {user?.orders_count_by_country?.map((count, index) => (
                <>
                  <img
                    alt={`country${index}`}
                    width={24}
                    height={24}
                    src={`https://devbackadmin.onex.ge/storage/images/warehouses/${count?.round_flag}`}
                  />
                  <span className="text-oxford-blue-300 ">{count?.total}</span>
                </>
              ))}
            </div>

            <div>
              <CustomersIcon color={"#8E9BA7"} />
              <span className="text-[16px]">
                {user?.recipients?.length + " " + "recipients"}
              </span>
            </div>
            <div>
              <PhoneIcon color={"#8E9BA7"} />
              <span className="text-[16px]">{user?.phone}</span>
            </div>
            <div>
              <EmailIcon color={"#8E9BA7"} />
              <span className="text-[16px]">{user?.email}</span>
            </div>
          </div>
        ) : null}
      </>
    </Drawer>
  );
};
