import { FC } from "react";
import { SVGProps } from "@repo/types";

export const WalletCircle: FC<SVGProps> = ({
  size = "24",
  color = "#3B5166",
  ...props
}) => (
  <svg width={size} height={size} viewBox="0 0 28 28" fill="none" {...props}>
    <path
      d="M2.91663 15.4465V13.4282C2.91663 11.0132 4.88829 9.0415 7.30329 9.0415H20.6966C23.1116 9.0415 25.0833 11.0132 25.0833 13.4282V15.1082H22.7266C22.0733 15.1082 21.4783 15.3648 21.0466 15.8082C20.5566 16.2865 20.2766 16.9748 20.3466 17.7098C20.4516 18.9698 21.6066 19.8915 22.8666 19.8915H25.0833V21.2798C25.0833 23.6948 23.1116 25.6665 20.6966 25.6665H14.3033"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2.91663 14.4783V9.14667C2.91663 7.75833 3.76829 6.52161 5.06329 6.03161L14.3266 2.53161C15.7733 1.98328 17.325 3.05665 17.325 4.60832V9.04163"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M26.3186 16.2986V18.702C26.3186 19.3437 25.8052 19.8686 25.1519 19.8919H22.8652C21.6052 19.8919 20.4502 18.9703 20.3452 17.7103C20.2752 16.9753 20.5552 16.2869 21.0452 15.8086C21.4769 15.3653 22.0719 15.1086 22.7252 15.1086H25.1519C25.8052 15.132 26.3186 15.6569 26.3186 16.2986Z"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8.16663 14H16.3333"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.5 19.25H9.73C10.4767 19.25 11.0833 19.8566 11.0833 20.6033V22.0967"
      stroke={color}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M4.92333 17.8267L3.5 19.25L4.92333 20.6733"
      stroke={color}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.0833 25.4099H4.85334C4.10667 25.4099 3.5 24.8032 3.5 24.0565V22.5632"
      stroke={color}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9.6615 26.8337L11.0848 25.4104L9.6615 23.9871"
      stroke={color}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);
