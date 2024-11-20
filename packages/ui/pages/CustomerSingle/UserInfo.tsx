import { useParams } from "react-router-dom";
import { useMemo } from "react";
import useGetAccountDetails from "../../hooks/customers/useGetAccountDetails.hook";
import { useMutationAuthCustomers } from "../../hooks/customers/useMutationAuthCustomers.hook";
import { notificationError } from "../../helpers/notification";
import RecipientIcon from "../../assets/icons/RecipientIcon";
import CompanyIconInCustomer from "../../assets/icons/CompanyIconInCustomer";
import GeorgianIcon from "../../assets/icons/Georgian";
import UserIcon from "../../assets/icons/UserIcon";
import PrimeIcon from "../../assets/icons/PrimeIcon";
import { OutArrowIcon } from "../../assets/icons/OutArrowIcon";

export default function UserInfo({ clientLogin }: { clientLogin?: boolean }) {
  const location = window.location.origin;

  const pathname = useMemo(() => {
    if (location.includes("dev")) return "https://dev.onex.ge";
    if (location.includes("staging")) return "https://staging.onex.ge";
    if (location.includes("localhost")) return "http://localhost:3000";
    return "https://onex.ge";
  }, [location]);
  const { id } = useParams();
  const { accountDetails } = useGetAccountDetails(id);

  const { mutate } = useMutationAuthCustomers(
    ({ data }) => {
      const userDate = data?.data || null;
      const newData = JSON.stringify(userDate);
      window.open(`${pathname}/en/user/log-in?auth=${newData}`);
    },
    () => {
      notificationError("User Log In", "something went wrong");
    }
  );
  const handleRedirect = (id: string | number) => {
    mutate({ user_id: id });
  };

  return (
    <div
      className={"_paper flex items-center justify-between w-full my-[16px]"}
    >
      <div className="flex gap-[16px]">
        <div>
          {accountDetails?.recipient.is_person === 1 &&
          accountDetails?.recipient.is_parent === 0 ? (
            <RecipientIcon />
          ) : accountDetails?.recipient?.is_person !== 1 ? (
            <CompanyIconInCustomer />
          ) : accountDetails.recipient.is_person === 1 &&
            accountDetails.recipient.is_parent === 1 &&
            accountDetails?.recipient.is_resident === "1" ? (
            <GeorgianIcon />
          ) : (
            <UserIcon />
          )}
        </div>
        <div>
          <span className="text-oxford-blue-100 text-[14px]">ID {id}</span>
          <div className="flex">
            <span className="text-[20px] text-black font-[500] pr-[5px] pb-[10px]">
              {accountDetails
                ? accountDetails?.is_person !== 1
                  ? accountDetails?.full_name +
                    " " +
                    accountDetails?.recipient?.user_code
                  : accountDetails?.recipient.first_name +
                    " " +
                    accountDetails?.recipient.last_name +
                    " " +
                    accountDetails?.recipient.user_code
                : ""}
            </span>

            {accountDetails?.is_prime ? <PrimeIcon /> : null}
            {clientLogin ? (
              <OutArrowIcon
                onClick={() => handleRedirect(accountDetails?.id)}
                margin={"4px 0 0 8px"}
                cursor={"pointer"}
              />
            ) : (
              ""
            )}
          </div>
          {/* <Flex> */}
          {/*   <Tag */}
          {/*     color="#3B5166" */}
          {/*     background="#F5F5F5" */}
          {/*     text="Lost" */}
          {/*     margin="0 16px 0 0" */}
          {/*     weight="500" */}
          {/*   /> */}
          {/*   <Tag */}
          {/*     color="#FC9A3A" */}
          {/*     background="#FFF5EB" */}
          {/*     text="CEO" */}
          {/*     margin="0 16px 0 0" */}
          {/*     weight="500" */}
          {/*   /> */}
          {/*   <Tag */}
          {/*     color="#E53E41" */}
          {/*     background="#FFECED" */}
          {/*     text="Problem maker" */}
          {/*     margin="0 16px 0 0" */}
          {/*     weight="500" */}
          {/*   /> */}
          {/* </Flex> */}
        </div>
      </div>
      <div className="flex h-[50px]">
        <div className="border-l-[1px] border-oxford-blue-50 pl-[10px] flex flex-col ml-[50px] justify-between">
          <span className="text-oxford-blue-400 font-[500] text-[14px] pb-[5px]">
            Balance
          </span>
          <span className="text-[20px] font-[500] pb-[4px]">
            {accountDetails?.balance} {import.meta.env.VITE_APP_CURRENCY || ""}
          </span>
        </div>
        <div className="border-l-[1px] border-oxford-blue-50 pl-[10px] flex flex-col ml-[50px] justify-between">
          <span className="text-oxford-blue-400 font-[500] text-[14px] pb-[5px]">
            Bonus
          </span>
          <span className="text-[20px] font-[500] pb-[4px]">
            {accountDetails?.bonus} {import.meta.env.VITE_APP_CURRENCY || ""}
          </span>
        </div>
      </div>
    </div>
  );
}
