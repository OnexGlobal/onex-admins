import { SVGProps } from "types";

export default function ShowLessIcon({
  size = "11",
  margin,
  rotate,
  ...props
}: SVGProps) {
  return (
    <svg
      {...props}
      width={size}
      height={size}
      style={{ margin, rotate, transition: "rotate 0.3s" }}
      viewBox="0 0 11 11"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M9.33203 5.16797L5.16536 1.0013L0.998698 5.16797"
        stroke="#5B6D7F"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.33203 10.168L5.16536 6.0013L0.998698 10.168"
        stroke="#8E9BA7"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
