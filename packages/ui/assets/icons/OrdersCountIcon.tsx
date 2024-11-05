import { SVGProps } from "../../types";

export default function OrdersCountIcon({ size = "24", margin }: SVGProps) {
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
        d="M1.60889 7L10.4389 12.11L19.2089 7.02997"
        stroke="#8E9BA7"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.439 21.17V12.1"
        stroke="#8E9BA7"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20.2195 12V9.17C20.2195 7.79 19.2295 6.11002 18.0195 5.44002L12.6795 2.48C11.5395 1.84 9.67949 1.84 8.53949 2.48L3.19949 5.44002C1.98949 6.11002 0.999512 7.79 0.999512 9.17V14.83C0.999512 16.21 1.98949 17.89 3.19949 18.56L8.53949 21.52C9.67949 22.16 11.5395 22.16 12.6795 21.52L14.5095 20.51"
        stroke="#8E9BA7"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.437 16.6635L18.6091 18.5625L22.437 14.5625"
        stroke="#8E9BA7"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
