declare module "react-international-phone" {
  import * as React from "react";

  export interface PhoneInputProps {
    defaultCountry?: string;
    value?: string;
    onChange?: (value: string) => void;
    className?: string;
    disabled?: boolean;

    [key: string]: any;
  }

  export const PhoneInput: React.FC<PhoneInputProps>;

  export default PhoneInput;
}
