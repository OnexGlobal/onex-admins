import { FC } from "react";
import { SVGProps } from "types";

export const InfoCircleIcon: FC<SVGProps> = ({
  size = "24",
  margin,
  cursor,
  color = "#8E9BA7",
  ...props
}) => {
  return (
    <svg
      {...props}
      style={{ margin, cursor }}
      width={size}
      height={size}
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 16.5V12.5M12 8.5H12.01M22 12.5C22 18.0228 17.5228 22.5 12 22.5C6.47715 22.5 2 18.0228 2 12.5C2 6.97715 6.47715 2.5 12 2.5C17.5228 2.5 22 6.97715 22 12.5Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};