import TotalVerifiedPercent from "./TotalVerifiedPercent";
import { useEffect, useState } from "react";
import { DownloadUnverified } from "../../services/dashboard";
import { Col, Row } from "antd";
import {
  DownloadIcon,
  LeftBottomArrowIcon,
  TopRightArrowIcon,
  UserIcon,
} from "../../components/svg-components/index";

import { DashboardData, FilterAsProps } from "../../types/dashboard";
import { Loader } from "@repo/ui/components/loader/Loader";
import Primary from "@repo/ui/components/buttons/Primary";

interface Props {
  dashboardData: DashboardData;
  filterType: string;
  filters: FilterAsProps;
  isLoading?: boolean;
  currentWeekDay: number;
}

export default function DashboardTotalCards({
  dashboardData,
  isLoading,
  filterType,
  filters,
  currentWeekDay,
}: Props) {
  console.log(dashboardData, isLoading, filterType, filters, currentWeekDay);
  const [unverifiedTotalSum, setUnverifiedTotalSum] = useState(0);
  const handleDownloadUnverified = () => {
    DownloadUnverified(filters, dashboardData);
  };

  useEffect(() => {
    setUnverifiedTotalSum(
      dashboardData?.all_info?.incompleted_total +
        dashboardData?.all_info?.unverified_total
    );
  }, [dashboardData]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <Row gutter={[24, 24]} className="max-lg:mb-[25px]">
          <Col lg={24} md={24} xs={24}>
            <div className="flex bg-white border-[1.5px] border-oxford-blue-30 rounded-[12px] p-[24px] min-h-[145px] max-md:min-h-[auto]">
              <h1 className="text-title text-white size-[36px]">
                {dashboardData?.all_info?.all_total}
              </h1>
              <h1 className="text-info text-white p-[15px 0 18px 0]">
                Total registered users
              </h1>
              <div className="flex justify-between max-md:items-center">
                <div>
                  {dashboardData?.all_info?.all_percentage_expression ? (
                    <>
                      <div className="flex items-center">
                        {Math.sign(
                          dashboardData?.all_info?.all_percentage_expression
                        ) === -1 ? (
                          <LeftBottomArrowIcon />
                        ) : (
                          <TopRightArrowIcon />
                        )}
                        <h1
                          className={`text-info ${
                            Math.sign(
                              dashboardData?.all_info?.all_percentage_expression
                            ) === -1
                              ? "text-red-500"
                              : "text-green-500"
                          } p-[0 16px 0 4px]`}
                        >{`${dashboardData?.all_info?.all_percentage_expression}%`}</h1>
                      </div>

                      <h1 className={"text-info size-[12px] text-white"}>{`${
                        Math.sign(
                          dashboardData?.all_info?.all_sum_expression
                        ) === -1
                          ? dashboardData?.all_info?.all_sum_expression
                          : "+" + dashboardData?.all_info?.all_sum_expression
                      } since  ${
                        filterType === "day"
                          ? "last " + currentWeekDay
                          : "last " + filterType
                      }`}</h1>
                    </>
                  ) : null}
                </div>
                <UserIcon />
              </div>
            </div>
          </Col>
          <Col lg={24} md={24} xs={24}>
            <div className="flex bg-white border-[1.5px] border-oxford-blue-30 rounded-[12px] p-[24px] min-h-[145px] max-md:min-h-[auto]">
              <div className="flex justify-between">
                <div>
                  <h1 className="text-title size-[36px]">
                    {dashboardData?.all_info?.completed_total}
                  </h1>

                  <h1 className="text-info p-[15px 0 18px 0] text-oxford-blue-200">
                    Total verified
                  </h1>

                  <div className="flex justify-between max-md:items-center">
                    <div>
                      {dashboardData?.all_info
                        ?.completed_percentage_expression ? (
                        <>
                          <div className={"flex items-center"}>
                            {Math.sign(
                              dashboardData?.all_info
                                ?.completed_percentage_expression
                            ) === -1 ? (
                              <LeftBottomArrowIcon />
                            ) : (
                              <TopRightArrowIcon />
                            )}

                            <h1
                              className={`text-info ${
                                Math.sign(
                                  dashboardData?.all_info
                                    ?.all_percentage_expression
                                ) === -1
                                  ? "text-red-500"
                                  : "text-green-500"
                              } p-[0 16px 0 4px]`}
                            >{`${dashboardData?.all_info?.all_percentage_expression}%`}</h1>
                          </div>

                          <h1
                            className={
                              "text-info size-[12px] text-oxford-blue-200"
                            }
                          >{`${
                            Math.sign(
                              dashboardData?.all_info?.all_sum_expression
                            ) === -1
                              ? dashboardData?.all_info?.all_sum_expression
                              : "+" +
                                dashboardData?.all_info?.all_sum_expression
                          } since  ${
                            filterType === "day"
                              ? "last " + currentWeekDay
                              : "last " + filterType
                          }`}</h1>
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div>
                  <TotalVerifiedPercent dashboardData={dashboardData} />
                </div>
              </div>
            </div>
          </Col>
          <Col lg={24} md={24} xs={24}>
            <div className="flex bg-white border-[1.5px] border-oxford-blue-30 rounded-[12px] p-[24px] min-h-[145px] max-md:min-h-[auto]">
              <div className="flex justify-between">
                <div>
                  <h1 className="text-title size-[36px]">
                    {unverifiedTotalSum}
                  </h1>
                  <h1 className="text-info p-[15px 0 18px 0] text-oxford-blue-200">
                    Total unverified
                  </h1>

                  <div className="flex justify-between max-md:items-center">
                    <div>
                      {dashboardData?.all_info
                        ?.unverified_percentage_expression ? (
                        <>
                          <div className={"flex items-center"}>
                            {Math.sign(
                              dashboardData?.all_info
                                ?.unverified_percentage_expression
                            ) === -1 ? (
                              <LeftBottomArrowIcon />
                            ) : (
                              <TopRightArrowIcon />
                            )}
                            <h1
                              className={`text-info ${
                                Math.sign(
                                  dashboardData?.all_info
                                    ?.all_percentage_expression
                                ) === -1
                                  ? "text-red-500"
                                  : "text-green-500"
                              } p-[0 16px 0 4px]`}
                            >{`${dashboardData?.all_info?.all_percentage_expression}%`}</h1>
                          </div>

                          <h1
                            className={
                              "text-info size-[12px] text-oxford-blue-200"
                            }
                          >{`${
                            Math.sign(
                              dashboardData?.all_info?.all_sum_expression
                            ) === -1
                              ? dashboardData?.all_info?.all_sum_expression
                              : "+" +
                                dashboardData?.all_info?.all_sum_expression
                          } since  ${
                            filterType === "day"
                              ? "last " + currentWeekDay
                              : "last " + filterType
                          }`}</h1>
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div>
                  <Primary
                    icon={<DownloadIcon />}
                    onClick={() => handleDownloadUnverified()}
                  >
                    Download list
                  </Primary>

                  <div className="flex flex-col items-end mt-[20px]">
                    <div className="[&:nth-child(3n)]:mb-[25px]">
                      <h1 className="text-info p-[0 8px 0 0] text-oxford-blue-200">
                        Incomplete
                      </h1>
                      <h1 className="text-info size-[16px] font-[600] text-oxford-blue-600">
                        {dashboardData?.all_info?.incompleted_total}
                      </h1>
                    </div>
                    <div className="[&:nth-child(3n)]:mb-[25px]">
                      <h1 className="text-info p-[0 8px 0 0] text-oxford-blue-200">
                        Not verified
                      </h1>
                      <h1 className="text-info size-[16px] font-[600] text-oxford-blue-600">
                        {dashboardData?.all_info?.unverified_total}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      )}
    </>
  );
}
