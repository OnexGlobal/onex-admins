import { Dispatch, FC, SetStateAction } from "react";
import { Button, Modal } from "antd";
import { WarningCircleIcon } from "../../assets/icons/WarningCircleIcon";
import { Status } from "@repo/types/src/expected";

interface DeletedProps {
  deleted: Status;
  deletedId?: Status;
  setDeleted: Dispatch<SetStateAction<any>>;
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
      <h1 className="text-title w-[100%]">{title}</h1>
      <h1 className="text-info text-oxford-blue-300">{description}</h1>
      <div className="flex justify-between w-[100%] mt-[24px] mb-[12px]">
        <Button
          color="default"
          onClick={() => setDeleted(false)}
          className="w-[100%] hover:!text-black hover:!border-oxford-blue-50"
        >
          Cancel
        </Button>

        <Button
          color="danger"
          onClick={() => handleDelete({ id: deletedId || "", status: 0 })}
          className="w-[100%] bg-red-500 ml-[16px] text-white hover:!bg-red-500 hover:!text-white hover:!border-red-500"
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
};
