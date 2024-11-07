import { ButtonHTMLAttributes } from "react";
import { BaseButtonProps } from "antd/es/button/button";
import { ButtonProps } from "antd";

export type MainButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  BaseButtonProps &
  ButtonProps;
