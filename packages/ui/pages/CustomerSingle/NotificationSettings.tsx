import { Col, Row } from "antd";
import { AccountDetailsTypes } from "@repo/types/src/customers-type";
import { languagesKeyValues } from "../../constants/text.constants";

interface Props {
  accountDetails: AccountDetailsTypes;
}

export default function CustomerNotificationSettings({
  accountDetails,
}: Props) {
  return (
    <>
      <Row>
        <Col lg={8}>
          <div className="flex flex-col mb-[24px]">
            <span className="text-oxford-blue-300 text-[12px] mb-[8px]">
              Marketing Notifications
            </span>
            <span className="text-oxford-blue-400 text-[14px] pb-[4px]">
              News
            </span>
            <span className="text-black text-[14px] pb-[4px]">Enabled</span>
          </div>
          <div className="flex flex-col mb-[24px]">
            <span className="text-oxford-blue-300 text-[12px] mb-[8px]">
              Smart Wall settings
            </span>
            <span className="text-oxford-blue-400 text-[14px] pb-[4px]">
              Smart Wall voice
            </span>
            <span className="text-black text-[14px] pb-[4px]">Enabled</span>
          </div>
          <div className="flex flex-col mb-[24px]">
            {" "}
            <span className="text-oxford-blue-300 text-[12px] mb-[8px]">
              Status Notifications
            </span>
            <span className="text-oxford-blue-400 text-[14px] pb-[4px]">
              In Warehouse
            </span>
            <span className="text-black text-[14px] pb-[4px]">Enabled</span>
          </div>
          <div className="flex flex-col mb-[24px]">
            <span className="text-oxford-blue-300 text-[12px] mb-[8px]">
              Transaction Notifications
            </span>
            <span className="text-oxford-blue-400 text-[14px] pb-[4px]">
              Fill balance
            </span>
            <span className="text-black text-[14px] pb-[4px]">Enabled</span>
          </div>
        </Col>
        <Col lg={8}>
          <div className="flex flex-col mb-[24px]">
            <span className="text-oxford-blue-400 text-[14px] mb-[4px] font-[500]">
              Events
            </span>
            <span className="text-black text-[14px]">Disabled</span>
          </div>
          <div className="flex flex-col mb-[24px]">
            <span className="text-oxford-blue-400 text-[14px] mb-[4px] font-[500]">
              Smart Wall Language
            </span>
            <span className="text-black text-[14px]">English</span>
          </div>
          <div className="flex flex-col mb-[24px]">
            <span className="text-oxford-blue-400 text-[14px] mb-[4px] font-[500]">
              On the way
            </span>
            <span className="text-black text-[14px]">Enabled</span>
          </div>
          <div className="flex flex-col mb-[24px]">
            <span className="text-oxford-blue-400 text-[14px] mb-[4px] font-[500]">
              Bonus
            </span>
            <span className="text-black text-[14px]">Disabled</span>
          </div>
        </Col>
        <Col lg={8}>
          <div className="flex flex-col mb-[24px]">
            <span className="text-oxford-blue-400 text-[14px] mb-[4px] font-[500]">
              Marketing Notifications Language
            </span>
            <span className="text-black text-[14px]">
              {
                languagesKeyValues[
                  accountDetails?.settings?.notification_lang as never
                ]
              }
            </span>
          </div>
        </Col>
      </Row>
    </>
  );
}
