import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

const InputPhone = ({ ...props }) => {
  const phoneStyle = {
    containerStyle: {
      borderRadius: 12,
      background: "#ffffff",
    },
    inputStyle: {
      color: "#262626",
      width: "100%",
      fontSize: "14px",
      height: "32px",
      fontFamily: "Montserrat arm2",
    },
    buttonStyle: {
      borderWidth: "1px 0 1px 1px",
      background: "transparent",
    },
  };
  return (
    <PhoneInput
      {...props}
      inputStyle={phoneStyle.inputStyle}
      buttonStyle={phoneStyle.buttonStyle}
      containerStyle={phoneStyle.containerStyle}
      country={"ru"}
      areaCodes={{ ru: ["7"] }}
    />
  );
};
export default InputPhone;
