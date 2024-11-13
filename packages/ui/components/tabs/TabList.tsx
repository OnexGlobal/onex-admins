import { FC } from "react";
import { Tabs } from "antd";
import { LanguagesType } from "@repo/types/src/marketing-content";
import { AroundCheckedIcon } from "../../assets/icons/AroundCheckedIcon";

interface TabProps {
  data?: (Record<string, string> | LanguagesType)[];
  value?: string | number;
  isTrueAllItems?: any;
  onChange?: (val: string) => void;
}

const TabList: FC<TabProps> = ({
  data,
  value,
  isTrueAllItems,
  onChange = () => {},
}) => (
  <Tabs
    onChange={(val) => onChange(val)}
    activeKey={value?.toString()}
    items={data?.map((el, i) => {
      const id = String(i + 1);
      return {
        label: (
          <div className="flex gap-[12px]">
            <img
              alt={"language_image"}
              src={el?.flag}
              width={"24px"}
              height={"24px"}
            />
            {!!isTrueAllItems?.[i] && (
              <AroundCheckedIcon
                style={{ position: "absolute", bottom: 11, left: 14 }}
              />
            )}
            {el?.name}
          </div>
        ),
        key: id,
      };
    })}
  />
);
export default TabList;
