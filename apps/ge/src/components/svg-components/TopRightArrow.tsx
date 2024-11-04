import { SVGProps } from "../../types";

export default function TopRightArrowIcon({
  size = "10",
  color = "#5DBA2F",
  ...props
}: SVGProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 10 10" fill="none" {...props}>
      <path
        d="M1 9L9 1M9 1V6.33333M9 1H3.66667"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
