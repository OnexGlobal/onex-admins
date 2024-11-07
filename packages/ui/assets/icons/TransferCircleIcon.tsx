import { FC } from "react";
import { SVGProps } from "@repo/types";

export const TransferCircleIcon: FC<SVGProps> = ({ size = "43", ...props }) => {
  return (
    <svg
      {...props}
      width={size}
      height={size}
      viewBox="0 0 43 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.501465" width="42" height="42" rx="21" fill="#EDF5FB" />
      <path
        d="M34.3349 21.0001C34.3349 28.0841 28.5855 33.8334 21.5015 33.8334C14.4175 33.8334 10.0927 26.6981 10.0927 26.6981M10.0927 26.6981H14.5034M10.0927 26.6981V31.5001M8.66821 21.0001C8.66821 13.9161 14.3662 8.16675 21.5015 8.16675C30.0614 8.16675 34.3349 15.3021 34.3349 15.3021M34.3349 15.3021V9.91675M34.3349 15.3021H30.2515"
        stroke="#5B6D7F"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.0796 23.7182C18.0796 25.2233 19.2346 26.4366 20.6696 26.4366H23.5979C24.8463 26.4366 25.8613 25.3749 25.8613 24.0682C25.8613 22.6449 25.2429 22.1432 24.3213 21.8166L19.6196 20.1832C18.6979 19.8566 18.0796 19.3549 18.0796 17.9316C18.0796 16.6249 19.0946 15.5632 20.3429 15.5632H23.2713C24.7063 15.5632 25.8613 16.7766 25.8613 18.2816"
        stroke="#5B6D7F"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.9624 14V28"
        stroke="#5B6D7F"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
