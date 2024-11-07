import { SVGProps } from "@repo/types";

export default function InputIcon({ size = 32, margin }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      style={{ margin }}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="16" cy="16" r="16" fill="#EFF8EA" />
      <path
        d="M21.001 11.7084L11.001 21.2917M11.001 21.2917H21.001M11.001 21.2917V11.7084"
        stroke="#5DBA2F"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
