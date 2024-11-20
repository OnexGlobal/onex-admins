import { Users } from "@repo/types";
import { Tooltip } from "antd";
import { useNavigate } from "react-router-dom";
import RecipientIcon from "../../assets/icons/RecipientIcon";
import GeorgianIcon from "../../assets/icons/Georgian";
import CompanyIconInCustomer from "../../assets/icons/CompanyIconInCustomer";
import UserIcon from "../../assets/icons/UserIcon";
import PrimeIcon from "../../assets/icons/PrimeIcon";
import dayjs from "dayjs";
import Table from "../../components/table/Table";

export default function CustomersTable({
  recipients,
  meta,
  setFilter = () => {},
  filter,
}: Users.CustomersTableType) {
  const navigate = useNavigate();

  const handleClickCustomer = (id: string | number) => {
    navigate(`/customer/${id}`);
  };

  const columns = [
    {
      key: "name",
      dataIndex: "name",
      title: "Name",
    },
    {
      key: "id",
      dataIndex: "id",
      title: "ID",
    },
    {
      key: "phone",
      dataIndex: "phone",
      title: "Phone",
    },
    {
      key: "address",
      dataIndex: "address",
      title: "Address",
    },
    {
      key: "email",
      dataIndex: "email",
      title: "Email",
    },
    {
      key: "passportDetails",
      dataIndex: "passportDetails",
      title: "Passport details",
    },
    {
      key: "registeredDate",
      dataIndex: "registeredDate",
      title: "Registered date",
    },
  ];
  let dataSource = null;

  dataSource = recipients?.map((recipient, index) => ({
    key: index,
    name: (
      <div className="flex items-center gap-[8px]">
        <div className="cursor-pointer">
          {recipient.is_person === 1 && recipient.is_parent === 0 ? (
            <RecipientIcon />
          ) : recipient.is_person === 1 &&
            recipient.is_parent === 1 &&
            String(recipient?.is_resident) === "1" ? (
            <GeorgianIcon />
          ) : !recipient?.is_person ? (
            <CompanyIconInCustomer />
          ) : (
            <UserIcon />
          )}
        </div>
        <div className="flex flex-col">
          <div className="flex cursor-pointer">
            <span className="text-black text-[14px] font-[500] ">
              {" "}
              {recipient?.company_name && recipient?.company_name !== "null"
                ? recipient.company_name
                : recipient.first_name +
                  " " +
                  recipient.last_name +
                  " " +
                  recipient.user_code}
            </span>
            {recipient?.user?.is_prime ? (
              <Tooltip title={"Prime"}>
                <div style={{ paddingLeft: 5 }}>
                  <PrimeIcon />
                </div>
              </Tooltip>
            ) : null}
          </div>
          {recipient?.user?.recipient ? (
            <span>
              {recipient?.user?.recipient.first_name}{" "}
              {recipient?.user?.recipient.last_name}{" "}
              {recipient?.user?.recipient.user_code}
            </span>
          ) : null}
        </div>
      </div>
    ),
    id: recipient.user_id,
    user_id: recipient.user_id,
    phone: recipient.phone,
    address: recipient.address,
    email: recipient?.user?.email,
    passportDetails: recipient?.document_number || "Not completed",
    registeredDate: dayjs(recipient.user.created_et).format("YYYY-MM-DD HH:mm"),
  }));

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      bordered
      onRow={(record) => ({
        onClick: () => {
          handleClickCustomer(record.user_id);
        },
      })}
      meta={meta}
      onChangePage={(page) => setFilter({ ...filter, page })}
    />
  );
}
