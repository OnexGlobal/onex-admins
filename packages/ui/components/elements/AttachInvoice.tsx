import { Button, Upload, UploadFile } from "antd";
import FileIcon from "@repo/ui/assets/icons/FileIcon";
import TrashIcon from "@repo/ui/assets/icons/TrashIcon";
import * as React from "react";
import { ReactNode } from "react";

export const AttachInvoice = ({
  onChange,
  value,
  text = "Attach Invoice",
  icon = <FileIcon />,
  ...uploadProps
}: {
  onChange?: (fileList?: File | null) => void;
  value?: UploadFile;
  text?: ReactNode;
  icon?: ReactNode;
}) => {
  return (
    <Upload
      name="file-invoice"
      {...uploadProps}
      onChange={(files) =>
        onChange &&
        onChange(
          files?.fileList?.length > 0 ? files?.file?.originFileObj : null
        )
      }
      // @ts-ignore
      customRequest={({ onSuccess }) => onSuccess("ok")}
      showUploadList={false}
    >
      {value ? (
        <h1 className="text-info text-oxford-blue-300">
          {
            <div className="flex items-center">
              {value?.name}
              <TrashIcon
                size={"18"}
                className="ml-[6px]"
                onClick={(e: React.MouseEvent<HTMLOrSVGElement>) => {
                  e.stopPropagation();
                  onChange && onChange(null);
                }}
              />
            </div>
          }
        </h1>
      ) : (
        <Button icon={icon} color="default" type="dashed">
          {text}
        </Button>
      )}
    </Upload>
  );
};
