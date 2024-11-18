import { AccountDetailsTypes } from "@repo/types/src/customers-type";
import { Col, Row } from "antd";
import LockerIcon from "../../assets/icons/LockerIcon";
import HomeDeliveryIcon from "../../assets/icons/HomeDeliveryIcon";

interface Props {
  accountDetails: AccountDetailsTypes;
}

export default function CustomerSinglePickupPoint({ accountDetails }: Props) {
  return (
    <Row style={{ marginTop: 24 }}>
      <Col lg={8}>
        <div className="text-oxford-blue-400 font-[500] pb-[5px] text-[14px]">
          Main Pickup Point
        </div>
        <div className="text-black text-[14px] pb-[4px]">
          {accountDetails?.user_pickup_point?.pickup_point?.name}
        </div>
      </Col>
      <Col lg={8}>
        <div className="text-oxford-blue-400 font-[500] pb-[5px] text-[14px]">
          Delivery type
        </div>

        <div className="flex ">
          {accountDetails?.user_pickup_point?.delivery_type === "branch" ? (
            <LockerIcon />
          ) : (
            <HomeDeliveryIcon />
          )}
          <div className="text-black text-[14px] ml-[8px]">
            {accountDetails?.user_pickup_point?.delivery_type}
          </div>
        </div>
      </Col>
      <Col lg={8}>
        <div className="text-oxford-blue-400 font-[500] pb-[5px] text-[14px]">
          Address
        </div>
        <div className="text-black text-[14px] pb-[4px]">
          {accountDetails?.user_pickup_point?.pickup_point?.address}
        </div>
      </Col>
    </Row>
  );
}
