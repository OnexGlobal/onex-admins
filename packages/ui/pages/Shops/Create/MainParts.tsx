import { Form, Input, Tooltip } from "antd";
import { Dispatch, FC, SetStateAction } from "react";
import InfoIcon from "../../../assets/icons/InfoIcon";
import { UploadImages } from "../../../components/buttons/UploadImages";

interface Props {
  imageUrl: Record<string, string>;
  setImageUrl: Dispatch<SetStateAction<Record<string, string>>>;
}

export const MainParts: FC<Props> = ({ imageUrl, setImageUrl = () => {} }) => {
  return (
    <div className="rounded-[12px] bg-white p-[16px] flex flex-col">
      <div className="flex">
        <Form.Item
          style={{ marginRight: 50 }}
          name={"logo"}
          rules={[
            {
              required: true,
              message: "Missing Images.",
            },
          ]}
          label={
            <div className="flex gap-[4px]">
              Image web
              <Tooltip
                overlayInnerStyle={{ background: "#0A2540" }}
                placement="right"
                title={
                  <span>
                    Dimensions <br />
                    <span style={{ fontWeight: 700 }}>200 × 200px</span> SVG
                  </span>
                }
              >
                <InfoIcon color={"#5B6D7F"} />
              </Tooltip>
            </div>
          }
        >
          <UploadImages
            imageUrl={imageUrl ? imageUrl["web"] : ""}
            setImageUrl={(img) => setImageUrl({ ...imageUrl, ["web"]: img })}
          />
        </Form.Item>
        <Form.Item
          name={"mobile_logo"}
          rules={[
            {
              required: true,
              message: "Missing Images.",
            },
          ]}
          label={
            <div className="flex gap-[4px]">
              Image mobile
              <Tooltip
                overlayInnerStyle={{ background: "#0A2540" }}
                placement="right"
                title={
                  <span>
                    Dimensions <br />
                    <span style={{ fontWeight: 700 }}>200 × 200px</span> PNG
                  </span>
                }
              >
                <InfoIcon color={"#5B6D7F"} />
              </Tooltip>
            </div>
          }
        >
          <UploadImages
            imageUrl={imageUrl ? imageUrl["mob"] : ""}
            setImageUrl={(img) => setImageUrl({ ...imageUrl, ["mob"]: img })}
          />
        </Form.Item>
      </div>

      <div className={"_action-form-item grid grid-cols-3 gap-[16px] w-full"}>
        <Form.Item
          name={"name"}
          label={"Shop name"}
          rules={[
            {
              required: true,
              message: "Missing Shop name.",
            },
          ]}
        >
          <Input placeholder={"Shop name"} />
        </Form.Item>

        <Form.Item
          name={"url"}
          label={"URL"}
          rules={[
            {
              required: true,
              message: "Missing URL.",
            },
          ]}
        >
          <Input placeholder={"URL"} />
        </Form.Item>
        <Form.Item name={"affilate_url"} label={"Affiliate URL"}>
          <Input placeholder={"Affiliate URL"} />
        </Form.Item>
      </div>
    </div>
  );
};
