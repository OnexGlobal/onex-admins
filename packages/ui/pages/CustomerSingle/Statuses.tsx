import { useNavigate, useParams } from "react-router-dom";
import useGetAccountDetails from "../../hooks/customers/useGetAccountDetails.hook";
import ExpectedIcon from "../../assets/icons/ExpectedIcon";
import { Tag } from "antd";
import ScannedIcon from "../../assets/icons/ScannedIcon";
import WarehouseIcon from "../../assets/icons/WerhouseIcon";
import OnTheWayIcon from "../../assets/icons/OnTheWayIcon";
import InLocalCountryIcon from "../../assets/icons/InLocalCountryIcon";
import ReceivedIcon from "../../assets/icons/ReceivedIcon";

export default function CustomerSingleStatuses() {
  const { id } = useParams();
  const { accountDetails } = useGetAccountDetails(id);
  const navigate = useNavigate();

  const handleToExpected = () => {
    navigate(`/expected?user_info=${accountDetails.full_name}`);
  };

  const handleToOrders = (status: string) => {
    navigate(
      `/orders?status=${status}&user_info=${accountDetails.recipient.user_code.substr(
        2,
        accountDetails.recipient.user_code.length - 1
      )}`
    );
  };

  return (
    <div className="flex w-full flex-nowrap">
      <div className="rounded-[12px] bg-white p-[16px] flex justify-between items-center w-full flex-1">
        <div
          onClick={() => handleToExpected()}
          className="order-details-statuses__status flex items-center"
        >
          <ExpectedIcon />
          <span className="text-oxford-blue-400 text-[14px] font-[500] mx-[8px]">
            Expected
          </span>

          <Tag color={"blue"}>
            {accountDetails?.orders_history.expected || 0}
          </Tag>
        </div>

        <div
          onClick={() => handleToOrders("scan")}
          className="order-details-statuses__status flex items-center"
        >
          <ScannedIcon />
          <span className="text-oxford-blue-400 text-[14px] font-[500] mx-[8px]">
            Scanned
          </span>
          <Tag color="blue">{accountDetails?.orders_history.scan || 0}</Tag>
        </div>

        <div
          onClick={() => handleToOrders("at_warehouse")}
          className="flex items-center order-details-statuses__status"
        >
          <WarehouseIcon />{" "}
          <span className="text-oxford-blue-400 text-[14px] font-[500] mx-[8px]">
            At warehouse
          </span>
          <Tag color="blue">
            {accountDetails?.orders_history.at_warehouse || 0}
          </Tag>
        </div>

        <div
          className="flex items-center order-details-statuses__status"
          onClick={() => handleToOrders("on_the_way")}
        >
          <OnTheWayIcon />
          <span className="text-oxford-blue-400 text-[14px] font-[500] mx-[8px]">
            On the Way
          </span>
          <Tag color="blue">
            {accountDetails?.orders_history.on_the_way || 0}
          </Tag>
        </div>

        <div
          className="flex items-center order-details-statuses__status"
          onClick={() => handleToOrders("in_georgia")}
        >
          <InLocalCountryIcon />
          <span className="text-oxford-blue-400 text-[14px] font-[500] mx-[8px]">
            In Local Country
          </span>
          <Tag color="blue">
            {accountDetails?.orders_history.in_georgia || 0}
          </Tag>
        </div>

        <div
          className="flex items-center order-details-statuses__status"
          onClick={() => handleToOrders("received")}
        >
          <ReceivedIcon />
          <span className="text-oxford-blue-400 text-[14px] font-[500] mx-[8px]">
            Received
          </span>
          <Tag color="blue">{accountDetails?.orders_history.received || 0}</Tag>
        </div>
      </div>

      <div className="flex flex-col max-w-[200px] flex-1 ml-[16px] rounded-[12px] bg-white p-[16px]">
        <span className="text-oxford-blue-400 text-[14px] font-[500] mx-[8px]">
          Main Pickup Point
        </span>
        <span className="text-[14px] text-green-500">
          {accountDetails?.user_pickup_point?.pickup_point?.name}
        </span>
      </div>
    </div>
  );
}
