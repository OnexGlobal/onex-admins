import { useLayoutEffect } from "react";
import { Loader } from "@repo/ui/components/loader/Loader";
import * as am4core from "@amcharts/amcharts4/core.js";
import * as am4charts from "@amcharts/amcharts4/charts.js";
import { DashboardData } from "../../types/dashboard";

interface Props {
  dashboardData: DashboardData;
  filterType: string;
}

export default function DashboardRegistration({
  dashboardData,
  filterType,
}: Props) {
  useLayoutEffect(() => {
    if (dashboardData) {
      let chart = am4core.create("registration", am4charts.XYChart);
      chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

      let data = Object.entries(dashboardData?.registration_by_time_info).map(
        (key, value) => {
          return {
            category: key[0],
            value1: key[1].verified_total,
            value2: key[1].unverified_total,
            color: "#5DBA2F",
            colorUnverified: "#CDEABF",
          };
        }
      );

      chart.data = data;

      chart.legend = new am4charts.Legend();
      chart.colors.step = 0;
      // chart.legend.markers.fill = "red";

      let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "category";
      categoryAxis.renderer.grid.template.location = 0;

      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.min = 0;
      valueAxis.renderer.minWidth = 0;
      valueAxis.renderer.grid.template.strokeOpacity = 0;
      valueAxis.renderer.labels.template.fillOpacity = 1;
      valueAxis.renderer.baseGrid.strokeOpacity = 0;

      let series1 = chart.series.push(new am4charts.ColumnSeries());
      series1.columns.template.width = am4core.percent(30);
      series1.columns.template.tooltipText = "{name}: {valueY.value}";
      series1.name = "Verified";
      series1.dataFields.categoryX = "category";
      series1.dataFields.valueY = "value1";
      series1.stacked = true;
      series1.columns.template.column.cornerRadius(0, 0, 0, 0);

      let series2 = chart.series.push(new am4charts.ColumnSeries());
      series2.columns.template.width = am4core.percent(30);
      series2.columns.template.tooltipText = "{name}: {valueY.value}";
      series2.name = "Unverified";
      series2.dataFields.categoryX = "category";
      series2.dataFields.valueY = "value2";
      series2.stacked = true;
      series2.columns.template.column.cornerRadius(8, 8, 0, 0);
      chart.scrollbarX = new am4core.Scrollbar();
      chart.cursor = new am4charts.XYCursor();
    }
  }, [dashboardData]);

  return dashboardData ? (
    <div className="mt-[40px] p-[24px] bg-white rounded-[12px] relative w-[100%]">
      <div className="absolute top-[24px] right-[24px] max-md:right-[10px] max-md:top-[10px]">
        <Typography
          text={`This ${filterType}`}
          fontSize="14px"
          fontWeight="400"
          color={"#B3BBC4"}
        />
      </div>

      <h1 className="text-title p-[0 0 15px 0]">Registration</h1>

      <div className="flex max-md:flex-col">
        <div className="max-md:flex-nowrap">
          <h1 className="text-info size-[12px] p-[0 0 15px 0] text-oxford-blue-200 max-md:p-0">
            {`${dashboardData?.current_start_date.substr(
              0,
              10
            )} - ${dashboardData?.current_end_date.substr(0, 10)}`}
          </h1>
        </div>
        <div className="flex justify-between w-[25%] max-md:w-[45%] max-sm:w-[75%]">
          <h1 className="text-info p-[0 4px 0 16px] max-md:p-0">Total</h1>
          <h1 className="text-info font-[600] p-[0 4px 0 16px] max-md:p-0">
            {dashboardData?.all_info?.all_total}
          </h1>
          <h1 className="text-info p-[0 4px 0 16px] max-md:p-0">Verified</h1>
          <h1 className="text-info p-[0 0 0 4px] max-md:p-0">
            {dashboardData?.all_info?.completed_total}
          </h1>
          <h1 className="text-info p-[0 4px 0 16px] max-md:p-0">Unverified</h1>
          <h1 className="text-info font-[600] p-[0 0 0 4px] max-md:p-0">
            {dashboardData?.all_info?.incompleted_total +
              dashboardData?.all_info?.unverified_total}
          </h1>
        </div>
      </div>
      <div id="registration" className="w-[100%] h-[500px]" />
    </div>
  ) : (
    <Loader />
  );
}
