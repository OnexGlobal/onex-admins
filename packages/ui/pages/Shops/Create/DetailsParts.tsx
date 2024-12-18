import { LanguagesType } from "@repo/types/src/marketing-content";
import { Checkbox, Form, Input } from "antd";
import { Dispatch, FC, SetStateAction } from "react";
import TabList from "../../../components/tabs/TabList";

interface Props {
  languages: LanguagesType[];
  languageId: number;
  setLanguageId: Dispatch<SetStateAction<number>>;
  form: {
    setFieldValue: (key: (string | number)[], val: string) => void;
  };
  showVlog: boolean;
  setShowVlog: Dispatch<SetStateAction<boolean>>;
}

export const DetailsParts: FC<Props> = ({
  languages = [],
  languageId,
  setLanguageId,
  form,
  showVlog,
  setShowVlog = () => {},
}) => {
  return (
    <Form.List name={"details"}>
      {() => {
        return (
          <div>
            <TabList
              data={languages}
              onChange={(key) => {
                setLanguageId(+key);
                form.setFieldValue(["details", +key - 1, "language_id"], key);
              }}
            />

            <Form.Item
              className={"_paper"}
              name={[languageId - 1, "description"]}
              label="Description"
              rules={[
                {
                  required: true,
                  message: "Missing Blog Title.",
                },
              ]}
            >
              <Input
                style={{ minHeight: "52px" }}
                placeholder={"Description"}
                maxLength={255}
                showCount={true}
              />
            </Form.Item>
            <div className="_paper _action-form-item flex items-center p-[16px] h-[64px]">
              <Checkbox onChange={(e) => setShowVlog(e.target.checked)}>
                Video
              </Checkbox>

              {showVlog && (
                <Form.Item name={[languageId - 1, "vlog"]}>
                  <Input placeholder={"Video URL "} />
                </Form.Item>
              )}
            </div>
          </div>
        );
      }}
    </Form.List>
  );
};
