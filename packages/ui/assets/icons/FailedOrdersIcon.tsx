import { FC } from "react";
import { SVGProps } from "@repo/types";

export const FailedOrdersIcon: FC<SVGProps> = ({
  size = "24",
  color = "#3B5166",
  margin,
}) => {
  return (
    <svg
      width={size}
      height={size}
      style={{ margin }}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.70117 9.26001L12.0012 12.33L17.2612 9.28001"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.002 17.7701V12.3201"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.7603 6.2901L7.56024 8.0701C6.84024 8.4701 6.24023 9.4801 6.24023 10.3101V13.7001C6.24023 14.5301 6.83024 15.5401 7.56024 15.9401L10.7603 17.7201C11.4403 18.1001 12.5602 18.1001 13.2502 17.7201L16.4503 15.9401C17.1703 15.5401 17.7702 14.5301 17.7702 13.7001V10.3001C17.7702 9.4701 17.1803 8.4601 16.4503 8.0601L13.2502 6.2801C12.5602 5.9001 11.4403 5.9001 10.7603 6.2901Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M22 15C22 18.87 18.87 22 15 22L16.05 20.25"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2 9C2 5.13 5.13 2 9 2L7.95001 3.75"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
