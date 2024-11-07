import { FC } from "react";
import { SVGProps } from "@repo/types";

export const UsaFlag: FC<SVGProps> = ({
  size = "24",
  opacity = "1",
  margin,
  ...props
}) => {
  return (
    <svg
      {...props}
      width={size}
      height={size}
      style={{ margin }}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_330_298)" opacity={opacity}>
        <rect width="24" height="24" rx="12" fill="white" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 0H14.4V11.2H0V0Z"
          fill="#1A47B8"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.4 0V1.6H33.6V0H14.4ZM14.4 3.2V4.8H33.6V3.2H14.4ZM14.4 6.4V8H33.6V6.4H14.4ZM14.4 9.6V11.2H33.6V9.6H14.4ZM0 12.8V14.4H33.6V12.8H0ZM0 16V17.6H33.6V16H0ZM0 19.2V20.8H33.6V19.2H0ZM0 22.4V24H33.6V22.4H0Z"
          fill="#F93939"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M1.59998 1.59961V3.19961H3.19998V1.59961H1.59998ZM4.79998 1.59961V3.19961H6.39998V1.59961H4.79998ZM7.99998 1.59961V3.19961H9.59998V1.59961H7.99998ZM11.2 1.59961V3.19961H12.8V1.59961H11.2ZM9.59998 3.19961V4.79961H11.2V3.19961H9.59998ZM6.39998 3.19961V4.79961H7.99998V3.19961H6.39998ZM3.19998 3.19961V4.79961H4.79998V3.19961H3.19998ZM1.59998 4.79961V6.39961H3.19998V4.79961H1.59998ZM4.79998 4.79961V6.39961H6.39998V4.79961H4.79998ZM7.99998 4.79961V6.39961H9.59998V4.79961H7.99998ZM11.2 4.79961V6.39961H12.8V4.79961H11.2ZM1.59998 7.99961V9.59961H3.19998V7.99961H1.59998ZM4.79998 7.99961V9.59961H6.39998V7.99961H4.79998ZM7.99998 7.99961V9.59961H9.59998V7.99961H7.99998ZM11.2 7.99961V9.59961H12.8V7.99961H11.2ZM9.59998 6.39961V7.99961H11.2V6.39961H9.59998ZM6.39998 6.39961V7.99961H7.99998V6.39961H6.39998ZM3.19998 6.39961V7.99961H4.79998V6.39961H3.19998Z"
          fill="white"
        />
      </g>
      <defs>
        <clipPath id="clip0_330_298">
          <rect width="24" height="24" rx="12" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
