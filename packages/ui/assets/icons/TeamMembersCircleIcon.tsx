import { FC } from "react";
import { SVGProps } from "@repo/types";

export const TeamMembersCircleIcon: FC<SVGProps> = ({ size = "43" }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 43 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="0.745117" width="42" height="42" rx="21" fill="#E7E9EC" />
      <path
        d="M26.0029 12.4678C27.4846 13.2041 28.5029 14.7331 28.5029 16.5C28.5029 18.2669 27.4846 19.7959 26.0029 20.5322M28.0029 25.7664C29.5144 26.4503 30.8755 27.565 32.0029 29M12.0029 29C13.9494 26.5226 16.5921 25 19.5029 25C22.4137 25 25.0564 26.5226 27.0029 29M24.0029 16.5C24.0029 18.9853 21.9882 21 19.5029 21C17.0176 21 15.0029 18.9853 15.0029 16.5C15.0029 14.0147 17.0176 12 19.5029 12C21.9882 12 24.0029 14.0147 24.0029 16.5Z"
        stroke="#3B5166"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
