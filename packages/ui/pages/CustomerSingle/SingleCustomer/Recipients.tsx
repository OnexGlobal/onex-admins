import { Button, Table } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";

import { EditRecipient } from "./EditRecipient";
import useGetRecipients from "../../../hooks/recipients/useGetRecipients.hook";
import { EditIcon } from "../../../assets/icons/EditIcon";
import { Recipient } from "@repo/types/src/users";
import { Loader } from "../../../components/loader/Loader";

interface Props {
  recipient_edit: boolean;
}

export default function RecipientsTab({ recipient_edit }: Props) {
  const { id } = useParams();
  const { recipients, refetch } = useGetRecipients({ user_id: id });
  const [editRecipient, setEditRecipient] = useState<null | Recipient>(null);

  const columns = [
    {
      key: "name",
      dataIndex: "name",
      title: recipients?.[0]?.is_person ? "Name" : "Company name",
      width: "10%",
      // render(_, record) => ()
    },
    {
      key: "surname",
      dataIndex: "surname",
      title: recipients?.[0]?.is_person ? "Surname" : "Georgian company name",
    },
    {
      key: "armcode",
      dataIndex: "armcode",
      title: "GA code",
      width: "10%",
    },
    {
      key: "passportDetails",
      dataIndex: "passportDetails",
      title: "Passport details",
      width: "20%",
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
  let dataSource = null;
  dataSource = recipients?.map((recipient, index) => ({
    id: recipient.id,
    key: index,
    name: recipient?.first_name || recipient?.company_name,
    surname: recipient?.last_name || recipient?.georgian_company_name,
    armcode: recipient?.user_code,
    passportDetails: `${recipient?.document_type} ${recipient?.document_number}`,
    address: recipient?.address,
    phone: recipient?.phone,
    edit: recipient_edit ? (
      <div className="flex justify-end w-full">
        <Button
          type={"default"}
          icon={<EditIcon />}
          onClick={() => setEditRecipient(recipient)}
        />
      </div>
    ) : null,
  }));

  return (
    <div className={"table_wrapper"}>
      {recipients ? (
        <Table columns={columns} dataSource={dataSource} pagination={false} />
      ) : (
        <Loader />
      )}
      <EditRecipient
        recipient={editRecipient}
        setRecipient={setEditRecipient}
        refetch={refetch}
      />
    </div>
  );
}
