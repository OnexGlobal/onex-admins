import { SVGProps } from "@repo/types";

export const BonusIcon = ({
  size = "24",
  color = "#3B5166",
  margin,
  ...props
}: SVGProps) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" {...props}>
    <path
      d="M10.1011 4C11.3636 2.76281 13.0928 2 15.0001 2C18.8661 2 22.0001 5.13401 22.0001 9C22.0001 10.9073 21.2372 12.6365 20 13.899"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 22C12.866 22 16 18.866 16 15C16 11.134 12.866 8 9 8C5.13401 8 2 11.134 2 15C2 18.866 5.13401 22 9 22Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
