import { CustomersBlockType } from "@repo/types/src/customers-type";
import { Button, message } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { customersApi } from "../../../services/customers";
import FilledInfoIcon from "../../../assets/icons/FilledInfoIcon";

export default function ChangePassword({ setStatus }: CustomersBlockType) {
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
    <div>
      <div className="header mb-[20px]">
        <div className="flex items-center justify-between">
          <FilledInfoIcon />
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
      <div className="footer mt-[24px]">
        <div className="flex justify-between items-center gap-[16px]">
          <Button
            className="w-full bg-red-50 text-red-500 border-red-50 hover:!bg-red-50 hover:!text-red-500 hover:!border-red-50"
            onClick={() => setStatus(false)}
            type="default"
          >
            Cancel
          </Button>
          <Button
            className="w-full"
            onClick={() => handleConfirm()}
            loading={loading}
            type="primary"
          >
            Confirm
          </Button>
        </div>
      </div>
    </div>
  );
}
