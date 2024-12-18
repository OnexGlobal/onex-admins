import { Skeleton } from "antd";

export const Loader = ({ width = "100%", height = "100%", ...props }) => {
  return (
    <div
      className={`w-[${width}] h-[${height}] flex justify-center`}
      {...props}
    >
      <Skeleton active />
    </div>
  );
};
