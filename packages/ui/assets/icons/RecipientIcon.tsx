import { SVGProps } from "@repo/types";

export default function RecipientIcon({ size = "42", margin }: SVGProps) {
  return (
    <svg
      width={size}
      height={size}
      style={{ margin }}
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="21" cy="21" r="21" fill="#FFF5EB" />
      <circle
        cx="19.5807"
        cy="14.6667"
        r="4.66667"
        stroke="#3B5166"
        strokeWidth="1.5"
      />
      <path
        d="M21.0781 30.6667H14.9082C12.3308 30.6667 10.055 28.4052 11.3986 26.2057C12.7123 24.0552 15.2549 22.5 19.5748 22.5C21.6835 22.5 22.5781 23 23.5781 23.5"
        stroke="#3B5166"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M27.0781 31.5V24.5M23.5781 28H30.5781"
        stroke="#3B5166"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
