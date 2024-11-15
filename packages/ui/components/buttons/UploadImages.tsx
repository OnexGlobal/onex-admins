import React, { useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { message, Upload, UploadProps } from "antd";

type FileT = string | ArrayBuffer | null;
const getBase64 = (img: Blob, callback: (value: FileT) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
const beforeUpload: UploadProps["beforeUpload"] = (file) => {
  const isJpgOrPng =
    file.type === "image/jpeg" ||
    file.type === "image/png" ||
    file.type === "image/svg+xml";
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  } else if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }

  return file;
};

interface UploadImageProps {
  imageUrl: string;
  setImageUrl: (val: string) => void;
  initialImage?: unknown;
  style?: object;
  onChange?: (value: File) => void;
}

export const UploadImages: React.FC<UploadImageProps> = ({
  onChange,

  imageUrl,
  setImageUrl = () => {},
  initialImage,
  ...props
}) => {
  const [loading, setLoading] = useState(false);

  const handleChange: UploadProps["onChange"] = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done" && info.file.originFileObj) {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url: FileT) => {
        setLoading(false);
        if (typeof url === "string") setImageUrl(url);
      });
      if (onChange) onChange(info.file.originFileObj);
    }
  };

  const uploadButton = (
    <div style={props.style || {}}>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  return (
    <>
      <Upload
        listType="picture-card"
        className="avatar-uploader"
        showUploadList={false}
        // @ts-ignore
        customRequest={({ onSuccess }) => onSuccess("ok")}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        {...props}
      >
        {imageUrl || initialImage ? (
          <img
            src={imageUrl}
            alt=""
            style={{
              width: "100%",
            }}
          />
        ) : (
          uploadButton
        )}
      </Upload>
    </>
  );
};
