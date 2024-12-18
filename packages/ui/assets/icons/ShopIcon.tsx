import { SVGProps } from "@repo/types";

export default function ShopIcon({ size = "20", margin, ...props }: SVGProps) {
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
        d="M2.5083 9.35001V13.0917C2.5083 16.8333 4.0083 18.3333 7.74997 18.3333H12.2416C15.9833 18.3333 17.4833 16.8333 17.4833 13.0917V9.35001"
        stroke="#5B6D7F"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.0002 9.99999C11.5252 9.99999 12.6502 8.75832 12.5002 7.23332L11.9502 1.66666H8.05857L7.50024 7.23332C7.35024 8.75832 8.47524 9.99999 10.0002 9.99999Z"
        stroke="#5B6D7F"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.2582 9.99999C16.9415 9.99999 18.1748 8.63332 18.0082 6.95832L17.7748 4.66666C17.4748 2.49999 16.6415 1.66666 14.4582 1.66666H11.9165L12.4998 7.50832C12.6415 8.88332 13.8832 9.99999 15.2582 9.99999Z"
        stroke="#5B6D7F"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.70015 9.99999C6.07515 9.99999 7.31681 8.88332 7.45015 7.50832L7.63348 5.66666L8.03348 1.66666H5.49181C3.30848 1.66666 2.47515 2.49999 2.17515 4.66666L1.95015 6.95832C1.78348 8.63332 3.01681 9.99999 4.70015 9.99999Z"
        stroke="#5B6D7F"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.99984 14.1667C8.60817 14.1667 7.9165 14.8583 7.9165 16.25V18.3333H12.0832V16.25C12.0832 14.8583 11.3915 14.1667 9.99984 14.1667Z"
        stroke="#5B6D7F"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
