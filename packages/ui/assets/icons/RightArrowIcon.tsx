import { SVGProps } from "types";

export default function RightArrowIcon({
  size = "14",
  margin,
  color = "#3B5166",
}: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      style={{ margin }}
      viewBox="0 0 14 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M1.16675 7.00002H12.8334M12.8334 7.00002L7.00008 1.16669M12.8334 7.00002L7.00008 12.8334"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
