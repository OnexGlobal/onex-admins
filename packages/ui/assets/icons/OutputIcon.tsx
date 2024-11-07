import { SVGProps } from "@repo/types";

export default function OutputIcon({ size = 32, margin }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      style={{ margin }}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="16" cy="16" r="16" fill="#FFECED" />
      <path
        d="M11.001 21.2916L21.001 11.7083M21.001 11.7083H11.001M21.001 11.7083V21.2916"
        stroke="#FC4447"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
