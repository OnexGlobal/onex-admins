export const RefundedIcon = ({
  size = "20",
  cursor = "pointer",
  margin = "",
  ...props
}) => {
  return (
    <svg
      {...props}
      style={{ cursor, margin }}
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19.1668 10C19.1668 15.06 15.0602 19.1667 10.0002 19.1667C4.94016 19.1667 1.851 14.07 1.851 14.07M1.851 14.07H5.00146M1.851 14.07V17.5M0.833496 10C0.833496 4.94001 4.9035 0.833344 10.0002 0.833344C16.1143 0.833344 19.1668 5.93001 19.1668 5.93001M19.1668 5.93001V2.08334M19.1668 5.93001H16.2502"
        stroke="#5B6D7F"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.55566 11.9416C7.55566 13.0166 8.38067 13.8832 9.40567 13.8832H11.4973C12.389 13.8832 13.114 13.1249 13.114 12.1916C13.114 11.1749 12.6723 10.8166 12.014 10.5832L8.65567 9.41655C7.99733 9.18322 7.55566 8.82489 7.55566 7.80822C7.55566 6.87488 8.28067 6.11655 9.17233 6.11655H11.264C12.289 6.11655 13.114 6.98321 13.114 8.05822"
        stroke="#5B6D7F"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.3291 5V15"
        stroke="#5B6D7F"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
