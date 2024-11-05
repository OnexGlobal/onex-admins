import { FC } from "react";
import { SVGProps } from "../../types";

export const WarningCircleIcon: FC<SVGProps> = ({ size = "43", ...props }) => {
  return (
    <svg
      {...props}
      width={size}
      height={size}
      viewBox="0 0 43 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.5" width="42" height="42" rx="21" fill="#FFF5EB" />
      <path
        d="M21.5 30C26.4706 30 30.5 25.9706 30.5 21C30.5 16.0294 26.4706 12 21.5 12C16.5294 12 12.5 16.0294 12.5 21C12.5 25.9706 16.5294 30 21.5 30Z"
        stroke="#E58C35"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.5 17V21M21.5 25H21.51"
        stroke="#E58C35"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
