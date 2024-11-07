import { SVGProps } from "@repo/types";

export default function ShipIcon({ size = "24", margin, ...props }: SVGProps) {
  return (
    <svg
      {...props}
      width={size}
      height={size}
      style={{ margin }}
      viewBox="0 0 22 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.8398 12.3882C20.7533 12.7556 21.3202 13.8371 21.1102 14.7926L20.6798 16.7456C19.9343 20.1056 17.2988 22.4995 13.4978 22.4995H8.49986C4.6989 22.4995 2.06344 20.1056 1.31795 16.7456L0.887445 14.7926C0.677447 13.8371 1.24443 12.7556 2.15792 12.3882L3.64893 11.7897L9.43437 9.46921C10.4424 9.07022 11.5554 9.07022 12.5633 9.46921L18.3488 11.7897L19.8398 12.3882Z"
        stroke="#5B6D7F"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 22.3509L11 9.30103"
        stroke="#5B6D7F"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.349 7.79993V11.7899L12.5636 9.46941C11.5556 9.07042 10.4426 9.07042 9.43461 9.46941L3.64917 11.7899V7.79993C3.64917 6.06745 5.06665 4.64996 6.79914 4.64996H15.199C16.9315 4.64996 18.349 6.06745 18.349 7.79993Z"
        stroke="#5B6D7F"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.6241 4.64997H8.37415V2.54999C8.37415 1.97249 8.84664 1.5 9.42413 1.5H12.5741C13.1516 1.5 13.6241 1.97249 13.6241 2.54999V4.64997Z"
        stroke="#5B6D7F"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
