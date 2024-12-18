import { SVGProps } from "@repo/types";

export default function UserIcon({ size = "42", margin }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      style={{ margin }}
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="21" cy="21" r="21" fill="#F5F5F5" />
      <circle
        cx="21.0026"
        cy="15.1667"
        r="4.66667"
        stroke="#3B5166"
        strokeWidth="1.5"
      />
      <path
        d="M25.6634 31.1667H16.33C13.7527 31.1667 11.4769 28.9052 12.8204 26.7057C14.1342 24.5552 16.6768 23 20.9967 23C25.3167 23 27.8593 24.5552 29.173 26.7057C30.5165 28.9052 28.2407 31.1667 25.6634 31.1667Z"
        stroke="#3B5166"
        strokeWidth="1.5"
      />
    </svg>
  );
}
