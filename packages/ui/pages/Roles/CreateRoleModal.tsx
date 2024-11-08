import { Button, Checkbox, Col, Divider, Drawer, Form, Input, Row } from "antd";
import { Dispatch, SetStateAction, useState } from "react";
import { useRolesPermissions } from "../../hooks/members-and-roles/useRolesPermissions.hook";
import { useAddNewRole } from "../../hooks/members-and-roles/useAddNewRole.hook";
import {
  notificationError,
  notificationSuccess,
} from "../../helpers/notification";
import { PerListItemType } from "@repo/types/src/roles-types";
interface Props {
  createRole: boolean;
  setCreateRole: Dispatch<SetStateAction<boolean>>;
}

export default function CreateRoleModal({ createRole, setCreateRole }: Props) {
  const [indeterminate, setIndeterminate] = useState<
    Record<string, string | false>
  >({});
  const [checkedList, setCheckedList] = useState<
    Record<string, (number | string | boolean)[]>
  >({});
  const { rolesPermissions = [] } = useRolesPermissions();
  console.log(rolesPermissions);
  const [form] = Form.useForm();
  const { mutate } = useAddNewRole((data) => {
    notificationSuccess("Create role", data?.data?.message);
    form.resetFields();
    setCheckedList({});
    setIndeterminate({});
    setCreateRole(false);
  });

  const onFinish = ({ name }: { name: string }) => {
    const permissions: number[] = [];
    Object.values(checkedList)?.forEach((item) => {
      if (Array.isArray(item))
        item.forEach((item) => {
          permissions.push(Number(item));
        });
    });
    if (!permissions.length)
      return notificationError("Create role", "Please select permission");
    mutate({ permissions, name });
  };

  return (
    <Drawer
      title=""
      styles={{
        header: {
          display: "none",
        },
      }}
      placement="right"
      onClose={() => setCreateRole(false)}
      open={createRole}
      width="1112px"
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <div className="flex gap-[16px] mb-[24px] justify-between">
          <span className="text-[22px] font-[500]">Create role</span>

          <div className="flex gap-[16px]">
            <Button
              type="default"
              htmlType="reset"
              onClick={() => setCreateRole(false)}
            >
              Cancel
            </Button>
            <Button type="primary" htmlType="submit">
              Cancel
            </Button>
          </div>
        </div>
        <div className={"flex mb-[16px] _paper"}>
          <Form.Item
            name="name"
            rules={[{ required: true }]}
            label={"Role name"}
            style={{ width: "100%" }}
          >
            <Input placeholder={"Role name"} />
          </Form.Item>
        </div>
      </Form>
      {rolesPermissions?.map((item, i) => (
        <div className={"flex p-[16px] flex-col _paper mb-[16px]"} key={i}>
          <Checkbox
            checked={Boolean(indeterminate[item?.title])}
            indeterminate={!indeterminate[item?.title]}
            onChange={() => {
              setCheckedList({
                ...checkedList,
                [item?.title]: indeterminate[item?.title]
                  ? []
                  : item?.list?.map((el: PerListItemType) => el.id),
              });
              setIndeterminate({
                ...indeterminate,
                [item?.title]: indeterminate[item?.title] ? false : item?.title,
              });
            }}
          >
            <span className="font-[500] text-oxford-blue-300">
              {item?.title}
            </span>
          </Checkbox>
          <Divider style={{ margin: "8px 0 0 0" }} />
          <Checkbox.Group
            value={checkedList[item?.title] || []}
            onChange={(val) =>
              setCheckedList({
                ...checkedList,
                [item?.title]: val,
              })
            }
          >
            <Row>
              {item?.list?.map((el: PerListItemType, i: number) => (
                <Col span={8} style={{ marginTop: 16 }} key={i}>
                  <Checkbox value={el?.id}>
                    <span>{el?.name.replaceAll("-", " ")}</span>
                  </Checkbox>
                </Col>
              ))}
            </Row>
          </Checkbox.Group>
        </div>
      ))}
    </Drawer>
  );
}
