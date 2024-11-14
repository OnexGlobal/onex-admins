import { Checkbox, Form, Select } from "antd";
import { Dispatch, FC, SetStateAction } from "react";
import { useFetchBlog } from "../../../hooks/blog/useFetchBlogs.hook";

interface Props {
  form: { setFieldValue: (name: string, value: number) => void };
  selectBlog: boolean;
  setSelectBlog: Dispatch<SetStateAction<boolean>>;
}

export const CheckboxFeatures: FC<Props> = ({
  form,
  selectBlog,
  setSelectBlog = () => {},
}) => {
  const { blogs = [] } = useFetchBlog({});

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
  return (
    <div className="flex flex-col">
      <div className="flex flex-wirap gap-[16px] mt-[16px]">
        {checkedData?.map((item, i) => (
          <Form.Item
            name={item?.name}
            key={i}
            className={"_paper"}
            style={{ padding: "8px 16px" }}
            valuePropName="checked"
          >
            <Checkbox
              disabled={
                item?.name === "is_dropify" || item?.name === "is_one_click"
              }
              onChange={(e) =>
                form.setFieldValue(item?.name, e.target.checked ? 1 : 0)
              }
            >
              {item?.label}
            </Checkbox>
          </Form.Item>
        ))}
      </div>
      <div className="flex _paper w-max items-center p-[16px] h-[64px]">
        <Checkbox
          onChange={(e) => setSelectBlog(e.target.checked)}
          checked={selectBlog}
        >
          Blog
        </Checkbox>

        {selectBlog && (
          <Form.Item
            style={{ marginBottom: 0, width: 300 }}
            name={"blog_id"}
            // valuePropName="checked"
          >
            <Select placeholder={"Select blog"} options={blogs || []} />
          </Form.Item>
        )}
      </div>
    </div>
  );
};
