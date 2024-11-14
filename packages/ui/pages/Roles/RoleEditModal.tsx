import { Refetch } from "@repo/types";
import { RolesDataType } from "@repo/types/src/roles-types";
import { Button, Checkbox, Col, Drawer, Form, Popconfirm, Row } from "antd";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFetchPermissionsByRoles } from "../../hooks/members-and-roles/useGetPermissionsByRole.hook";
import { useDeleteRole } from "../../hooks/members-and-roles/useDeleteRole.hook";
import {
  notificationError,
  notificationSuccess,
} from "../../helpers/notification";
import { useUpdateRole } from "../../hooks/members-and-roles/useUpdateRole.hook";
import { CloseCircleIcon } from "../../assets/icons/CloseCircleIcon";
import { Loader } from "../../components/loader/Loader";

interface Props {
  status: boolean;
  setStatus: Dispatch<SetStateAction<boolean>>;
  item: RolesDataType | null;
  refetchRoles: Refetch;
}

export default function RoleEditModal({
  status,
  setStatus,
  item,
  refetchRoles,
}: Props) {
  const [checkedList, setCheckedList] = useState<number[]>([]);

  const { permissions } = useFetchPermissionsByRoles({
    grouped_list: 1,
    role_id: item?.id,
  });
  const { mutate: deleteRole } = useDeleteRole(
    () => {
      notificationSuccess("Role", "Deleted successfully");
      setStatus(false);
      refetchRoles();
    },
    () => {}
  );
  const { mutate } = useUpdateRole(
    () => {
      notificationSuccess("Role", "Successfully updated");
      setStatus(false);
      refetchRoles();
    },
    () => {
      notificationError("Role", "Something went wrong!");
    }
  );

  useEffect(() => {
    if (permissions) {
      Object.entries(permissions)?.map((item) => {
        if (item) {
          (item[1] as [])?.map(
            (permission: { has_selected_role: undefined; id: number }) => {
              if (permission.has_selected_role) {
                setCheckedList((checkedList) => [
                  ...checkedList,
                  permission.id,
                ]);
              }
            }
          );
        }
      });
    }
  }, [permissions]);

  const handleDelete = () => {
    if (item) deleteRole({ id: item?.id });
  };

  return (
    <Drawer
      title="Edit Role"
      placement="right"
      onClose={() => {
        setStatus(false);
        setCheckedList([]);
      }}
      open={status}
      width="1112px"
    >
      <div className="flex items-center justify-between">
        <span className="text-[22px] font-[500] mb-[36px]">
          Edit role {item?.name}
        </span>
        <div className="flex ">
          <div style={{ marginRight: 15 }}>
            <Popconfirm title={"Are you sure?"} onConfirm={handleDelete}>
              <Button type="primary" icon={<CloseCircleIcon />}>
                Delete
              </Button>
            </Popconfirm>
          </div>
          <Button
            type="primary"
            danger
            onClick={() => setStatus(false)}
            htmlType="reset"
          >
            Cancel
          </Button>
          <Button
            htmlType="submit"
            type="primary"
            onClick={() =>
              item &&
              mutate({
                id: item?.id,
                name: item?.name,
                permissions: checkedList,
              })
            }
          >
            Save
          </Button>
          ={" "}
        </div>
      </div>
      <Form>
        {checkedList && permissions ? (
          Object.entries(permissions)?.map((group, i) => {
            return (
              <div className="flex flex-col mb-[24px] _paper" key={i}>
                <span className="text-[20px] font-[500] mb-[18px]">
                  {group[0].replaceAll("-", " ")}
                </span>

                {checkedList?.length ? (
                  <Checkbox.Group defaultValue={checkedList}>
                    <Row gutter={[36, 26]}>
                      {(group[1] as [])?.map(
                        (
                          permission: {
                            id: number;
                            name: string;
                          },
                          i: number
                        ) => {
                          return (
                            <Col lg={6} key={i}>
                              <Checkbox
                                value={permission.id}
                                onChange={(e) => {
                                  if (checkedList.includes(e.target.value)) {
                                    const updatedArray = checkedList.filter(
                                      (existingId) =>
                                        existingId !== e.target.value
                                    );
                                    setCheckedList(updatedArray);
                                  } else {
                                    const updatedArray = [
                                      ...checkedList,
                                      e.target.value,
                                    ];
                                    setCheckedList(updatedArray);
                                  }
                                }}
                              >
                                {permission.name}
                              </Checkbox>
                            </Col>
                          );
                        }
                      )}
                    </Row>
                  </Checkbox.Group>
                ) : (
                  <Loader />
                )}
              </div>
            );
          })
        ) : (
          <Loader />
        )}
      </Form>
    </Drawer>
  );
}
