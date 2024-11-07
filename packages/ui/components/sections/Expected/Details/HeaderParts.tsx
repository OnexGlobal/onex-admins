import MoneyIcon from "@repo/ui/assets/icons/MoneyIcon";
import FileIcon from "@repo/ui/assets/icons/FlyIcon";
import ListIcon from "@repo/ui/assets/icons/ListIcon";
import ShopIcon from "@repo/ui/assets/icons/ShopIcon";
import { EditIcon } from "@repo/ui/assets/icons/EditIcon";
import React, { FC } from "react";
import { ExpectedOrdersType } from "@repo/types/src/expected-orders-type";
import { Button } from "antd";

interface Props {
  expectedByID: ExpectedOrdersType;
  setAddService: (val: boolean) => void;
  setEditable: (val: boolean) => void;
}

export const HeaderParts: FC<Props> = ({
  expectedByID,
  setAddService,
  setEditable,
}) => {
  return (
    <div className="flex justify-between mb-[16px]">
      <div>
        <div className="flex items-center gap-[8px]">
          <img
            src={expectedByID?.dispatch?.warehouse?.round_flag}
            alt="warehouse"
          />
          <img src={expectedByID?.dispatch?.icon} alt="dispatch" />
          <h1 className="text-description">
            {expectedByID?.tracking_code || ""}
          </h1>
        </div>
        <div className="flex gap-[16px] mt-[8px] mb-[8px]">
          <h1 className="text-info text-oxford-blue-300">
            {expectedByID?.customer_comment || ""}
          </h1>

          <h1 className="text-info whitespace-nowrap">
            <div className="flex items-center">
              <MoneyIcon className="mr-[7px]" />
              {expectedByID?.declaration_price || ""}{" "}
              {expectedByID?.declaration_currency || ""}
            </div>
          </h1>
          {!!expectedByID?.invoice && (
            <a href={expectedByID?.invoice?.file} target={"_blank"}>
              <h1 className="text-info">
                <div className="flex items-center">
                  <FileIcon className="mr-[7px]" />
                  Invoice
                </div>
              </h1>
            </a>
          )}
          <h1 className="text-info">
            {expectedByID?.category?.name ? (
              <div className="flex items-center">
                <ListIcon className="mr-[7px]" />
                {expectedByID?.category?.name}
              </div>
            ) : (
              ""
            )}
          </h1>

          <h1 className="text-info">
            {expectedByID?.shop_name ? (
              <div className="flex items-center">
                <ShopIcon className="mr-[7px]" />
                {expectedByID?.shop_name}
              </div>
            ) : (
              ""
            )}
          </h1>
        </div>
      </div>
      <div className="flex gap-[16px]">
        <Button type="primary" onClick={() => setAddService(true)}>
          Add smart service
        </Button>
        <Button
          onClick={() => setEditable(true)}
          color="default"
          icon={<EditIcon />}
        >
          Edit
        </Button>
      </div>
    </div>
  );
};
