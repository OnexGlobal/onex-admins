import { FC } from "react";
import { SVGProps } from "@repo/types";

export const PreviewQuestionIcon: FC<SVGProps> = ({
  size = "42",
  margin,
  cursor,
  ...props
}) => {
  return (
    <svg
      {...props}
      style={{ margin, cursor }}
      width={size}
      height={size}
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="42" height="42" rx="21" fill="#E7E9EC" />
      <g clipPath="url(#clip0_410_1973)">
        <path
          d="M25.6663 9.33398H16.333C11.6663 9.33398 9.33301 11.6673 9.33301 16.334V31.5007C9.33301 32.1423 9.85801 32.6673 10.4997 32.6673H25.6663C30.333 32.6673 32.6663 30.334 32.6663 25.6673V16.334C32.6663 11.6673 30.333 9.33398 25.6663 9.33398Z"
          stroke="#3B5166"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M22.0613 16.1459L16.0063 22.2009C15.7729 22.4342 15.5513 22.8892 15.5046 23.2159L15.1779 25.5259C15.0613 26.3659 15.6446 26.9492 16.4846 26.8325L18.7946 26.5059C19.1212 26.4592 19.5763 26.2375 19.8096 26.0042L25.8646 19.9492C26.9029 18.9109 27.4046 17.6975 25.8646 16.1575C24.3246 14.6059 23.1113 15.0959 22.0613 16.1459Z"
          stroke="#3B5166"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M21.1982 17.0098C21.7116 18.8414 23.1466 20.2881 24.9899 20.8014"
          stroke="#3B5166"
          strokeWidth="1.5"
          strokeMiterlimit="10"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_410_1973">
          <rect
            width="28"
            height="28"
            fill="white"
            transform="translate(7 7)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};
