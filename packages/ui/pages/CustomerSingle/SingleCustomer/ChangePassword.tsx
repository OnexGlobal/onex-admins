import { CustomersBlockType } from "@repo/types/src/customers-type";
import { Button, message } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { customersApi } from "../../../services/customers";
import FilledInfoIcon from "../../../assets/icons/FilledInfoIcon";
import CloseIcon from "../../../assets/icons/CloseIcon";

export default function ChangePassword({
  status,
  setStatus,
}: CustomersBlockType) {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  const handleConfirm = () => {
    setLoading(true);
    customersApi
      .changePasswordService(id)
      .then((res) => {
        console.log(res);
        setStatus(false);
        message.success(res.data.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    status && (
      <>
        <div>
          <div className="header">
            <div className="flex items-center justify-between">
              <FilledInfoIcon />
              <CloseIcon />
            </div>
          </div>
          <div className="body">
            <h4 className="text-[18px] font-[500] text-black pb-[8px]">
              Change password
            </h4>
            <h4 className="text-oxford-blue-300 text-[14px] pb-[8px]">
              Change password to 123456789
            </h4>
          </div>
          <div className="footer">
            <div className="flex justify-between items-center">
              <Button onClick={() => setStatus(false)} type="default">
                Cancel
              </Button>
              <Button
                onClick={() => handleConfirm()}
                loading={loading}
                type="primary"
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
