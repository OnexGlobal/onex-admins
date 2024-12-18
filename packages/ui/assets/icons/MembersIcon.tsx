import { FC } from "react";
import { SVGProps } from "@repo/types";

export const MembersIcon: FC<SVGProps> = ({
  size = "24",
  color = "#5B6D7F",
  margin,
  ...props
}) => {
  return (
    <svg
      {...props}
      width={size}
      height={size}
      style={{ margin }}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M10 12C12.7614 12 15 9.76142 15 7C15 4.23858 12.7614 2 10 2C7.23858 2 5 4.23858 5 7C5 9.76142 7.23858 12 10 12Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1 22C1 18.13 4.85 15 9.59 15C10.55 15 11.48 15.13 12.35 15.37"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.3125 15.8889V14.0556C21.3125 12.368 20.0533 11 18.5 11C16.9467 11 15.6875 12.368 15.6875 14.0556V15.8889M16.7 22H20.3C21.2451 22 21.7176 22 22.0786 21.8002C22.3961 21.6244 22.6543 21.3439 22.8161 20.999C23 20.6068 23 20.0934 23 19.0667V18.8222C23 17.7955 23 17.2821 22.8161 16.8899C22.6543 16.5449 22.3961 16.2645 22.0786 16.0887C21.7176 15.8889 21.2451 15.8889 20.3 15.8889H16.7C15.7549 15.8889 15.2824 15.8889 14.9214 16.0887C14.6039 16.2645 14.3457 16.5449 14.1839 16.8899C14 17.2821 14 17.7955 14 18.8222V19.0667C14 20.0934 14 20.6068 14.1839 20.999C14.3457 21.3439 14.6039 21.6244 14.9214 21.8002C15.2824 22 15.7549 22 16.7 22Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
