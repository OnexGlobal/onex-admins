import { Button, Tabs, Tag } from "antd";
import { useState } from "react";
import { useParams } from "react-router-dom";
import CustomerSinglePickupPoint from "./PickupPoint";
import CustomerSingleTransactions from "./Transactions";
import CustomerSingleSettings from "./Settings";
import CustomerNotificationSettings from "./NotificationSettings";
import useGetRecipients from "../../hooks/recipients/useGetRecipients.hook";
import useGetAccountDetails from "../../hooks/customers/useGetAccountDetails.hook";
import EditPersonalInfo from "./SingleCustomer/EditPersonalInfo";
import { EditIcon } from "../../assets/icons/EditIcon";
import PersonalInfoTab from "./SingleCustomer/PersonalInfo";
import RecipientsTab from "./SingleCustomer/Recipients";

export default function CustomerSingleTabs({ recipient_edit = false }) {
  const [editPersonalInfoStatus, setEditPersonalInfoStatus] = useState(false);
  const { id } = useParams();
  const query = { user_id: id };
  const { recipients = [] } = useGetRecipients(query);
  const { accountDetails, refetch } = useGetAccountDetails(id);
  const items = [
    {
      key: "1",
      label: `Personal Info`,
      children: editPersonalInfoStatus ? (
        <EditPersonalInfo
          setEditPersonalInfoStatus={setEditPersonalInfoStatus}
        />
      ) : (
        <div className="relative">
          <div className="actions">
            {recipient_edit ? (
              <Button
                type="default"
                icon={<EditIcon />}
                onClick={() => setEditPersonalInfoStatus(true)}
              >
                Edit
              </Button>
            ) : null}
          </div>
          <PersonalInfoTab accountDetails={accountDetails} />
        </div>
      ),
    },
    {
      key: "2",
      label: (
        <div className="flex gap-[5px]">
          <span>Recipients</span>
          <Tag color="green">{recipients?.length || 0}</Tag>
        </div>
      ),
      children: <RecipientsTab recipient_edit={recipient_edit} />,
    },
    {
      key: "3",
      label: `Pickup point`,
      children: <CustomerSinglePickupPoint accountDetails={accountDetails} />,
    },
    {
      key: "4",
      label: `Transactions`,
      children: <CustomerSingleTransactions />,
    },
    {
      key: "5",
      label: `Settings`,
      children: recipient_edit ? (
        <CustomerSingleSettings
          accountDetails={accountDetails}
          refetch={refetch}
        />
      ) : null,
    },
    {
      key: "6",
      label: `Notification settings`,
      children: (
        <CustomerNotificationSettings accountDetails={accountDetails} />
      ),
    },
  ];

  return (
    <div className={"flex w-full mt-[19px] _paper "}>
      <Tabs defaultActiveKey="1" items={items} style={{ width: "100%" }} />
    </div>
  );
}
