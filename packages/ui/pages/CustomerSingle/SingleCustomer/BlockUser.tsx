import { CustomersBlockType } from "@repo/types/src/customers-type";
import { Button, Input } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import useGetAccountDetails from "../../../hooks/customers/useGetAccountDetails.hook";
import { customersApi } from "../../../services/customers";
import FilledInfoIcon from "../../../assets/icons/FilledInfoIcon";
import CloseIcon from "../../../assets/icons/CloseIcon";

const { TextArea } = Input;

export default function BlockUser({ status, setStatus }: CustomersBlockType) {
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
    status && (
      <>
        <div className="z-[99] overlay w-full h-[100vh] fixed top-0 left-0 bg-[rgba(77_77_77_0.39)]" />
        <div>
          <div className="header">
            <div className="flex items-center justify-between">
              <FilledInfoIcon />
              <CloseIcon />
            </div>
          </div>
          <div className="body">
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
          <div className="footer">
            <div className="flex justify-between items-center">
              <Button type="default" onClick={() => setStatus(false)}>
                Cancel
              </Button>
              <Button
                type="primary"
                onClick={() => handleBlockUser()}
                loading={loading}
              >
                Confirm
              </Button>
            </div>
          </div>
        </div>
      </>
    )
  );
}
