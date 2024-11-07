import React, { Dispatch, FC, SetStateAction } from "react";
import { Modal } from "antd";
import { WarningCircleIcon } from "@repo/ui/assets/icons/WarningCircleIcon";
import Primary from "../buttons/Primary";

interface DeactivateProps {
  deactivate: boolean;
  setDeactivate: Dispatch<SetStateAction<boolean>>;
  useDeactivate: () => void;
  description?: string;
  title?: string;
  action?: string;
}

export const DeactivateModal: FC<DeactivateProps> = ({
  deactivate,
  setDeactivate,
  useDeactivate,
  title = "",
  description = "",
  action = "Delete",
}) => {
  return (
    <Modal
      title={<WarningCircleIcon />}
      open={deactivate}
      onCancel={() => setDeactivate(false)}
      footer={null}
      width={400}
    >
      <h1 className="text-description">{title}</h1>
      <h1 className="text-info text-oxford-blue-300">{description}</h1>
      <div className="flex justify-between w-[100%] mt-[24px] mb-[12px]">
        <Primary
          color={"default"}
          className="w-[100%]"
          onClick={() => setDeactivate(false)}
        >
          Cancel
        </Primary>
        <Primary className="w-[100%] ml-[16px]" onClick={useDeactivate}>
          {action}
        </Primary>
      </div>
    </Modal>
  );
};
