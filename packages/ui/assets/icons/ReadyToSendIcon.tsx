import { SVGProps } from "@repo/types";

export const ReadyToSendIcon = ({
  color = "#3B5166",
  size = "24",
  margin,
  ...props
}: SVGProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    style={{ margin }}
    {...props}
  >
    <path
      d="M23.0002 17.91C23.0202 18.66 22.8202 19.37 22.4602 19.98C22.2602 20.34 21.9902 20.67 21.6902 20.94C21.0002 21.58 20.0902 21.97 19.0802 22C17.6202 22.03 16.3302 21.28 15.6202 20.13C15.2402 19.54 15.0102 18.83 15.0002 18.08C14.9702 16.82 15.5302 15.68 16.4302 14.93C17.1102 14.37 17.9702 14.02 18.9102 14C21.1202 13.95 22.9502 15.7 23.0002 17.91Z"
      stroke={color}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17.4404 18.03L18.4504 18.99L20.5404 16.97"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.16992 7.44L11.9999 12.55L20.7699 7.46997"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 21.61V12.54"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M21.6101 9.17V14.83C21.6101 14.88 21.6101 14.92 21.6001 14.97C20.9001 14.36 20.0001 14 19.0001 14C18.0601 14 17.1901 14.33 16.5001 14.88C15.5801 15.61 15.0001 16.74 15.0001 18C15.0001 18.75 15.2101 19.46 15.5801 20.06C15.6701 20.22 15.7801 20.37 15.9001 20.51L14.0701 21.52C12.9301 22.16 11.0701 22.16 9.93011 21.52L4.59012 18.56C3.38012 17.89 2.39014 16.21 2.39014 14.83V9.17C2.39014 7.79 3.38012 6.11002 4.59012 5.44002L9.93011 2.48C11.0701 1.84 12.9301 1.84 14.0701 2.48L19.4101 5.44002C20.6201 6.11002 21.6101 7.79 21.6101 9.17Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
