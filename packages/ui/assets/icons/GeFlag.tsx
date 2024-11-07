import { FC } from "react";
import { SVGProps } from "@repo/types";

export const GeFlag: FC<SVGProps> = ({
  size = "24",
  opacity = "1",
  ...props
}) => {
  return (
    <svg
      {...props}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity={opacity}>
        <g clipPath="url(#clip0_330_334)">
          <rect width="24" height="24" rx="12" fill="white" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.60001 14.4H-4.79999V9.6H9.60001V0H14.4V9.6H28.8V14.4H14.4V24H9.60001V14.4Z"
            fill="#F93939"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M19.2 17.6002H17.6V19.2002H19.2V20.8002H20.8V19.2002H22.4V17.6002H20.8V16.0002H19.2V17.6002ZM19.2 4.8002H17.6V6.4002H19.2V8.0002H20.8V6.4002H22.4V4.8002H20.8V3.2002H19.2V4.8002ZM3.19998 4.8002H1.59998V6.4002H3.19998V8.0002H4.79998V6.4002H6.39998V4.8002H4.79998V3.2002H3.19998V4.8002ZM3.19998 17.6002H1.59998V19.2002H3.19998V20.8002H4.79998V19.2002H6.39998V17.6002H4.79998V16.0002H3.19998V17.6002Z"
            fill="#F93939"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_330_334">
          <rect width="24" height="24" rx="12" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
