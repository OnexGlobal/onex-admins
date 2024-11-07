import { FC } from "react";
import { SVGProps } from "@repo/types";

export const ReRefreshIcon: FC<SVGProps> = ({
  size = "16",
  margin,
  ...props
}) => {
  return (
    <svg
      {...props}
      width={size}
      height={size}
      style={{ margin }}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17 10C17 13.864 13.864 17 10 17C6.136 17 3.777 13.108 3.777 13.108M3.777 13.108H6.941M3.777 13.108V16.608M3 10C3 6.136 6.108 3 10 3C14.669 3 17 6.892 17 6.892M17 6.892V3.392M17 6.892H13.892"
        stroke="#5B6D7F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
