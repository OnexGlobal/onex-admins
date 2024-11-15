import { Dispatch, FC, SetStateAction, useState } from "react";
import { usePrimeUsersAutocomplete } from "../../hooks/customers/usePrimeUsersAutocomplete.hook";
import { PrimeUser } from "@repo/types";
import { useUpdatePrimeUserStatus } from "../../hooks/customers/updatePrimeUserStatus.hook";
import {
  notificationError,
  notificationSuccess,
} from "../../components/alerts/notification";
import { AutoComplete, Button, Drawer } from "antd";
import CalendarIcon from "../../assets/icons/CalendarIcon";
import { analyzeDay } from "../../helpers/analyzeDayOfYear";
import OrdersCountIcon from "../../assets/icons/OrdersCountIcon";
import UserIcon from "../../assets/icons/UserIcon";
import { CustomersIcon } from "../../assets/icons/CustomersIcon";
import PhoneIcon from "../../assets/icons/PhoneIcon";
import EmailIcon from "../../assets/icons/EmailIcon";

interface AddProps {
  add: boolean;
  setAdd: Dispatch<SetStateAction<boolean>>;
}

export const AddPrimeUsers: FC<AddProps> = ({ add, setAdd }) => {
  const [userInfo, setUserInfo] = useState({});
  const { usersList } = usePrimeUsersAutocomplete(userInfo);
  const [selected, setSelected] = useState<PrimeUser.PrimeUserType | null>(
    null
  );
  const [completeVal, setCompleteVal] = useState("");
  const { mutate } = useUpdatePrimeUserStatus(
    () => {
      notificationSuccess("Make Prime", "Prime successfully created");
      setAdd(false);
      setSelected(null);
      setCompleteVal("");
    },
    () => {
      notificationError("Make Prime", "something went wrong");
    }
  );
  const handleCanceled = () => {
    setAdd(false);
    setSelected(null);
    setCompleteVal("");
  };
  const onFinish = () => {
    if (selected) {
      const newValues = { id: selected.id, status: 1 };
      mutate(newValues);
    }
  };
  return (
    <Drawer
      styles={{
        header: { display: "none" },
      }}
      placement="right"
      onClose={handleCanceled}
      open={add}
      width="485px"
    >
      <h1 className="text-title">Customers</h1>
      <div className="flex items-center justify-between mb-[16px]">
        <h2 className="text-[22px] ">Add prime</h2>
        <div className="flex items-center gap-[16px]">
          <Button danger onClick={handleCanceled}>
            Cancel
          </Button>
          <Button
            type="primary"
            onClick={onFinish}
            disabled={selected === null}
          >
            Make prime
          </Button>
        </div>
      </div>
      <div className={"_paper"}>
        <span className="font-[500] text-black">Full name or user code</span>
        <AutoComplete
          value={completeVal}
          style={{ marginBottom: 16, width: "100%" }}
          placeholder="Full name or user code"
          onChange={(val) => setCompleteVal(val)}
          onSearch={(val) => {
            setUserInfo({ user_info: val, is_prime: 1 });
          }}
          onSelect={(_, val: PrimeUser.PrimeUserType) => setSelected(val)}
          options={usersList}
        />
      </div>
      {!!selected && (
        <div className="grid gap-[16px] [&>div]:flex [&>div]:items-center [&>div]:gap-[8px]">
          <div>
            <CalendarIcon />
            <span className="text-oxford-blue-300">
              {analyzeDay(selected?.registered_days)}
            </span>

            <OrdersCountIcon />
            <span className="text-oxford-blue-300 ">
              {selected?.orders_count}
            </span>

            {selected?.orders_count_by_country?.map((count, index) => (
              <>
                <img
                  alt={`country${index}`}
                  width={24}
                  height={24}
                  src={`${import.meta.env.VITE_APP_BASE_URL_DEV}/storage/images/warehouses/${count?.round_flag}`}
                />
                <span className="text-oxford-blue-300 ">{count?.total}</span>
              </>
            ))}
          </div>

          <div>
            <UserIcon size={"30"} />
            <span className="text-[16px] font-[500] text-oxford-blue-200">
              {selected?.label}
            </span>
          </div>

          <div>
            <CustomersIcon color={"#8E9BA7"} />
            <span className="text-[16px] font-[500] text-oxford-blue-200">
              {selected?.recipients?.length + " " + "recipients"}
            </span>
          </div>
          <div>
            <PhoneIcon color={"#8E9BA7"} />
            <span className="text-[16px] font-[500] text-oxford-blue-200">
              {selected?.phone}
            </span>
          </div>
          <div>
            <EmailIcon color={"#8E9BA7"} />
            <span className="text-[16px] font-[500] text-oxford-blue-200">
              {selected?.email}
            </span>
          </div>
        </div>
      )}
    </Drawer>
  );
};
