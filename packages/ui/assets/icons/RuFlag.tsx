import { FC } from "react";
import { SVGProps } from "@repo/types";

export const RuFlag: FC<SVGProps> = ({
  size = "24",
  opacity = "1",
  ...props
}) => {
  return (
    <svg
      {...props}
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity={opacity} clipPath="url(#clip0_478_6538)">
        <rect width="20" height="20" rx="10" fill="#1A47B8" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M-2.66669 13.332H25.3333V19.9987H-2.66669V13.332Z"
          fill="#F93939"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M-2.66669 0H25.3333V6.66667H-2.66669V0Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_478_6538">
          <rect width="20" height="20" rx="10" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
