import { SVGProps } from "types";

export default function FlyIcon({ size = "24", margin, ...props }: SVGProps) {
  return (
    <svg
      {...props}
      width={size}
      height={size}
      style={{ margin }}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3.22586 12.8982C2.89794 12.8325 2.5589 12.9351 2.32242 13.1716L2.04442 13.4496C1.54417 13.9499 1.70735 14.7972 2.35761 15.0759L6.58573 16.8879C6.82171 16.9891 7.00976 17.1771 7.11091 17.4131L8.92406 21.6426C9.20279 22.2928 10.0501 22.4559 10.5503 21.9557L10.8285 21.6775C11.0649 21.441 11.1675 21.1021 11.102 20.7743L10.4614 17.5702C10.3958 17.2424 10.4984 16.9035 10.7348 16.6671L13.3339 14.068C13.8242 13.5777 14.6524 13.723 14.9465 14.3508L18.0796 21.0369C18.3738 21.6647 19.202 21.8099 19.6922 21.3197L19.9525 21.0594C20.1689 20.8431 20.2743 20.5395 20.2385 20.2356L18.9202 9.02062C18.8845 8.71676 18.9898 8.41327 19.2061 8.19689L22.2655 5.13639C22.4953 4.91446 22.6786 4.64898 22.8047 4.35545C22.9308 4.06193 22.9971 3.74623 22.9999 3.42678C23.0027 3.10733 22.9418 2.79052 22.8208 2.49485C22.6999 2.19918 22.5212 1.93056 22.2953 1.70466C22.0694 1.47877 21.8008 1.30013 21.5051 1.17916C21.2095 1.05819 20.8927 0.997315 20.5732 1.00009C20.2538 1.00287 19.9381 1.06924 19.6445 1.19533C19.351 1.32142 19.0855 1.5047 18.8636 1.73448L15.7142 4.88394C15.4977 5.10035 15.1942 5.20575 14.8902 5.16999L3.67568 3.85057C3.37159 3.81479 3.06787 3.9203 2.85145 4.13689L2.66946 4.31903C2.18235 4.80652 2.32277 5.62906 2.94403 5.92734L6.27007 7.52422L9.59557 9.12084C10.217 9.41919 10.3573 10.242 9.86986 10.7294L7.33307 13.2662C7.09659 13.5027 6.75755 13.6053 6.42963 13.5397L3.22586 12.8982Z"
        stroke="#5B6D7F"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}