import * as am4core from "@amcharts/amcharts4/core.js";
import * as am4charts from "@amcharts/amcharts4/charts.js";
import am4themes_animated from "@amcharts/amcharts4/themes/animated.js";
import { Last4BoxesType } from "../../types/dashboard";
import { useLayoutEffect } from "react";

export default function UsersByGender({
  dashboardData,
  filterType,
}: Last4BoxesType) {
  useLayoutEffect(() => {
    am4core.useTheme(am4themes_animated);

    const chart = am4core.create("usersByGender", am4charts.PieChart);

    if (dashboardData) {
      // Add dataaa
      chart.data = [
        {
          category: "Male",
          litres: dashboardData?.registration_by_gender_info?.males_total,
          color: "#3FCC75",
        },
        {
          category: "Female",
          litres: dashboardData?.registration_by_gender_info?.females_total,
          color: "#FB4ED5",
        },
        {
          category: "Not specified",
          litres: dashboardData?.registration_by_gender_info?.unspecified_total,
          color: "#4ED2F7",
        },
      ];

      // Add and configure Series
      const pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "litres";
      pieSeries.dataFields.category = "category";
      pieSeries.dataFields.hidden = "hidden";
      pieSeries.slices.template.propertyFields.fill = "color";

      // Let's cut a hole in our Pie chart the size of 40% the radius
      chart.innerRadius = am4core.percent(40);

      // Disable ticks and labels
      pieSeries.labels.template.disabled = true;
      pieSeries.ticks.template.disabled = true;

      // Disable tooltips
      pieSeries.slices.template.tooltipText = "{category}: {litres}";
    }
  }, [dashboardData]);

  return (
    <div className="bg-white rounded-[12px] p-[24px] m-[40px 0] relative w-[100%] [&>#usersByGender]:h-auto">
      <div className="absolute top-[24px] right-[24px] max-md:top-[10px] max-md:right-[10px]">
        <h1 className="text-info text-oxford-blue-100">{`This ${filterType}`}</h1>
      </div>

      <h1 className="text-title p-[0 0 15px 0]">Gender</h1>

      <div className="flex items-center">
        <div id="usersByGender" className="w-[60%] h-[280px]" />
        <div className={"legends"}>
          <div className="legend [&>male]:bg-sea-green-300">
            <div className="flex items-center">
              <div className="legend-icon male" />
              <p>
                Male
                <span>
                  {dashboardData?.registration_by_gender_info?.males_total}
                </span>
                <span className={"percent"}>
                  (
                  {
                    dashboardData?.registration_by_gender_info
                      ?.males_percentage_in_completed
                  }
                  %)
                </span>
              </p>
            </div>
          </div>
          <div className="legend [&>female]:bg-pink-500">
            <div className="flex items-center">
              <div className="legend-icon female" />
              <p>
                Female
                <span>
                  {dashboardData?.registration_by_gender_info?.females_total}
                </span>
                <span className={"percent"}>
                  (
                  {
                    dashboardData?.registration_by_gender_info
                      ?.females_percentage_in_completed
                  }
                  %)
                </span>
              </p>
            </div>
          </div>
          <div className="legend [&>not-specified]:bg-cyan-500">
            <div className="flex items-center">
              <div className="legend-icon not-specified" />
              <p>
                Not specified
                <span>
                  {
                    dashboardData?.registration_by_gender_info
                      ?.unspecified_total
                  }
                </span>
                <span className={"percent"}>
                  (
                  {
                    dashboardData?.registration_by_gender_info
                      ?.unspecified_percentage_in_completed
                  }
                  %)
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
