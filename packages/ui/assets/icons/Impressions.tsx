import { FC } from "react";
import { SVGProps } from "../../types";

export const Impressions: FC<SVGProps> = ({ size = "42", ...props }) => {
  return (
    <svg
      {...props}
      width={size}
      height={size}
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="42" height="42" rx="21" fill="#EDF5FB" />
      <path
        d="M30.187 24.8906C29.5508 26.395 28.5557 27.7208 27.2888 28.7519C26.0219 29.7829 24.5217 30.488 22.9194 30.8053C21.3171 31.1227 19.6614 31.0427 18.0971 30.5724C16.5328 30.102 15.1076 29.2556 13.946 28.1072C12.7844 26.9588 11.9218 25.5433 11.4336 23.9845C10.9454 22.4257 10.8465 20.771 11.1456 19.1652C11.4446 17.5593 12.1325 16.0512 13.149 14.7726C14.1656 13.494 15.4798 12.4839 16.977 11.8306M30.2158 17.1737C30.6161 18.1402 30.8616 19.1619 30.945 20.2014C30.9656 20.4582 30.9759 20.5866 30.9249 20.7023C30.8823 20.7989 30.7979 20.8903 30.705 20.9405C30.5938 21.0006 30.4548 21.0006 30.177 21.0006H21.777C21.4969 21.0006 21.3569 21.0006 21.25 20.9461C21.1559 20.8981 21.0794 20.8216 21.0315 20.7276C20.977 20.6206 20.977 20.4806 20.977 20.2006V11.8006C20.977 11.5227 20.977 11.3838 21.037 11.2725C21.0872 11.1796 21.1786 11.0952 21.2753 11.0527C21.3909 11.0017 21.5193 11.012 21.7761 11.0325C22.8156 11.1159 23.8373 11.3614 24.8038 11.7618C26.0171 12.2643 27.1194 13.0009 28.048 13.9295C28.9766 14.8581 29.7132 15.9605 30.2158 17.1737Z"
        stroke="#4F96D9"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};