import { AutoComplete, Button } from "antd";
import { DefaultOptionType } from "antd/es/select";
import AcceptIcon from "@repo/ui/assets/icons/AcceptIcon";
import CancelIcon from "@repo/ui/assets/icons/CancelIcon";
import ChangeUserIcon from "@repo/ui/assets/icons/ChangeUserIcon";
import PrimeIcon from "@repo/ui/assets/icons/PrimeIcon";
import {
  notificationError,
  notificationSuccess,
} from "@repo/ui/helpers/notification";
import useGetRecipients from "@repo/ui/hooks/recipients/useGetRecipients.hook";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Refetch } from "@repo/types";
import { OrderData } from "@repo/types/src/orders";
import { Permissions } from "@repo/types/src/permissions";
import { useChangeOrderRecipient } from "@repo/ui/hooks/orders/useChangeOrderRecipient.hook";

interface Props {
  order: OrderData;
  refetch: Refetch;
  permissions: Permissions["order"];
}

export default function OrderDetailsCustomer({ order, refetch }: Props) {
  const [editStatus, setEditStatus] = useState(false);
  const [userInfo, setUserInfo] = useState<null | { user_info: string }>(null);
  const { recipients = [] } = useGetRecipients(userInfo);
  const [changeUserInfo, setChangeUserInfo] = useState<
    DefaultOptionType | undefined
  >();
  const { mutate } = useChangeOrderRecipient(
    (res) => {
      if (res?.data?.success) {
        setEditStatus(false);
        notificationSuccess("Success!", res?.data?.message);
      } else {
        notificationError("Error!", res?.data?.message);
      }
      refetch();
    },
    () => notificationError("Error!", "Something went wrong!")
  );
  const handleChangeUser = () => {
    if (order.id)
      mutate({
        id: order.id,
        user_id: changeUserInfo?.user_id,
        recipient_id: changeUserInfo?.id,
      });
  };

  return (
    <>
      <div
        className={
          "flex justify-between w-full mb-[16px] rounded-[12px] bg-white p-[16px] gap-[16px]"
        }
      >
        <div className="flex items-center gap-[50px]">
          <div>
            <h1 className="text-info font-[500] text-oxford-blue-400">
              Customer
            </h1>
            <Link to={`/customer/${order?.recipient?.user?.id}`}>
              <h1 className="text-info font-[500] pt-[5px]">
                {
                  <div className="flex items-center">
                    {order?.recipient?.user?.full_name || ""}
                    {" " + order?.recipient?.user?.user_code || ""}
                    {!order?.recipient?.user?.is_prime ? (
                      <PrimeIcon className="ml-[10px]" />
                    ) : null}
                  </div>
                }
              </h1>
            </Link>
          </div>
          <div className="border-l-[1px] border-oxford-blue-50 pl-[10px]">
            <h1 className="text-info font-[500] text-oxford-blue-400">
              Recipient
            </h1>
            {!editStatus ? (
              <h1 className="text-info mt-[10px]">{`${order.recipient.first_name} ${order.recipient.last_name} ${order?.recipient?.user_code}`}</h1>
            ) : (
              <AutoComplete
                placeholder="Full name or User Code"
                onSearch={(val) => setUserInfo({ user_info: val })}
                options={recipients}
                onSelect={(_, info) => setChangeUserInfo(info)}
                style={{ width: 250 }}
              />
            )}
          </div>
        </div>
        {editStatus ? (
          <div className="flex gap-[12px]">
            <CancelIcon onClick={() => setEditStatus(false)} />
            <AcceptIcon onClick={() => handleChangeUser()} />
          </div>
        ) : (
          <Button
            type={"default"}
            icon={<ChangeUserIcon />}
            onClick={() => setEditStatus(true)}
          />
        )}
      </div>
      <div className="flex rounded-[12px] bg-white p-[16px] gap-[50px]">
        <div>
          <h1 className="text-info font-[500] text-oxford-blue-400 pb-[5px]">
            Balance
          </h1>
          <h1 className="text-info">
            {`${order?.recipient?.user?.balance} ₾`}
          </h1>
        </div>
        <div>
          <h1 className="text-info font-[500] text-oxford-blue-400 pb-[5px]">
            Phone
          </h1>
          <h1 className="text-info">{order?.recipient?.phone}</h1>
        </div>
        <div>
          <h1 className="text-info font-[500] text-oxford-blue-400 pb-[5px]">
            Address
          </h1>
          <h1 className="text-info">{order?.recipient?.address}</h1>
        </div>
        <div>
          <h1 className="text-info font-[500] text-oxford-blue-400 pb-[5px]">
            Email
          </h1>
          <h1 className="text-info">{order?.recipient?.user?.email}</h1>
        </div>
      </div>
    </>
  );
}
