import { FC, useState } from "react";
import { SVGProps } from "types";

export const EditIcon: FC<SVGProps> = ({
  size = "24",
  margin = "0",
  cursor = "pointer",
  ...props
}) => {
  const [color, setColor] = useState("#3B5166");
  return (
    <svg
      {...props}
      style={{ margin, cursor }}
      width={size}
      height={size}
      onMouseOver={() => setColor("#5dba2f")}
      onMouseOut={() => setColor("#3B5166")}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.39662 15.0963C2.43491 14.7517 2.45405 14.5794 2.50618 14.4184C2.55243 14.2755 2.61778 14.1396 2.70045 14.0142C2.79363 13.8729 2.91621 13.7503 3.16136 13.5052L14.1666 2.49992C15.0871 1.57945 16.5795 1.57945 17.4999 2.49993C18.4204 3.4204 18.4204 4.91279 17.4999 5.83326L6.49469 16.8385C6.24954 17.0836 6.12696 17.2062 5.98566 17.2994C5.86029 17.3821 5.72433 17.4474 5.58146 17.4937C5.42042 17.5458 5.24813 17.5649 4.90356 17.6032L2.08325 17.9166L2.39662 15.0963Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
