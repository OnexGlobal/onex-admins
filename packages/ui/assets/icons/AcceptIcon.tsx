import { SVGProps } from "@repo/types";

export default function AcceptIcon({
  size = "36",
  margin,
  ...props
}: SVGProps) {
  return (
    <svg
      {...props}
      width={size}
      height={size}
      style={{ margin }}
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="36" height="36" rx="8" fill="#EFF8EA" />
      <path
        d="M24.6668 13L15.5002 22.1667L11.3335 18"
        stroke="#5DBA2F"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
