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
      <div className="flex rounded-[12px] bg-white gap-[16px] p-[16px] my-[16px]">
        <UserIcon />
        <div>
          <h1 className="text-info text-oxford-blue-100">{`ID ${
            user?.id || ""
          }`}</h1>
          <h1 className="text-description text-oxford-blue-100">
            {
              <>
                {user?.label || ""}{" "}
                {!user?.user?.is_prime ? (
                  <PrimeIcon margin={"0 0 -3px 0"} />
                ) : (
                  ""
                )}
              </>
            }
          </h1>

          <div className="flex gap-[16px] mt-[6px]">
            <Link to={`/customer/${user.user.id}`} className="user-action_link">
              <Tag className="bg-green-50 text-green-500" color={"#5DBA2F"}>
                {
                  <div className="flex items-center">
                    View customer
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
              className="user-action_link"
            >
              <Tag
                className="bg-green-50 text-oxford-blue-400 bg-oxford-blue-30"
                color={"#5DBA2F"}
              >
                {
                  <div className="flex items-center">
                    View customer
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
              className="user-action_link"
            >
              <Tag
                className="bg-green-50 text-oxford-blue-400 bg-oxford-blue-30"
                color={"#5DBA2F"}
              >
                {
                  <div className="flex items-center">
                    View received orders
                    <RightArrowIcon color="#3B5166" className="ml-[5px]" />
                  </div>
                }
              </Tag>
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-[32px] ml-auto">
          <div className="border-[1px] border-oxford-blue-50 pl-[10px]">
            <h1 className="text-info font-[500] text-oxford-blue-400 pr-[6px] pb-[5px]">
              Bonus
            </h1>
            <h1 className="text-description pr-[26px] pb-[4px]">{`${
              user?.user?.bonus || "0"
            } ${import.meta.env.VITE_APP_CURRENCY}`}</h1>
          </div>
          <div className="left-border-item">
            <h1 className="text-info font-[500] text-oxford-blue-400 pr-[6px] pb-[5px]">
              Balance
            </h1>
            <h1 className="text-description  pb-[4px]">{`${
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
