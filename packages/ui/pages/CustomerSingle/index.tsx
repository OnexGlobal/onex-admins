import { useParams } from "react-router-dom";
import { Alert } from "antd";
import CustomerSingleStatuses from "./Statuses";
import CustomerSingleTabs from "./Tabs";
import CustomerAlert from "./Alert";
import CustomersSingleSearch from "./Search";
import { CustomersSingleType } from "@repo/types/src/customers-type";
import useGetAccountDetails from "../../hooks/customers/useGetAccountDetails.hook";
import { Loader } from "../../components/loader/Loader";
import UserInfo from "./UserInfo";
export default function CustomerSingle({
  recipient_edit = false,
  clientLogin,
}: CustomersSingleType) {
  const { id } = useParams();
  const { accountDetails } = useGetAccountDetails(id);
  return (
    <>
      <h1 className="text-title text-black text-[24px] mb-[24px]">
        Customers {id || ""}
      </h1>

      <CustomersSingleSearch />
      <UserInfo clientLogin={clientLogin} />
      {accountDetails ? (
        !accountDetails?.recipient?.document_number && <CustomerAlert />
      ) : (
        <Loader />
      )}
      {accountDetails?.current_blocked_account ? (
        <Alert
          type="error"
          showIcon
          message="This user is blocked"
          style={{ marginBottom: 16 }}
        />
      ) : null}
      <CustomerSingleStatuses />
      <CustomerSingleTabs recipient_edit={recipient_edit} />
    </>
  );
}
