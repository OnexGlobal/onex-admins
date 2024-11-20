import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";

const InputPhone = ({ ...props }) => {
  return (
    <div>
      <PhoneInput {...props} defaultCountry="ru" />
    </div>
  );
};

export default InputPhone;
