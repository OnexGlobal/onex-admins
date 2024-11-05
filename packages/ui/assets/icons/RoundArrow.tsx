export const RoundArrow = ({
  size = "20",
  color = "#3B5166",
  margin = "",
  active = false,
  ...props
}) => {
  return (
    <svg
      {...props}
      width={size}
      height={size}
      style={{
        margin,
        transform: active ? "rotate(0deg)" : "rotate(90deg)",
        transition: "all 0.3s",
      }}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.84074 18.0499C10.6209 18.7923 13.7102 18.073 15.8913 15.8919C19.1456 12.6375 19.1456 7.36116 15.8913 4.10679C12.6369 0.852424 7.36051 0.852423 4.10614 4.10679C1.92506 6.28787 1.20574 9.37717 1.94818 12.1573M12.4985 12.4994V7.49943M12.4985 7.49943H7.4985M12.4985 7.49943L4.16533 15.8327"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
