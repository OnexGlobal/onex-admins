import { FC } from "react";
import { SVGProps } from "../../types";

export const FlagAndAir: FC<SVGProps> = ({ height = "40", width = "88" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 88 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_20_6934)">
        <rect width="40" height="40" rx="20" fill="white" />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 0H24V18.6667H0V0Z"
          fill="#1A47B8"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M24 0V2.66667H56V0H24ZM24 5.33333V8H56V5.33333H24ZM24 10.6667V13.3333H56V10.6667H24ZM24 16V18.6667H56V16H24ZM0 21.3333V24H56V21.3333H0ZM0 26.6667V29.3333H56V26.6667H0ZM0 32V34.6667H56V32H0ZM0 37.3333V40H56V37.3333H0Z"
          fill="#F93939"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2.66666 2.66666V5.33332H5.33332V2.66666H2.66666ZM7.99999 2.66666V5.33332H10.6667V2.66666H7.99999ZM13.3333 2.66666V5.33332H16V2.66666H13.3333ZM18.6667 2.66666V5.33332H21.3333V2.66666H18.6667ZM16 5.33332V7.99999H18.6667V5.33332H16ZM10.6667 5.33332V7.99999H13.3333V5.33332H10.6667ZM5.33332 5.33332V7.99999H7.99999V5.33332H5.33332ZM2.66666 7.99999V10.6667H5.33332V7.99999H2.66666ZM7.99999 7.99999V10.6667H10.6667V7.99999H7.99999ZM13.3333 7.99999V10.6667H16V7.99999H13.3333ZM18.6667 7.99999V10.6667H21.3333V7.99999H18.6667ZM2.66666 13.3333V16H5.33332V13.3333H2.66666ZM7.99999 13.3333V16H10.6667V13.3333H7.99999ZM13.3333 13.3333V16H16V13.3333H13.3333ZM18.6667 13.3333V16H21.3333V13.3333H18.6667ZM16 10.6667V13.3333H18.6667V10.6667H16ZM10.6667 10.6667V13.3333H13.3333V10.6667H10.6667ZM5.33332 10.6667V13.3333H7.99999V10.6667H5.33332Z"
          fill="white"
        />
      </g>
      <path
        d="M53.0268 21.4272C52.6989 21.3616 52.3599 21.4642 52.1234 21.7007L50.7114 23.1126C50.2112 23.6129 50.3743 24.4602 51.0246 24.7389L59.2216 28.2519C59.4576 28.353 59.6456 28.541 59.7468 28.777L63.2617 36.9763C63.5404 37.6265 64.3877 37.7896 64.8879 37.2894L66.3001 35.8771C66.5365 35.6407 66.6391 35.3018 66.5736 34.974L65.366 28.9342C65.3004 28.6063 65.4031 28.2674 65.6395 28.031L70.8954 22.7751C71.3857 22.2848 72.2139 22.4301 72.5081 23.0579L78.5362 35.9223C78.8303 36.5501 79.6586 36.6953 80.1488 36.2051L81.4829 34.871C81.6993 34.6546 81.8047 34.3511 81.7689 34.0471L79.4962 14.7139C79.4605 14.4101 79.5659 14.1066 79.7822 13.8902L85.1095 8.56098C85.4925 8.19109 85.798 7.74863 86.0081 7.25942C86.2183 6.77021 86.3289 6.24404 86.3335 5.71162C86.3381 5.17921 86.2367 4.6512 86.0351 4.15841C85.8334 3.66562 85.5357 3.21792 85.1592 2.84143C84.7827 2.46494 84.335 2.1672 83.8422 1.96559C83.3495 1.76397 82.8214 1.66252 82.289 1.66714C81.7566 1.67177 81.2304 1.78239 80.7412 1.99253C80.252 2.20268 79.8096 2.50816 79.4397 2.89113L73.9621 8.36868C73.7457 8.58508 73.4421 8.69048 73.1382 8.65472L53.8054 6.38017C53.5014 6.34439 53.1976 6.4499 52.9812 6.66649L51.7847 7.86391C51.2976 8.3514 51.4381 9.17394 52.0593 9.47222L58.4504 12.5407L64.841 15.6089C65.4624 15.9073 65.6027 16.7301 65.1153 17.2175L59.9698 22.3631C59.7333 22.5995 59.3942 22.7022 59.0663 22.6365L53.0268 21.4272Z"
        stroke="#5B6D7F"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <defs>
        <clipPath id="clip0_20_6934">
          <rect width="40" height="40" rx="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};