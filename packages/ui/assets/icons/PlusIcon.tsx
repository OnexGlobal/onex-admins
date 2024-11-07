import { FC } from "react";
import { SVGProps } from "@repo/types";

export const PlusIcon: FC<SVGProps> = ({
  size = "24",
  color = "#8E9BA7",
  margin,
  ...props
}) => {
  return (
    <svg
      {...props}
      width={size}
      height={size}
      style={{ margin }}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 5V19M5 12H19"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
