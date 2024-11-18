import { AccountDetailsTypes } from "@repo/types/src/customers-type";
import { useState } from "react";
import { customersApi } from "../../services/customers";
import BlockUser from "./SingleCustomer/BlockUser";
import ChangePassword from "./SingleCustomer/ChangePassword";
import { Button, Divider } from "antd";

// const StyledCustomerSettings = styled.div`
//   .item {

//   }
// `;

interface Props {
  accountDetails: AccountDetailsTypes;
  refetch: () => void;
}

export default function CustomerSingleSettings({
  accountDetails,
  refetch,
}: Props) {
  const [status, setStatus] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleUnlockUser = () => {
    setLoading(true);
    if (accountDetails?.current_blocked_account?.id)
      customersApi
        .unblockUserService(accountDetails?.current_blocked_account?.id)
        .then(() => {
          refetch();
          setLoading(false);
        });
  };

  return (
    <div className="border-b-[1px] border-b-oxford-blue-30 py-[16px]">
      <BlockUser status={status} setStatus={setStatus} />
      <ChangePassword setStatus={setPasswordStatus} status={passwordStatus} />
      <div className="flex flex-col w-fit">
        <span className="text-oxford-blue-400 text-[14px] font-[500] pb-[4px]">
          Block user
        </span>
        <span className="text-black text-[14px] pb-[10px]">
          {accountDetails?.current_blocked_account
            ? "You can unblock user"
            : "If there is a problem with a user you can block user"}
        </span>

        {accountDetails?.current_blocked_account ? (
          <Button
            type="primary"
            onClick={() => handleUnlockUser()}
            loading={loading}
          >
            Unblock user
          </Button>
        ) : (
          <Button
            type="primary"
            onClick={() => setStatus(true)}
            danger
            loading={loading}
            className="w-fit"
          >
            Block user
          </Button>
        )}
      </div>
      <Divider />
      <div className="flex flex-col ">
        <span className="text-[14px] font-[500] pb-[4px] text-oxford-blue-400">
          Change password
        </span>
        <span className="text-black text-[14px] pb-[10px]">
          Change password to 123456789
        </span>
        <Button
          onClick={() => setPasswordStatus(true)}
          type="default"
          className="w-fit"
        >
          Change
        </Button>
      </div>
    </div>
  );
}
