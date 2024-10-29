import React, { ReactNode } from "react";
import { ConfigProvider } from "antd";

const AntdConfigProvider = ({ children }) => {
  return (
    <ConfigProvider
      prefixCls="onex"
      iconPrefixCls="onex-icon"
      theme={{
        token: {
          colorPrimary: "#5dba2f",
          colorError: "#fc4447",
          colorWarning: "#fc9a3a",
          colorText: "#262626",
          colorTextDescription: "#5B6D7F",
          colorTextPlaceholder: "#8E9BA7",
          colorTextHeading: "#5B6D7F",
          colorBgWarning: "#FFF5EB",
          colorTextSuccess: "#32A35E",
          colorBgSuccess: "#ECFAF1",
          colorBgError: "#FFECED",
          colorTextError: "#FC4447",
          colorPurple: "#8781F7",
          colorBgPurple: "#F3F2FE",
          colorBlue: "#4889C5",
          colorBgBlue: "#EDF5FB",
          colorBorder: "#E7E9EC",
          borderRadius: "8px",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default AntdConfigProvider;
