import { SVGProps } from "@repo/types";

export default function CategoryIcon({ margin, ...props }: SVGProps) {
  return (
    <svg
      {...props}
      width="18"
      height="14"
      style={{ margin }}
      viewBox="0 0 18 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.5 7.0013L6.5 7.0013M16.5 2.0013L6.5 2.0013M16.5 12.0013L6.5 12.0013M3.16667 7.0013C3.16667 7.46154 2.79357 7.83464 2.33333 7.83464C1.8731 7.83464 1.5 7.46154 1.5 7.0013C1.5 6.54106 1.8731 6.16797 2.33333 6.16797C2.79357 6.16797 3.16667 6.54106 3.16667 7.0013ZM3.16667 2.0013C3.16667 2.46154 2.79357 2.83464 2.33333 2.83464C1.8731 2.83464 1.5 2.46154 1.5 2.0013C1.5 1.54106 1.8731 1.16797 2.33333 1.16797C2.79357 1.16797 3.16667 1.54106 3.16667 2.0013ZM3.16667 12.0013C3.16667 12.4615 2.79357 12.8346 2.33333 12.8346C1.8731 12.8346 1.5 12.4615 1.5 12.0013C1.5 11.5411 1.8731 11.168 2.33333 11.168C2.79357 11.168 3.16667 11.5411 3.16667 12.0013Z"
        stroke="#5B6D7F"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
