import { Button, Checkbox, Form, Input, Select } from "antd";
import { Dispatch, SetStateAction, useState } from "react";
import useCategories from "../../hooks/categories/useCategories.hook";
import useGetWarehouses from "../../hooks/warehouses/useWarehouses.hook";
import ShowLessIcon from "../../assets/icons/ShowLessIcon";
import { SearchIcon } from "../../assets/icons/SearchIcon";

interface Props {
  setFilters: Dispatch<SetStateAction<object>>;
}

export default function ShopsTopSearchActions({ setFilters }: Props) {
  const [more, setMore] = useState(false);
  const { categories } = useCategories("shop");
  const checkedData = [
    { name: "is_special", label: "Special" },
    {
      name: "is_buyforme",
      label: "Buy for me",
    },
    { name: "is_dropify", label: "Dropify" },
    { name: "is_one_click", label: "One click" },
    { name: "for_home_page", label: "Show on homepage" },
  ];
  const [form] = Form.useForm();
  const { data: warehouses = [] } = useGetWarehouses();

  const handleFinish = (values: object) => {
    const newValues: { [key: string]: string } = {};
    Object.entries(values).forEach(([key, val]) => {
      if (val) {
        newValues[key] = val;
      }
    });

    setFilters(newValues);
  };

  const handleResetForm = () => {
    form.resetFields();
    setFilters({});
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      className={"_paper"}
      style={{ margin: "16px 0" }}
    >
      <div className={"_action-form-item flex w-full gap-[16px]"}>
        <Form.Item name="name">
          <Input placeholder={"Search by shop name"} style={{ width: 300 }} />
        </Form.Item>

        <Form.Item name="warehouse_id">
          <Select
            placeholder="Country"
            options={warehouses}
            style={{ width: 220 }}
          />
        </Form.Item>

        <Form.Item name="price">
          <Select
            style={{ width: 200 }}
            placeholder="Price"
            options={[
              { value: 1, label: "$" },
              { value: 2, label: "$$" },
              { value: 3, label: "$$$" },
            ]}
          />
        </Form.Item>

        <Form.Item name="category_ids">
          <Select
            style={{ width: 240 }}
            placeholder="Category"
            options={categories}
            mode="multiple"
          />
        </Form.Item>
        <div className="flex justify-end gap-[16px] ml-auto">
          <Button
            onClick={() => setMore(!more)}
            type={"link"}
            icon={<ShowLessIcon rotate={more ? "0deg" : "-180deg"} />}
          >
            {more ? "Show less" : "Show more"}
          </Button>
          <Button type={"default"} onClick={() => handleResetForm()}>
            Reset
          </Button>
          <Button icon={<SearchIcon />} htmlType={"submit"} type="primary">
            Search
          </Button>
        </div>
        {!!more && (
          <div className="flex flex-wrap w-full gap-[16px]">
            {checkedData?.map((item, i) => (
              <Form.Item
                name={item?.name}
                key={i}
                className={"checked-item"}
                valuePropName="checked"
              >
                <Checkbox
                  onChange={(e) =>
                    form.setFieldValue(item?.name, e.target.checked ? 1 : 0)
                  }
                >
                  {item?.label}
                </Checkbox>
              </Form.Item>
            ))}
          </div>
        )}
      </div>
    </Form>
  );
}
