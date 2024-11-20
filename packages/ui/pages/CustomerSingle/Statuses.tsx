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
          className="flex items-center cursor-pointer [&>h1]:hover:!text-green-500"
        >
          <ExpectedIcon />
          <h1 className="text-info text-oxford-blue-400 font-[500] px-[8px]">
            Expected
          </h1>
          <Tag className="text-[16px] rounded-[50%] font-[500] py-[2px] px-[8px] mr-0">
            {accountDetails?.orders_history.expected || 0}
          </Tag>
        </div>
        <div
          onClick={() => handleToOrders("scan")}
          className="flex items-center cursor-pointer [&>h1]:hover:!text-green-500"
        >
          <ScannedIcon />
          <h1 className="text-info text-oxford-blue-400 font-[500] px-[8px]">
            Scanned
          </h1>
          <Tag className="text-[16px] font-[500] rounded-[50%] py-[2px] px-[8px] mr-0">
            {accountDetails?.orders_history.scan || 0}
          </Tag>
        </div>
        <div
          onClick={() => handleToOrders("at_warehouse")}
          className="flex items-center cursor-pointer [&>h1]:hover:!text-green-500"
        >
          <WarehouseIcon />
          <h1 className="text-info text-oxford-blue-400 font-[500] px-[8px]">
            At warehouse
          </h1>
          <Tag className="text-[16px] font-[500] rounded-[50%] py-[2px] px-[8px] mr-0">
            {accountDetails?.orders_history.at_warehouse || 0}
          </Tag>
        </div>
        <div
          className="flex items-center cursor-pointer [&>h1]:hover:!text-green-500"
          onClick={() => handleToOrders("on_the_way")}
        >
          <OnTheWayIcon />
          <h1 className="text-info text-oxford-blue-400 font-[500] px-[8px]">
            On the Way
          </h1>
          <Tag className="text-[16px] font-[500] rounded-[50%] py-[2px] px-[8px] mr-0">
            {accountDetails?.orders_history.on_the_way || 0}
          </Tag>
        </div>
        <div
          className="flex items-center cursor-pointer [&>h1]:hover:!text-green-500"
          onClick={() => handleToOrders("in_georgia")}
        >
          <InLocalCountryIcon />
          <h1 className="text-info text-oxford-blue-400 font-[500] px-[8px]">
            In Local Country
          </h1>
          <Tag className="text-[16px] font-[500] rounded-[50%] py-[2px] px-[8px] mr-0">
            {accountDetails?.orders_history.in_georgia || 0}
          </Tag>
        </div>
        <div
          className="flex items-center cursor-pointer [&>h1]:hover:!text-green-500"
          onClick={() => handleToOrders("received")}
        >
          <ReceivedIcon />
          <h1 className="text-info text-oxford-blue-400 font-[500] px-[8px]">
            Received
          </h1>
          <Tag className="text-[16px] font-[500] rounded-[50%] py-[2px] px-[8px] mr-0">
            {accountDetails?.orders_history.received || 0}
          </Tag>
        </div>
      </div>
      <div className="flex flex-col max-w-[200px] flex-1 ml-[16px] rounded-[12px] bg-white p-[16px]">
        <span className="text-oxford-blue-400 text-[14px] font-[500]">
          Main Pickup Point
        </span>
        <span className="text-[14px] text-green-500">
          {accountDetails?.user_pickup_point?.pickup_point?.name}
        </span>
      </div>
    </div>
  );
}
