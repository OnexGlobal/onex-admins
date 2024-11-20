import { CustomersBlockType } from "@repo/types/src/customers-type";
import { Button, Input } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useGetAccountDetails from "../../../hooks/customers/useGetAccountDetails.hook";
import { customersApi } from "../../../services/customers";
import FilledInfoIcon from "../../../assets/icons/FilledInfoIcon";

const { TextArea } = Input;

export default function BlockUser({ setStatus }: CustomersBlockType) {
  const [reason, setReason] = useState("");
  const { id } = useParams();
  const { refetch } = useGetAccountDetails(id);
  const [loading, setLoading] = useState(false);

  const handleBlockUser = () => {
    setLoading(true);
    customersApi
      .blockUserService(id, reason)
      .then(() => {
        refetch();
        setStatus(false);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div>
      <div className="header mb-[20px]">
        <div className="flex items-center justify-between">
          <FilledInfoIcon />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-[18px] font-[500] pb-[8px] text-[#101828]">
          Block user
        </span>
        <span className="text-oxford-blue-400 text-[14px] font-[500] pb-[4px]">
          Please write ban reason
        </span>

        <TextArea
          placeholder="Ban reason"
          rows={3}
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
      </div>
      <div className="mt-[24px]">
        <div className="flex justify-between items-center gap-[16px]">
          <Button
            type="default"
            className="w-full bg-red-50 text-red-500 border-red-50 hover:!bg-red-50 hover:!text-red-500 hover:!border-red-50"
            onClick={() => setStatus(false)}
          >
            Cancel
          </Button>
          <Button
            className="w-full"
            type="primary"
            onClick={() => handleBlockUser()}
            loading={loading}
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}
