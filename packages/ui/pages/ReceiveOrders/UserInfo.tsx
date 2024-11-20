import { Link } from "react-router-dom";
import UserIcon from "@repo/ui/assets/icons/UserIcon";

import PrimeIcon from "@repo/ui/assets/icons/PrimeIcon";
import RightArrowIcon from "@repo/ui/assets/icons/RightArrowIcon";
import { Dispatch, SetStateAction } from "react";
import { Recipient } from "@repo/types/src/prime-users-type";
import { Alert, Button, Tag } from "antd";

interface Props {
  user: Recipient;
  setFillBalanceStatus: Dispatch<SetStateAction<boolean>>;
}

export default function ReceivedUserInfo({
  setFillBalanceStatus,
  user,
}: Props) {
  return (
    <>
      <div className="flex rounded-[12px] w-full justify-between bg-white gap-[16px] p-[16px] my-[16px]">
        <UserIcon />
        <div>
          <h1 className="text-info text-oxford-blue-100">{`ID ${
            user?.id || ""
          }`}</h1>
          <h1 className="text-description">
            {
              <div className="flex items-center">
                {user?.label || ""}
                {!user?.user?.is_prime ? (
                  <PrimeIcon className="ml-[4px]" />
                ) : (
                  ""
                )}
              </div>
            }
          </h1>

          <div className="flex gap-[16px] mt-[10px]">
            <Link to={`/customer/${user.user.id}`}>
              <Tag className="bg-green-50 text-green-500">
                {
                  <div className="flex items-center">
                    <h1 className="text-info font-[500]"> View customer</h1>
                    <RightArrowIcon color="#5DBA2F" className="ml-[5px]" />
                  </div>
                }
              </Tag>
            </Link>
            <Link
              to={`/orders?user_info=${user?.user_code.substr(
                2,
                user?.user_code?.length - 1
              )}`}
            >
              <Tag className="text-oxford-blue-400 bg-oxford-blue-30">
                {
                  <div className="flex items-center">
                    <h1 className="text-info font-[500]">View orders</h1>
                    <RightArrowIcon color="#3B5166" className="ml-[5px]" />
                  </div>
                }
              </Tag>
            </Link>
            <Link
              to={`/orders?status=received&user_info=${user?.user_code.substr(
                2,
                user?.user_code?.length - 1
              )}`}
            >
              <Tag className="text-oxford-blue-400 bg-oxford-blue-30">
                {
                  <div className="flex items-center">
                    <h1 className="text-info font-[500]">
                      View received orders
                    </h1>
                    <RightArrowIcon color="#3B5166" className="ml-[5px]" />
                  </div>
                }
              </Tag>
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-[32px] ml-auto">
          <div className="border-l-[1px] border-oxford-blue-50 pl-[10px]">
            <h1 className="text-info font-[500] text-oxford-blue-400 pr-[6px] pb-[5px]">
              Bonus
            </h1>
            <h1 className="text-description pr-[26px] pb-[4px]">{`${
              user?.user?.bonus || "0"
            } ${import.meta.env.VITE_APP_CURRENCY}`}</h1>
          </div>
          <div className="border-l-[1px] border-oxford-blue-50 pl-[10px]">
            <h1 className="text-info font-[500] text-oxford-blue-400 pr-[6px] pb-[5px]">
              Balance
            </h1>
            <h1 className="text-description pb-[4px]">{`${
              user?.user?.balance || "0"
            } ${import.meta.env.VITE_APP_CURRENCY}`}</h1>
          </div>

          <Button type="primary" onClick={() => setFillBalanceStatus(true)}>
            Refill balance
          </Button>
        </div>
      </div>
      {!user?.document_number ? (
        <Alert
          style={{ width: "100%" }}
          message={"Passport details are not filled"}
          type={"warning"}
          showIcon
        />
      ) : (
        ""
      )}
    </>
  );
}
