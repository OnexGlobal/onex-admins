import { Refetch, Status } from "@repo/types";
import { Recipient } from "@repo/types/src/users";
import { AutoComplete, Button, Drawer, Form, Select, Switch } from "antd";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useFetchRoles } from "../../hooks/members-and-roles/useFetchRoles.hook";
import useGetRecipients from "../../hooks/recipients/useGetRecipients.hook";
import { useAddNewMember } from "../../hooks/members-and-roles/useAddNewMember.hook";
import {
  notificationError,
  notificationSuccess,
} from "../../helpers/notification";
import { useUpdateToggle } from "../../hooks/members-and-roles/useUpdateToggle.hook";
import { CloseCircleIcon } from "../../assets/icons/CloseCircleIcon";
import { NotFound } from "../../components/table/NotFound";
import { RolesCircleIcon } from "../../assets/icons/RolesCircleIcon";
import { DeleteModal } from "../../components/modals/DeleteModal";

interface Props {
  addMembers: boolean | Recipient["user"];
  setAddMembers: Dispatch<SetStateAction<boolean | Recipient["user"]>>;
  setCreateRole: Dispatch<SetStateAction<boolean>>;
  refetch: Refetch;
}

export default function AddMembersModal({
  addMembers,
  setAddMembers,
  setCreateRole,
  refetch,
}: Props) {
  const [form] = Form.useForm();
  const { roles } = useFetchRoles();
  const [checkedList, setCheckedList] = useState<number[]>([]);
  const [userInfo, setUserInfo] = useState<Record<string, string | number>>({
    is_parent: 1,
  });
  const [userId, setUserId] = useState<number | null>(null);
  const [status, setStatus] = useState(false);
  const { recipients: usersList = [] } = useGetRecipients(userInfo);
  const [deleteModalStatus, setDeleteModalStatus] = useState<Status>(false);
  const { mutate } = useAddNewMember(
    () => {
      setCheckedList([]);
      setUserId(null);
      notificationSuccess(
        "Member",
        typeof addMembers === "object"
          ? "Successfully updated"
          : "successfully added"
      );
      refetch();
      form.setFieldValue("full_name", "");
      setAddMembers(false);
    },
    () => {
      notificationError("Member", "something went wrong");
    }
  );
  const { mutate: mutateToggle, isPending } = useUpdateToggle(
    () => {
      setStatus(!status);
      refetch();
    },
    () => notificationError("Activate", "something went wrong")
  );
  useEffect(() => {
    if (typeof addMembers === "object") {
      setStatus(Boolean(addMembers?.is_active_admin));
      form.setFieldValue("full_name", addMembers?.full_name);
      form.setFieldValue("roles", addMembers?.role[0].id);
      setUserId(addMembers?.id);
      setCheckedList([addMembers?.role[0].id]);
    } else {
      form.setFieldValue("full_name", "");
      setCheckedList([]);
    }
  }, [addMembers]);
  const onFinish = () => {
    if (!userId) {
      form.setFields([
        {
          name: "full_name",
          errors: ["please select a member"],
        },
      ]);
      return;
    }
    mutate({ id: userId, roles: checkedList });
  };

  const handleDeleteUser = () => {
    mutate({ id: userId });
    setDeleteModalStatus(false);
  };

  return (
    <Drawer
      title=""
      placement="right"
      onClose={() => setAddMembers(false)}
      open={!!addMembers}
      width={1112}
      styles={{ header: { display: "none" } }}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <div className="flex items-center justify-between gap-[16px]">
          <span className="text-[22px] font-[500]">
            {typeof addMembers === "object" ? "Edit member" : "Add member"}
          </span>

          {typeof addMembers === "object" ? (
            <>
              <Button
                type="default"
                icon={<CloseCircleIcon />}
                onClick={() => setDeleteModalStatus(true)}
              >
                Delete member
              </Button>
              <span>{status ? "Active" : "Inactive"}</span>
              <Switch
                checked={status}
                onChange={(val) =>
                  mutateToggle({ users: [userId], status: val })
                }
                loading={isPending}
              />
            </>
          ) : (
            ""
          )}
          <Button
            type="default"
            htmlType="reset"
            danger
            onClick={() => setAddMembers(false)}
          >
            Cancel
          </Button>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </div>

        <div className={"_paper grid grid-cols-2 gap-[16px] mx-[24px]"}>
          <Form.Item
            name="full_name"
            rules={[{ required: true }]}
            label={"Full name"}
          >
            <AutoComplete
              placeholder="Full name"
              onSearch={(val) =>
                setUserInfo(
                  val ? { is_parent: 1, user_info: val } : { is_parent: 1 }
                )
              }
              onSelect={(_, val) => {
                setUserId(val.user_id);
              }}
              options={usersList}
            />
          </Form.Item>
          <Form.Item
            name="roles"
            rules={[{ required: true }]}
            label={"Select role"}
          >
            <Select
              options={roles}
              disabled={!roles?.length}
              placeholder={!roles?.length ? "No roles yet" : "Role name"}
              onSelect={(val) => setCheckedList([val])}
            />
          </Form.Item>
        </div>
      </Form>
      {!roles?.length && (
        <NotFound
          icon={<RolesCircleIcon />}
          title={"No roles yet"}
          text={"Create roles to give members"}
          reset={
            <Button
              type="primary"
              className="bg-oxford-blue-200"
              onClick={() => {
                setCreateRole(true);
                setAddMembers(false);
              }}
            >
              Create role
            </Button>
          }
        />
      )}

      <DeleteModal
        deleted={deleteModalStatus}
        setDeleted={setDeleteModalStatus}
        title="Delete member"
        description="Are you sure want to delete member?"
        handleDelete={handleDeleteUser}
      />
    </Drawer>
  );
}
