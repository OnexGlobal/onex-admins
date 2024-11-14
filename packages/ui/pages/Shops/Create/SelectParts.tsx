import { Form, Select } from "antd";
import useGetWarehouses from "../../../hooks/warehouses/useWarehouses.hook";
import useCategories from "../../../hooks/categories/useCategories.hook";

export const SelectParts = () => {
  const { categories = [] } = useCategories("shop");
  const { data: warehouses = [] } = useGetWarehouses();
  return (
    <div className="_paper _action-form-item grid grid-cols-3 mt-[16px] gap-[16px] w-full">
      <Form.Item
        name={"warehouse_id"}
        label={"Country"}
        rules={[
          {
            required: true,
            message: "Missing Country.",
          },
        ]}
      >
        <Select placeholder={"Select country"} options={warehouses || []} />
      </Form.Item>

      <Form.Item
        name={"category_ids"}
        label={"Category"}
        rules={[
          {
            required: true,
            message: "Missing Category.",
          },
        ]}
      >
        <Select
          maxTagCount={"responsive"}
          placeholder={"Select category"}
          options={categories || []}
          mode="multiple"
        />
      </Form.Item>
      <Form.Item
        name={"price"}
        label={"Price"}
        rules={[
          {
            required: true,
            message: "Missing Price.",
          },
        ]}
      >
        <Select
          placeholder={"Select price"}
          options={[
            { value: 1, label: "$" },
            { value: 2, label: "$$" },
            { value: 3, label: "$$$" },
          ]}
        />
      </Form.Item>
    </div>
  );
};
