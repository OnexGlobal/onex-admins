import { FC } from "react";
import { SVGProps } from "@repo/types";

export const PickupPointsCircleIcon: FC<SVGProps> = ({ size = "43" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 43 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.745117" width="42" height="42" rx="21" fill="#E7E9EC" />
      <path
        d="M15.0029 23.2864C13.1516 24.1031 12.0029 25.2412 12.0029 26.5C12.0029 28.9853 16.4801 31 22.0029 31C27.5258 31 32.0029 28.9853 32.0029 26.5C32.0029 25.2412 30.8543 24.1031 29.0029 23.2864M28.0029 17C28.0029 21.0637 23.5029 23 22.0029 26C20.5029 23 16.0029 21.0637 16.0029 17C16.0029 13.6863 18.6892 11 22.0029 11C25.3166 11 28.0029 13.6863 28.0029 17ZM23.0029 17C23.0029 17.5523 22.5552 18 22.0029 18C21.4506 18 21.0029 17.5523 21.0029 17C21.0029 16.4477 21.4506 16 22.0029 16C22.5552 16 23.0029 16.4477 23.0029 17Z"
        stroke="#3B5166"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
