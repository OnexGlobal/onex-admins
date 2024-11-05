import { FC } from "react";
import { SVGProps } from "../../types";

export const ArmFlag: FC<SVGProps> = ({
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
      <g opacity={opacity} clipPath="url(#clip0_478_6541)">
        <path
          d="M21.3333 0H-1.33333C-2.80609 0 -4 1.19391 -4 2.66667V17.3333C-4 18.8061 -2.80609 20 -1.33333 20H21.3333C22.8061 20 24 18.8061 24 17.3333V2.66667C24 1.19391 22.8061 0 21.3333 0Z"
          fill="#1A47B8"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 13.332H28V19.9987H0V13.332Z"
          fill="#FFDA2C"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 0H28V6.66667H0V0Z"
          fill="#F93939"
        />
      </g>
      <defs>
        <clipPath id="clip0_478_6541">
          <rect width="20" height="20" rx="10" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
