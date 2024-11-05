export default function DangerousIcon({ size = "20", margin = "", ...props }) {
  return (
    <svg
      {...props}
      width={size}
      height={size}
      style={{ margin }}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_6592_2946)">
        <path
          d="M10.0013 18.3346C14.6037 18.3346 18.3346 14.6037 18.3346 10.0013C18.3346 5.39893 14.6037 1.66797 10.0013 1.66797C5.39893 1.66797 1.66797 5.39893 1.66797 10.0013C1.66797 14.6037 5.39893 18.3346 10.0013 18.3346Z"
          stroke="#FC4447"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M7 7L13 13M13 7L7 13"
          stroke="#FC4447"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_6592_2946">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
