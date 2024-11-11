export const RefundedCircleIcon = ({
  size = "43",
  cursor = "pointer",
  margin = "",
  ...props
}) => {
  return (
    <svg
      {...props}
      width={size}
      height={size}
      style={{ cursor, margin }}
      viewBox="0 0 43 42"
      fill="none"
    >
      <rect x="0.501465" width="42" height="42" rx="21" fill="#EDF5FB" />
      <path
        d="M34.3346 21C34.3346 28.084 28.5853 33.8333 21.5013 33.8333C14.4173 33.8333 10.0925 26.698 10.0925 26.698M10.0925 26.698H14.5031M10.0925 26.698V31.5M8.66797 21C8.66797 13.916 14.366 8.16666 21.5013 8.16666C30.0611 8.16666 34.3346 15.302 34.3346 15.302M34.3346 15.302V9.91666M34.3346 15.302H30.2513"
        stroke="#5B6D7F"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.0796 23.7182C18.0796 25.2232 19.2346 26.4365 20.6696 26.4365H23.5979C24.8463 26.4365 25.8613 25.3748 25.8613 24.0682C25.8613 22.6448 25.2429 22.1432 24.3213 21.8165L19.6196 20.1832C18.6979 19.8565 18.0796 19.3548 18.0796 17.9315C18.0796 16.6248 19.0946 15.5632 20.3429 15.5632H23.2713C24.7063 15.5632 25.8613 16.7765 25.8613 18.2815"
        stroke="#5B6D7F"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M21.9624 14V28"
        stroke="#5B6D7F"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
