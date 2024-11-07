import { SVGProps } from "@repo/types";

export default function PrimeIcon({ size = "20", margin, ...props }: SVGProps) {
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
      <rect width="20" height="20" rx="4" fill="#5DBA2F" />
      <path
        d="M9.92995 5.1H5.89795V14.9H7.71795V12.072H9.92995C12.5059 12.072 14.1019 10.742 14.1019 8.586C14.1019 6.416 12.5059 5.1 9.92995 5.1ZM9.84595 10.532H7.71795V6.64H9.84595C11.4419 6.64 12.2679 7.354 12.2679 8.586C12.2679 9.818 11.4419 10.532 9.84595 10.532Z"
        fill="white"
      />
    </svg>
  );
}
