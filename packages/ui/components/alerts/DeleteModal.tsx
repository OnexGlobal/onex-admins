import React, { Dispatch, FC, SetStateAction } from "react";
import { Button, Modal } from "antd";
import { Status } from "@repo/types";
import { WarningCircleIcon } from "../../assets/icons/WarningCircleIcon";

interface DeletedProps {
  deleted: Status;
  deletedId?: Status;
  setDeleted: Dispatch<SetStateAction<Status>>;
  handleDelete: (val: Record<string, Status>) => void;
  description?: string;
  title?: string;
}

export const DeleteModal: FC<DeletedProps> = ({
  deleted,
  setDeleted,
  deletedId,
  handleDelete,
  title = "",
  description = "",
}) => {
  return (
    <Modal
      title={<WarningCircleIcon />}
      open={!!deleted}
      onCancel={() => setDeleted(false)}
      footer={null}
      width={400}
    >
      <span className="text-[18px]">{title}</span>
      <span className="text-[18px] text-oxford-blue-300">{title}</span>

      <div className="w-full flex justify-between mt-[24px] mb-[12px]">
        <Button onClick={() => setDeleted(false)} />
        <Button
          onClick={() => handleDelete({ id: deletedId || "", status: 0 })}
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
};
