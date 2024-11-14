export const OneClick = ({ size = "24", ...props }) => {
  return (
    <svg
      {...props}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12.5 15.6766H5.23074C3.43075 15.6766 2 14.1074 2 12.1332C2 10.1591 3.43075 8.58984 5.23074 8.58984H12.5"
        stroke="#3B5166"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        cx="16.6151"
        cy="12.0514"
        r="5.38462"
        stroke="#3B5166"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
