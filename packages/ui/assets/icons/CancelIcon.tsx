import { SVGProps } from "types";

export default function CancelIcon({
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
      <rect width="36" height="36" rx="8" fill="#FFECED" />
      <path
        d="M24 12L12 24M12 12L24 24"
        stroke="#FC4447"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
