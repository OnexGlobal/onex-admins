import { SVGProps } from "@repo/types";

export const Box = ({ margin, color, size = 40, ...props }: SVGProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 42 42"
    fill="none"
    style={{ margin }}
    {...props}
  >
    <rect width="42" height="42" rx="21" fill="#E7E9EC" />
    <path
      d="M12.1702 16.44L21.0002 21.55L29.7701 16.47"
      stroke="#5B6D7F"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21.0002 30.61V21.54"
      stroke="#5B6D7F"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18.9301 11.48L13.5901 14.45C12.3801 15.12 11.3901 16.8 11.3901 18.18V23.83C11.3901 25.21 12.3801 26.89 13.5901 27.56L18.9301 30.53C20.0701 31.16 21.9401 31.16 23.0801 30.53L28.4201 27.56C29.6301 26.89 30.6201 25.21 30.6201 23.83V18.18C30.6201 16.8 29.6301 15.12 28.4201 14.45L23.0801 11.48C21.9301 10.84 20.0701 10.84 18.9301 11.48Z"
      stroke="#5B6D7F"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M26 22.24V18.58L16.51 13.1"
      stroke="#5B6D7F"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
