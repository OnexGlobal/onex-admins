import { FC, useMemo } from "react";
import { ButtonProps } from "@repo/types";
import { Button } from "antd";

const Primary: FC<ButtonProps> = ({ type }) => {
  return (
    <Button color="danger" variant="outlined" type="dashed">
      asdasdasdasd
    </Button>
  );
};

export default Primary;
