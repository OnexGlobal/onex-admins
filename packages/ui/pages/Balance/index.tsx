import { useState } from "react";
import useGetRecipients from "../../hooks/recipients/useGetRecipients.hook";
import { useBalancesList } from "../../hooks/balances/useBalances.hook";
import BalanceTopActions from "./TopActions";
import { ShowUserInfo } from "./ShowUserInfo";
import BalanceTable from "./Table";
import { AddBankTransferModal } from "./AddBankTransferModal";

const Balance = ({ balance_edit = false }) => {
  const [filterData, setFilterData] = useState<Record<string, string | number>>(
    {}
  );
  const [open, setOpen] = useState(false);
  const [userInfo, setUserInfo] = useState<Record<string, string> | null>(null);
  const { recipients: usersList = [] } = useGetRecipients(
    userInfo && userInfo?.user_info?.trim()?.length === 0 ? null : userInfo
  );
  const {
    balancesList = [],
    meta,
    isLoading,
    refetch,
    sumIn = 0,
    sumOut = 0,
  } = useBalancesList(filterData);
  return (
    <>
      <span className="text-[24px] mb-[24px] text-black">Balance</span>

      <BalanceTopActions
        setFilterData={setFilterData}
        setUserInfo={setUserInfo}
        usersList={usersList}
      />
      {!!filterData?.user_id && (
        <ShowUserInfo
          setOpen={setOpen}
          isPrime={
            balancesList[0]?.user?.is_prime || usersList[0]?.user?.is_prime
          }
          userInfo={balancesList[0]?.user?.recipient || usersList[0]}
        />
      )}
      <BalanceTable
        params={filterData}
        balancesList={balancesList}
        meta={meta}
        isLoading={isLoading}
        refetch={refetch}
        sumIn={sumIn}
        sumOut={sumOut}
        setFilterData={setFilterData}
        balance_edit={balance_edit}
      />
      <AddBankTransferModal
        open={open}
        setOpen={setOpen}
        user={balancesList[0]?.user}
        recipient={usersList[0]}
        refetch={refetch}
      />
    </>
  );
};

export default Balance;
