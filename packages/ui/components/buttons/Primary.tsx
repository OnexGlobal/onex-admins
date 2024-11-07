import { FC } from "react";
import { MainButtonProps } from "@repo/types";
import { Button } from "antd";

const Primary: FC<MainButtonProps> = ({ ...props }) => {
  return <Button color="primary" {...props} />;
};

export default Primary;
