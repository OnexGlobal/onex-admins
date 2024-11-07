import { FC } from "react";
import { SVGProps } from "@repo/types";

export const PrimeUsersNotFondIcon: FC<SVGProps> = ({
  size = "42",
  margin,
  ...props
}) => {
  return (
    <svg
      {...props}
      width={size}
      height={size}
      style={{ margin }}
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="42" height="42" rx="21" fill="#E7E9EC" />
      <path
        d="M30.08 17.58V24.42C30.08 25.54 29.48 26.58 28.51 27.15L22.57 30.58C21.6 31.14 20.4 31.14 19.42 30.58L13.48 27.15C12.51 26.59 11.91 25.55 11.91 24.42V17.58C11.91 16.46 12.51 15.42 13.48 14.85L19.42 11.42C20.39 10.86 21.59 10.86 22.57 11.42L28.51 14.85C29.48 15.42 30.08 16.45 30.08 17.58Z"
        stroke="#3B5166"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21 20C22.2869 20 23.33 18.9568 23.33 17.67C23.33 16.3832 22.2869 15.34 21 15.34C19.7132 15.34 18.67 16.3832 18.67 17.67C18.67 18.9568 19.7132 20 21 20Z"
        stroke="#3B5166"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M25 25.2599C25 23.4599 23.21 22 21 22C18.79 22 17 23.4599 17 25.2599"
        stroke="#3B5166"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
