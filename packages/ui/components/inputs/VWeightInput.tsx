import { Button, Form, FormInstance, Input } from "antd";

import { FC, useState } from "react";
import HeightIcon from "../../assets/icons/HeightIcon";
import DepthIcon from "../../assets/icons/ParcelDepth";
import LengthIcon from "../../assets/icons/LengthIcon";
interface Props {
  form: FormInstance;
}
const VWeightInput: FC<Props> = ({ form }) => {
  const [active, setActive] = useState(false);
  const [newVWeight, setNewVWeight] = useState<number | string>("");

  const handleChange = () => {
    const heightValue = form?.getFieldValue("height");
    const lengthValue = form?.getFieldValue("length");
    const widthValue = form?.getFieldValue("width");
    if (heightValue && lengthValue && widthValue) {
      let newData =
        (Number(heightValue) * Number(lengthValue) * Number(widthValue)) / 5000;
      setNewVWeight(newData);
    } else {
      setNewVWeight("");
    }
  };
  const handleUpdate = () => {
    form.setFieldValue("total_v_weight", newVWeight);
    setActive(false);
  };
  return (
    <div>
      <Form.Item name="total_v_weight">
        <Input
          readOnly={true}
          onFocus={() => setActive(true)}
          style={{ cursor: "pointer" }}
        />
      </Form.Item>

      <div
        className={`${active ? "block" : "hidden"}  w-[420px] h-[228px] bg-white  shadow-[0px 12px 16px -4px rgba(16, 24, 40, 0.08)] rounded-[12px] absolute right-[17px] z-[999] p-[16px]`}
      >
        <div className="flex justify-between">
          <div className={"item"}>
            <p className="text-[14px] font-[500] pb-[4px] text-oxford-blue-400">
              Height
            </p>

            <Form.Item name={"height"}>
              <Input
                className="input-prefix-suffix"
                type={"number"}
                prefix={<HeightIcon />}
                suffix="mm"
                style={{ width: 120 }}
                onChange={handleChange}
              />
            </Form.Item>
          </div>
          <div className={"item"}>
            <p className="text-[14px] font-[500] pb-[4px] text-oxford-blue-400">
              Depth
            </p>

            <Form.Item name={"width"}>
              <Input
                className="input-prefix-suffix"
                type={"number"}
                prefix={<DepthIcon />}
                suffix="mm"
                style={{ width: 120 }}
                onChange={handleChange}
              />
            </Form.Item>
          </div>
          <div className={"item"}>
            <p className="text-[14px] font-[500] pb-[4px] text-oxford-blue-400">
              Length
            </p>

            <Form.Item name={"length"}>
              <Input
                className="input-prefix-suffix"
                prefix={<LengthIcon />}
                suffix="mm"
                type={"number"}
                style={{ width: 120 }}
                onChange={handleChange}
              />
            </Form.Item>
          </div>
        </div>
        <div>
          <p className="text-[14px] font-[500] pb-[4px] text-oxford-blue-400 pt-[8px]">
            New V Weight
          </p>

          <Input
            placeholder={"New V Weight"}
            readOnly={true}
            value={newVWeight}
            suffix={"kg"}
            style={{ width: "100%" }}
          />
        </div>
        <div className="footer mt-[24px]">
          <Button type="primary" onClick={handleUpdate}>
            Update
          </Button>
        </div>
      </div>
    </div>
  );
};
export default VWeightInput;
