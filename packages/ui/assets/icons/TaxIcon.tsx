import { SVGProps } from "types";

export default function TaxIcon({ size = "20", margin, ...props }: SVGProps) {
  return (
    <svg
      {...props}
      width={size}
      height={size}
      style={{ margin }}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.5 10C2.5 5.85786 5.85786 2.5 10 2.5C14.1421 2.5 17.5 5.85786 17.5 10C17.5 14.1421 14.1421 17.5 10 17.5C5.85786 17.5 2.5 14.1421 2.5 10Z"
        stroke="#E53E41"
        strokeWidth="1.5"
      />
      <path
        d="M7.5 7.5L12.5 12.5M12.5 7.5L7.5 12.5"
        stroke="#E53E41"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}
