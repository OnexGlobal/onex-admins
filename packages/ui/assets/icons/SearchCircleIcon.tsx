import { FC } from "react";
import { SVGProps } from "@repo/types";

export const SearchCircleIcon: FC<SVGProps> = ({ size = "42", margin }) => {
  return (
    <svg
      width={size}
      height={size}
      style={{ margin }}
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="42" height="42" rx="21" fill="#E7E9EC" />
      <path
        d="M30 30L26.5001 26.5M29 20.5C29 25.1944 25.1944 29 20.5 29C15.8056 29 12 25.1944 12 20.5C12 15.8056 15.8056 12 20.5 12C25.1944 12 29 15.8056 29 20.5Z"
        stroke="#3B5166"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
