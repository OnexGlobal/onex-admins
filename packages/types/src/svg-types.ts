import { HTMLAttributes } from "react";

export interface SVGProps extends HTMLAttributes<HTMLOrSVGElement> {
  cursor?: string;
  size?: string | number;
  margin?: string | number;
  color?: string;
  opacity?: string | number;
  height?: string | number;
  width?: string | number;
  rotate?: string;
}
