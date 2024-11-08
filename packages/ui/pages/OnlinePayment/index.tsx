import { useState } from "react";
import OnlinePaymentTopActions from "./TopActions";
import { PaymentTable } from "./PaymentTable.jsx";
import { RefundPaymentModal } from "./RefundPaymentModal";
import { RefundType } from "@repo/types/src/online-payment";
export default function OnlinePayment() {
  const [filterData, setFilterData] = useState({});
  const [refund, setRefund] = useState<RefundType>(false);
  return (
    <>
      {" "}
      <h1 className="text-title mb-[24px]">Online payment</h1>
      <OnlinePaymentTopActions setFilterData={setFilterData} />
      <PaymentTable
        setRefund={setRefund}
        filterData={filterData}
        setFilterData={setFilterData}
      />
      <RefundPaymentModal refund={refund} setRefund={setRefund} />
    </>
  );
}
