import { FC } from "react";
import { ButtonProps } from "@repo/types";
import { Button } from "antd";

const Primary: FC<ButtonProps> = ({ ...props }) => {
  return <Button color="primary" variant="outlined" type="dashed" {...props} />;
};

export default Primary;
