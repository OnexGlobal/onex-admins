import { Spin } from "antd";
export const Loading = () => {
  return (
    <div className="flex items-center justify-center w-full h-[100dvh]">
      <Spin size="large" />
    </div>
  );
};
