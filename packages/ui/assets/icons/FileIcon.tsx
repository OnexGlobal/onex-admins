import { SVGProps } from "@repo/types";

export default function FileIcon({ size = "18", margin, ...props }: SVGProps) {
  return (
    <svg
      {...props}
      width={size}
      height={size}
      style={{ margin }}
      viewBox="0 0 18 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.6271 8.08291L9.1141 15.5959C7.40556 17.3045 4.63546 17.3045 2.92692 15.5959C1.21837 13.8874 1.21837 11.1173 2.92692 9.40874L10.4399 1.89573C11.579 0.756699 13.4257 0.756699 14.5647 1.89573C15.7037 3.03476 15.7037 4.88149 14.5647 6.02052L7.34633 13.2389C6.77682 13.8084 5.85345 13.8084 5.28394 13.2389C4.71442 12.6694 4.71442 11.746 5.28394 11.1765L11.6184 4.84201"
        stroke="#5B6D7F"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
