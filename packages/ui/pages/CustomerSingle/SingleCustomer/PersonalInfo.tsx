import { AccountDetailsTypes } from "@repo/types/src/customers-type";
import { Col, Row } from "antd";
import dayjs from "dayjs";
import WebIcon from "../../../assets/icons/WebIcon";
import AppleIcon from "../../../assets/icons/AppleIcon";
import AndroidIcon from "../../../assets/icons/AndroidIcon";
import { Loader } from "../../../components/loader/Loader";

interface Props {
  accountDetails: AccountDetailsTypes;
}

export default function PersonalInfoTab({ accountDetails }: Props) {
  return (
    <div className={"info_tab"}>
      {accountDetails ? (
        <Row gutter={50}>
          <Col lg={6}>
            <div className="mb-[24px]">
              <p className="text-oxford-blue-400 text-[14px] font-[500] mb-[4px]">
                {accountDetails?.recipient?.first_name
                  ? "Name"
                  : "Company Name"}
              </p>
              <p className="text-black text-[14px] font-[400] pb-[4px]">
                {accountDetails?.recipient?.first_name ||
                  accountDetails?.recipient?.company_name}
              </p>
            </div>
            {!!accountDetails?.recipient?.last_name && (
              <div className="mb-[24px]">
                <p className="text-oxford-blue-400 text-[14px] font-[500] mb-[4px]">
                  Surname
                </p>
                <p className="text-black text-[14px] font-[400] pb-[4px]">
                  {accountDetails?.recipient?.last_name}
                </p>
              </div>
            )}

            <div className="mb-[24px]">
              <p className="text-oxford-blue-400 text-[14px] font-[500] mb-[4px]">
                {accountDetails?.recipient?.georgian_first_name
                  ? `Full name in ${import.meta.env.VITE_APP_CAUNTRY_LANGUAGE || ""}`
                  : `Company name (${import.meta.env.VITE_APP_CAUNTRY_LANGUAGE || ""})`}
              </p>
              <p className="text-black text-[14px] font-[400] pb-[4px]">
                {accountDetails?.recipient?.georgian_first_name
                  ? `${
                      accountDetails?.recipient?.georgian_first_name
                        ? accountDetails?.recipient?.georgian_first_name +
                          " " +
                          accountDetails?.recipient?.georgian_last_name
                        : accountDetails?.recipient?.company_name || ""
                    } `
                  : accountDetails?.recipient?.georgian_company_name}
              </p>
            </div>
          </Col>
          <Col lg={6}>
            <div className="mb-[24px]">
              <p className="text-oxford-blue-400 text-[14px] font-[500] mb-[4px]">
                Email
              </p>
              <p className="text-black text-[14px] font-[400] pb-[4px]">
                {accountDetails?.email}
              </p>
            </div>
            <div className="mb-[24px]">
              <p className="text-oxford-blue-400 text-[14px] font-[500] mb-[4px]">
                Phone
              </p>
              <p className="text-black text-[14px] font-[400] pb-[4px]">
                {accountDetails?.phone}
              </p>
            </div>
            <div className="mb-[24px]">
              <p className="text-oxford-blue-400 text-[14px] font-[500] mb-[4px]">
                Address
              </p>
              <p className="text-black text-[14px] font-[400] pb-[4px]">
                {accountDetails?.recipient?.address}
              </p>
            </div>
          </Col>
          <Col lg={6}>
            <div className="mb-[24px]">
              <p className="text-oxford-blue-400 text-[14px] font-[500] mb-[4px]">
                Passport details
              </p>
              <p className="text-black text-[14px] font-[400] pb-[4px]">
                {accountDetails?.recipient?.document_type}
                {accountDetails?.recipient?.document_number}
              </p>
            </div>
            <div className="mb-[24px]">
              <p className="text-oxford-blue-400 text-[14px] font-[500] mb-[4px]">
                Gender
              </p>
              <p className="text-black text-[14px] font-[400] pb-[4px]">
                {accountDetails?.recipient?.gender || "_"}
              </p>
            </div>
            <div className="mb-[24px]">
              <p className="text-oxford-blue-400 text-[14px] font-[500] mb-[4px]">
                Birthday
              </p>
              <p className="text-black text-[14px] font-[400] pb-[4px]">
                {accountDetails?.birthday_date || "_"}
              </p>
            </div>
          </Col>
          <Col lg={6}>
            <div className="mb-[24px]">
              <p className="text-oxford-blue-400 text-[14px] font-[500] mb-[4px]">
                Registration date
              </p>
              <div className="flex items-center">
                {accountDetails?.verified_type === "email" ? (
                  <WebIcon />
                ) : accountDetails?.verified_type === "ios" ? (
                  <AppleIcon />
                ) : accountDetails?.verified_type === "android" ? (
                  <AndroidIcon />
                ) : null}
                <span className="text-[14px] text-black pl-[5px]">
                  {dayjs(accountDetails?.created_et).format("YYYY-MM-DD HH:mm")}
                </span>
              </div>
            </div>
            {accountDetails?.recipient?.user_code_old ? (
              <div className="mb-[24px]">
                <p className="text-oxford-blue-400 text-[14px] font-[500] mb-[4px]">
                  Old GA code
                </p>
                <p className="text-black text-[14px] font-[400] pb-[4px]">
                  GA{accountDetails?.recipient?.user_code_old || ""}
                </p>
              </div>
            ) : null}
          </Col>
        </Row>
      ) : (
        <Loader />
      )}
    </div>
  );
}
