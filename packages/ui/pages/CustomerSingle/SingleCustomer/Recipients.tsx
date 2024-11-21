import { Button, Form, Input, Select, Table } from "antd";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useGetRecipients from "../../../hooks/recipients/useGetRecipients.hook";
import { EditIcon } from "../../../assets/icons/EditIcon";
import { Recipient } from "@repo/types/src/users";
import { Loader } from "../../../components/loader/Loader";
import CancelIcon from "../../../assets/icons/CancelIcon";
import AcceptIcon from "../../../assets/icons/AcceptIcon";
import { useMutationUpdateRecipient } from "../../../hooks/recipients/useMutationUpdateRecipinet.hook";
import { notificationSuccess } from "../../../helpers/notification";

export default function RecipientsTab() {
  const { id } = useParams();
  const { recipients, refetch } = useGetRecipients({ user_id: id });
  const [editRecipient, setEditRecipient] = useState<null | Recipient>(null);
  const [form] = Form.useForm();
  const { mutate } = useMutationUpdateRecipient(() => {
    notificationSuccess("Recipient", "Recipient Service updated successfully");
    refetch();
    setEditRecipient(null);
  });
  const handleSave = (values: Partial<Recipient>) => {
    const data = {
      ...values,
      is_person: editRecipient?.is_person,
      region_id: editRecipient?.region_id,
      community_id: editRecipient?.community_id,
    };
    mutate({ id: editRecipient?.id, data });
  };
  useEffect(() => {
    const isPersonData = editRecipient?.is_person
      ? {
          first_name: editRecipient?.first_name,
          last_name: editRecipient?.last_name,
        }
      : {
          company_name: editRecipient?.company_name,
          georgian_company_name: editRecipient?.georgian_company_name,
        };
    form.setFieldsValue({
      address: editRecipient?.address,
      document_number: editRecipient?.document_number,
      document_type: editRecipient?.document_type,
      phone: editRecipient?.phone,
      user_code: editRecipient?.user_code,
      ...isPersonData,
    });
  }, [editRecipient, form]);
  const columns = [
    {
      key: "name",
      dataIndex: "first_name",
      title: recipients?.[0]?.is_person ? "Name" : "Company name",
      width: "10%",
    },
    {
      key: "surname",
      dataIndex: "surname",
      title: recipients?.[0]?.is_person ? "Surname" : "Georgian company name",
      width: 150,
    },
    {
      key: "user_code",
      dataIndex: "user_code",
      title: "User code",
      width: 150,
    },
    {
      key: "passportDetails",
      dataIndex: "passportDetails",
      title: "Passport details",
      width: 350,
    },
    {
      key: "address",
      dataIndex: "address",
      title: "Address",
    },
    {
      key: "phone",
      dataIndex: "phone",
      title: "Phone",
    },
    {
      key: "edit",
      dataIndex: "edit",
      title: " ",
      width: 120,
    },
  ];

  let dataSource = recipients?.map((recipient, index) => ({
    id: recipient.id,
    key: index,
    first_name:
      editRecipient?.id === recipient?.id ? (
        <Form.Item
          name={recipient?.company_name ? "company_name" : "first_name"}
        >
          <Input />
        </Form.Item>
      ) : (
        recipient?.first_name || recipient?.company_name
      ),
    surname:
      editRecipient?.id === recipient?.id ? (
        <Form.Item
          name={
            recipient?.georgian_company_name
              ? "georgian_company_name"
              : "last_name"
          }
        >
          <Input />
        </Form.Item>
      ) : (
        recipient?.last_name || recipient?.georgian_company_name
      ),
    user_code:
      editRecipient?.id === recipient?.id ? (
        <Form.Item name="user_code">
          <Input />
        </Form.Item>
      ) : (
        recipient?.user_code
      ),
    passportDetails:
      editRecipient?.id === recipient?.id ? (
        <div className="flex">
          <Form.Item className="flex-1" name="document_type">
            <Select className="[&>div]:!rounded-[12px_0_0_12px] w-[150px]">
              <Select.Option value="passport">Passport</Select.Option>
              <Select.Option value="id">ID</Select.Option>
              <Select.Option value="foreign_citizen">
                Foreigh Citizen
              </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item className="flex-1" name="document_number">
            <Input className="!rounded-[0_12px_12px_0]" />
          </Form.Item>
        </div>
      ) : (
        `${recipient?.document_type || ""} ${recipient?.document_number || ""}`
      ),
    address:
      editRecipient?.id === recipient?.id ? (
        <Form.Item name="address">
          <Input />
        </Form.Item>
      ) : (
        recipient?.address
      ),
    phone:
      editRecipient?.id === recipient?.id ? (
        <Form.Item name="phone">
          <Input />
        </Form.Item>
      ) : (
        recipient?.phone
      ),
    edit:
      editRecipient?.id === recipient?.id ? (
        <div className="flex gap-[8px] mt-[-16px] justify-end">
          <Button
            type="primary"
            danger
            onClick={() => setEditRecipient(null)}
            icon={<CancelIcon />}
          />
          <Button type="primary" htmlType="submit" icon={<AcceptIcon />} />
        </div>
      ) : (
        <div className="flex justify-end">
          {recipient?.id && (
            <Button
              type="default"
              onClick={() => setEditRecipient(recipient)}
              icon={<EditIcon />}
            />
          )}
        </div>
      ),
  }));

  return (
    <Form form={form} onFinish={handleSave}>
      {recipients ? (
        <Table columns={columns} dataSource={dataSource} pagination={false} />
      ) : (
        <Loader />
      )}
    </Form>
  );
}
