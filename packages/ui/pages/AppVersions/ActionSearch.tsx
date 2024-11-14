import { Button, Col, Row, Select } from "antd";
import apple from "../../assets/images/apple.svg";
import android from "../../assets/images/android.svg";
import { Dispatch, SetStateAction, useState } from "react";
import { SearchIcon } from "../../assets/icons/SearchIcon";
import { AppVersionsFilter } from "@repo/types/src/app-versions";
const initialFilter = {
  dev_mode: undefined,
  force_update: undefined,
  os: undefined,
};
interface Props {
  setFilter: Dispatch<SetStateAction<AppVersionsFilter | undefined>>;
}
export default function ActionSearch({ setFilter = () => {} }: Props) {
  const [myFilter, setMyFilter] = useState<AppVersionsFilter>(initialFilter);
  const [selectedOS, setSelectedOS] = useState(null);
  const [selectedUpdateType, setSelectedUpdateType] = useState("");

  const handleReset = () => {
    setFilter(undefined);
    setMyFilter(initialFilter);
    setSelectedOS(null);
    setSelectedUpdateType("");
  };

  return (
    <Row gutter={16} align={"bottom"} className="filters-row">
      <Col>
        <Select
          style={{ height: "35px" }}
          value={selectedOS}
          placeholder="All systems"
          onChange={(value) => {
            setSelectedOS(value);
            setMyFilter((p) => ({ ...p, os: value ? value : undefined }));
          }}
          options={[
            { value: null, label: "All systems" },
            {
              value: "android",
              label: (
                <div className="flex items-center gap-[5px]">
                  <img src={android} />
                  Android
                </div>
              ),
            },
            {
              value: "ios",
              label: (
                <div className="flex items-center gap-[5px]">
                  <img src={apple} />
                  IOS
                </div>
              ),
            },
          ]}
        />
      </Col>
      <Col lg={2}>
        <Select
          style={{ height: "35px" }}
          value={selectedUpdateType}
          placeholder={"All update types"}
          onChange={(value) => {
            setSelectedUpdateType(value);
            setMyFilter((p) => ({
              ...p,
              force_update: value === "force_update" ? 1 : undefined,
              dev_mode: value === "dev_mode" ? 1 : undefined,
            }));
          }}
          options={[
            { value: "", label: "All update types" },
            { value: "force_update", label: "Force Update" },
            { value: "dev_mode", label: "Dev Mode" },
          ]}
        />
      </Col>

      <Col>
        <Button
          onClick={handleReset}
          type="default"
          className="ml-[8px] h-[35px]"
          htmlType="reset"
        >
          Reset
        </Button>
      </Col>
      <Col>
        <Button
          onClick={() => setFilter(myFilter)}
          icon={<SearchIcon />}
          className="h-[35px]"
        >
          Search
        </Button>
      </Col>
    </Row>
  );
}
