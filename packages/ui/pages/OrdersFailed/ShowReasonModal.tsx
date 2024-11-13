import { Modal, Tag } from "antd";
import InfoIcon from "@repo/ui/assets/icons/InfoIcon";
import CloseIcon from "@repo/ui/assets/icons/CloseIcon";
import { Dispatch, FC, SetStateAction } from "react";

interface Props {
  open: string[] | false;
  setOpen: Dispatch<SetStateAction<string[] | false>>;
}

export const ShowReasonModal: FC<Props> = ({ open, setOpen }) => {
  return (
    <Modal
      open={!!open}
      title={<InfoIcon />}
      footer={false}
      onCancel={() => setOpen(false)}
      closeIcon={<CloseIcon />}
    >
      <h1 className="text-description mb-[16px]">Reasons</h1>

      <div className="flex gap-[8px]">
        {!!open &&
          open.map((not, i) => (
            <Tag key={i} className="bg-oxford-blue-30">
              {not}
            </Tag>
          ))}
      </div>
    </Modal>
  );
};
