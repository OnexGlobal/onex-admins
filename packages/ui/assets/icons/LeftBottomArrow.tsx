import { SVGProps } from "@repo/types";

export default function LeftBottomArrowIcon({
  size = "10",
  color = "#FC4447",
  ...props
}: SVGProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none" {...props}>
      <path
        d="M9 1L1 9M1 9V3.66667M1 9H6.33333"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
