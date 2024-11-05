import { SVGProps } from "types";

export const PackagingIcon = ({
  size = 24,
  color = "#3B5166",
  margin,
  ...props
}: SVGProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    style={{ margin }}
    {...props}
  >
    <path
      d="M2 9V7C2 4 4 2 7 2H17C20 2 22 4 22 7V9"
      stroke={color}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M2 15V17C2 20 4 22 7 22H17C20 22 22 20 22 17V15"
      stroke={color}
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <g clipPath="url(#clip0_77_29069)">
      <path
        d="M4.9585 13.3766L8.26943 15.2948L11.5637 13.385"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.26941 18.6891V15.2864"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.49384 11.5085L5.49228 12.6176C5.04192 12.8678 4.66663 13.5017 4.66663 14.0187V16.1371C4.66663 16.6542 5.03359 17.288 5.49228 17.5382L7.49384 18.6474C7.91918 18.8893 8.61972 18.8893 9.0534 18.6474L11.055 17.5382C11.5053 17.288 11.8806 16.6542 11.8806 16.1371V14.0187C11.8806 13.5017 11.5137 12.8678 11.055 12.6176L9.0534 11.5085C8.61972 11.2749 7.91918 11.2749 7.49384 11.5085Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.23975 7.37653L11.5507 9.29469L14.8449 7.38487"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.5507 12.6891V9.28641"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10.7751 5.50847L8.77353 6.61763C8.32317 6.86783 7.94788 7.50165 7.94788 8.01873V10.1371C7.94788 10.6542 8.31484 11.288 8.77353 11.5382L10.7751 12.6474C11.2004 12.8893 11.901 12.8893 12.3346 12.6474L14.3362 11.5382C14.7866 11.288 15.1619 10.6542 15.1619 10.1371V8.01873C15.1619 7.50165 14.7949 6.86783 14.3362 6.61763L12.3346 5.50847C11.901 5.27495 11.2004 5.27495 10.7751 5.50847Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.2919 13.2145L15.6028 15.1327L18.897 13.2229"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.6028 18.527V15.1243"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.8272 11.3464L12.8257 12.4555C12.3753 12.7057 12 13.3395 12 13.8566V15.975C12 16.492 12.367 17.1259 12.8257 17.3761L14.8272 18.4853C15.2526 18.7271 15.9531 18.7271 16.3868 18.4853L18.3883 17.3761C18.8387 17.1259 19.214 16.492 19.214 15.975V13.8566C19.214 13.3395 18.847 12.7057 18.3883 12.4555L16.3868 11.3464C15.9531 11.1128 15.2526 11.1128 14.8272 11.3464Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
    <defs>
      <clipPath id="clip0_77_29069">
        <rect width="16" height="16" fill="white" transform="translate(4 4)" />
      </clipPath>
    </defs>
  </svg>
);
