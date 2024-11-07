import React, { Dispatch, FC, SetStateAction } from "react";
import { Button, Modal } from "antd";
import { WarningCircleIcon } from "@repo/ui/assets/icons/WarningCircleIcon";

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
        <Button
          color={"default"}
          className="w-[100%] hover:!text-black hover:!border-oxford-blue-50"
          onClick={() => setDeactivate(false)}
        >
          Cancel
        </Button>
        <Button
          className="w-[100%] bg-red-500 ml-[16px] text-white hover:!bg-red-500 hover:!text-white hover:!border-red-500"
          onClick={useDeactivate}
        >
          {action}
        </Button>
      </div>
    </Modal>
  );
};
