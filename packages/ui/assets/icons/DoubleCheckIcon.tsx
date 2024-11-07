import { SVGProps } from "@repo/types";

export default function DoubleCheckIcon({
  size = "20",
  margin,
  ...props
}: SVGProps) {
  return (
    <svg
      {...props}
      width={size}
      height={size}
      style={{ margin }}
      viewBox="0 0 21 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="vuesax/linear/task-square">
        <g id="vuesax/linear/task-square_2">
          <g id="task-square">
            <path
              id="Vector"
              d="M10.7168 7.67114H14.637"
              stroke="#292D32"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              id="Vector_2"
              d="M6.24512 7.6711L6.80515 8.23113L8.48526 6.55103"
              stroke="#292D32"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              id="Vector_3"
              d="M10.7168 12.8955H14.637"
              stroke="#292D32"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              id="Vector_4"
              d="M6.24512 12.8974L6.80515 13.4574L8.48526 11.7773"
              stroke="#292D32"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              id="Vector_5"
              d="M8.20063 17.4655H12.6809C16.4145 17.4655 17.9079 15.9721 17.9079 12.2385V7.75824C17.9079 4.02468 16.4145 2.53125 12.6809 2.53125H8.20063C4.46706 2.53125 2.97363 4.02468 2.97363 7.75824V12.2385C2.97363 15.9721 4.46706 17.4655 8.20063 17.4655Z"
              stroke="#292D32"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>
      </g>
    </svg>
  );
}
