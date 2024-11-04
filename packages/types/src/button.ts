import { ButtonHTMLAttributes } from "react";
import { BaseButtonProps } from "antd/es/button/button";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  BaseButtonProps;
