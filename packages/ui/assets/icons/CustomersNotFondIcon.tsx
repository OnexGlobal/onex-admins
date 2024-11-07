import { FC } from "react";
import { SVGProps } from "@repo/types";

export const CustomersNotFondIcon: FC<SVGProps> = ({
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
      <g clipPath="url(#clip0_77_4283)">
        <path
          d="M28 29.0033H27.1133C26.18 29.0033 25.2933 29.365 24.64 30.0183L22.645 31.99C21.735 32.8883 20.2534 32.8883 19.3434 31.99L17.3483 30.0183C16.695 29.365 15.7967 29.0033 14.875 29.0033H14C12.0633 29.0033 10.5 27.4517 10.5 25.5384V12.81C10.5 10.8966 12.0633 9.34502 14 9.34502H28C29.9367 9.34502 31.5 10.8966 31.5 12.81V25.5384C31.5 27.44 29.9367 29.0033 28 29.0033Z"
          stroke="#3B5166"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M18.6 21.2C18.6 21.2 19.5 22.4 21 22.4C22.5 22.4 23.4 21.2 23.4 21.2M22.8 18.2H22.806M19.2 18.2H19.206M27 20C27 23.3137 24.3137 26 21 26C17.6863 26 15 23.3137 15 20C15 16.6863 17.6863 14 21 14C24.3137 14 27 16.6863 27 20ZM23.1 18.2C23.1 18.3657 22.9657 18.5 22.8 18.5C22.6343 18.5 22.5 18.3657 22.5 18.2C22.5 18.0343 22.6343 17.9 22.8 17.9C22.9657 17.9 23.1 18.0343 23.1 18.2ZM19.5 18.2C19.5 18.3657 19.3657 18.5 19.2 18.5C19.0343 18.5 18.9 18.3657 18.9 18.2C18.9 18.0343 19.0343 17.9 19.2 17.9C19.3657 17.9 19.5 18.0343 19.5 18.2Z"
          stroke="#3B5166"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_77_4283">
          <rect
            width="28"
            height="28"
            fill="white"
            transform="translate(7 7)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
