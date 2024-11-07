import React, { FC } from "react";
import { SVGProps } from "@repo/types";

export const CloseCircleIcon: FC<SVGProps> = ({
  margin,
  cursor,
  size = "24",
  ...props
}) => {
  return (
    <svg
      {...props}
      width={size}
      height={size}
      style={{
        margin,
        cursor,
      }}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M15 9.60382L9 15.6038M9 9.60382L15 15.6038M22 12.6038C22 18.1267 17.5228 22.6038 12 22.6038C6.47715 22.6038 2 18.1267 2 12.6038C2 7.08097 6.47715 2.60382 12 2.60382C17.5228 2.60382 22 7.08097 22 12.6038Z"
        stroke="#FC4447"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
