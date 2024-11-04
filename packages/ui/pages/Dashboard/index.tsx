import { useState } from "react";
import DashboardTopActions from "./TopActions";
import { FILTERS } from "onex-ge/src/types/dashboard";
import useDashboardData from "onex-ge/src/hooks/dashboard/useDashboardData.hook";
import GrowthChart from "./GrowthChart";
import DashboardTotalCards from "./TotalCards";
import { Col, Row } from "antd";
import OrdersByCountry from "./OrdersByCountry";
import DashboardRegistration from "./Registrations";
import MapChart from "./DashboardMap";
import DashboardAppDownloads from "./AppDownloads";
import RegistrationIsPerson from "./RegistrationIsPerson";
import RegistrationType from "./RegistrationType";
import UsersByGender from "./UsersByGender";

const currentWeekDay = new Date().getDay();
const DashboardPage = () => {
  const [filterType, setFilterType] = useState(FILTERS.day);
  const [customRange, setCustomRange] = useState<string[]>([]);
  const filters = {
    filter_type: filterType,
    start_date: customRange[0],
    end_date: customRange[1],
  };
  const { dashboardData, isLoading } = useDashboardData(filters);

  return (
    <div>
      <h1 className={"text-title"}>Dashboard</h1>
      <DashboardTopActions
        setFilterType={setFilterType}
        setCustomRange={setCustomRange}
        dashboardData={dashboardData?.data}
      />
      <GrowthChart customRange={customRange} />
      {dashboardData && (
        <>
          {" "}
          <Row gutter={24} style={{ width: "100%" }}>
            <Col lg={8} md={24} xs={24}>
              <DashboardTotalCards
                dashboardData={dashboardData.data}
                isLoading={isLoading}
                filterType={filterType}
                filters={filters}
                currentWeekDay={currentWeekDay}
              />
            </Col>{" "}
            <Col lg={16} md={24} xs={24}>
              <OrdersByCountry
                dashboardData={dashboardData?.data}
                filterType={filterType}
                currentWeekDay={currentWeekDay}
              />
            </Col>
          </Row>
          <DashboardRegistration
            dashboardData={dashboardData?.data}
            filterType={filterType}
          />
          <MapChart
            dashboardData={dashboardData?.data}
            filterType={filterType}
          />{" "}
          <Row gutter={[40, 40]} style={{ width: "100%" }}>
            <Col lg={12} md={24} xs={24}>
              <DashboardAppDownloads
                dashboardData={dashboardData?.data}
                isLoading={isLoading}
                filterType={filterType}
              />
            </Col>
            <Col lg={12} md={24} xs={24}>
              <RegistrationIsPerson
                dashboardData={dashboardData?.data}
                isLoading={isLoading}
                filterType={filterType}
              />
            </Col>
            <Col lg={12} md={24} xs={24}>
              <RegistrationType
                dashboardData={dashboardData?.data}
                isLoading={isLoading}
                filterType={filterType}
              />
            </Col>
            <Col lg={12} md={24} xs={24}>
              <UsersByGender
                dashboardData={dashboardData?.data}
                isLoading={isLoading}
                filterType={filterType}
              />
            </Col>
          </Row>
        </>
      )}
    </div>
  );
};

export default DashboardPage;
