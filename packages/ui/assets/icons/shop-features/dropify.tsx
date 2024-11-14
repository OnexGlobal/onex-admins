export const Dropify = ({ size = "24", ...props }) => {
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
        d="M4 22V6M16 22V18M10 22V12"
        stroke="#3B5166"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M20 10L14.5657 4.56569C14.3677 4.36768 14.2687 4.26867 14.1545 4.23158C14.0541 4.19895 13.9459 4.19895 13.8455 4.23158C13.7313 4.26867 13.6323 4.36768 13.4343 4.56569L11.5657 6.43431C11.3677 6.63232 11.2687 6.73133 11.1545 6.76842C11.0541 6.80105 10.9459 6.80105 10.8455 6.76842C10.7313 6.73133 10.6323 6.63232 10.4343 6.43431L6 2M20 10H16M20 10V6"
        stroke="#3B5166"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
