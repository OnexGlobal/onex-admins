import { SVGProps } from "@repo/types";

export default function BackArrowIcon({
  size = "16",
  margin,
  ...props
}: SVGProps) {
  return (
    <svg
      {...props}
      width={size}
      height={size}
      style={{ margin }}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.4996 1.99884L1.4996 8.37384L7.4996 14.7488"
        stroke="#5B6D7F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.9996 1.99884L8.9996 8.37384L14.9996 14.7488"
        stroke="#8E9BA7"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
