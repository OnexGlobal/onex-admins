import { ReactNode, useEffect, useState } from "react";
import type { UploadFile, UploadProps } from "antd";
import { message, Upload } from "antd";

interface OSSDataType {
  dir: string;
  expire: string;
  host: string;
  accessId: string;
  policy: string;
  signature: string;
}

interface AliyunOSSUploadProps {
  value?: UploadFile[];
  onChange?: (fileList: UploadFile[]) => void;
  children: ReactNode;
}

export const FileUpload = ({
  value,
  onChange,
  children,
}: AliyunOSSUploadProps) => {
  const [OSSData, setOSSData] = useState<OSSDataType>();

  // Mock get OSS api
  // https://help.aliyun.com/document_detail/31988.html
  const mockGetOSSData = () => ({
    dir: "user-dir/",
    expire: "1577811661",
    host: "//www.mocky.io/v2/5cc8019d300000980a055e76",
    accessId: "c2hhb2RhaG9uZw==",
    policy: "eGl4aWhhaGFrdWt1ZGFkYQ==",
    signature: "ZGFob25nc2hhbw==",
  });

  const init = async () => {
    try {
      const result = await mockGetOSSData();
      setOSSData(result);
    } catch (error) {
      message.error("error");
    }
  };

  useEffect(() => {
    init();
  }, []);

  const handleChange: UploadProps["onChange"] = ({ fileList }) => {
    console.log("Aliyun OSS:", fileList);
    onChange?.([...fileList]);
  };

  const onRemove = (file: UploadFile) => {
    const files = (value || []).filter((v) => v.url !== file.url);

    if (onChange) {
      onChange(files);
    }
  };

  const getExtraData: UploadProps["data"] = (file) => ({
    key: file.url,
    OSSAccessKeyId: OSSData?.accessId,
    policy: OSSData?.policy,
    Signature: OSSData?.signature,
  });

  const beforeUpload: UploadProps["beforeUpload"] = async (file) => {
    if (!OSSData) return false;

    const expire = Number(OSSData.expire) * 1000;

    if (expire < Date.now()) {
      await init();
    }

    const suffix = file.name.slice(file.name.lastIndexOf("."));
    const filename = Date.now() + suffix;
    // @ts-ignore
    file.url = OSSData.dir + filename;

    return file;
  };

  const uploadProps: UploadProps = {
    name: "file",
    fileList: value,
    // @ts-ignore
    customRequest: ({ onSuccess }) => onSuccess("ok"),
    onChange: handleChange,
    onRemove,
    data: getExtraData,
    beforeUpload,
  };

  return (
    <Upload {...uploadProps} maxCount={1}>
      {children}
    </Upload>
  );
};
