import { useLayoutEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import { Last4BoxesType } from "onex-ge/src/types/dashboard";
import { Loader } from "../../components/loader/Loader";

export default function DashboardAppDownloads({
  dashboardData,
  isLoading,
  filterType,
}: Last4BoxesType) {
  useLayoutEffect(() => {
    const chart = am4core.create("appDownloads", am4charts.PieChart);
    chart.responsive.enabled = true;
    chart.responsive.useDefault = false;
    chart.responsive.rules.push({
      relevant: function (target) {
        if (target.pixelWidth <= 400) {
          return true;
        }
        return false;
      },
      state: function (target, stateId) {
        if (target instanceof am4charts.Chart) {
          const state = target.states.create(stateId);
          state.properties.paddingTop = 0;
          state.properties.paddingRight = 0;
          state.properties.paddingBottom = 0;
          state.properties.paddingLeft = 0;
          return state;
        } else if (
          target instanceof am4charts.AxisLabelCircular ||
          target instanceof am4charts.PieTick
        ) {
          const state = target.states.create(stateId);
          state.properties.disabled = true;
          return state;
        }
        return;
      },
    });
    if (dashboardData) {
      // Add data
      chart.data = [
        {
          platform: "IOS",
          litres: dashboardData?.app_downloads_info?.ios_total,
          color: "#3FCC75",
        },
        {
          platform: "Android",
          litres: dashboardData?.app_downloads_info?.android_total,
          color: "#FC9A3A",
        },
      ];
      // Add and configure Series
      const pieSeries = chart.series.push(new am4charts.PieSeries());
      pieSeries.dataFields.value = "litres";
      pieSeries.dataFields.category = "platform";
      pieSeries.dataFields.hidden = "hidden";
      pieSeries.slices.template.propertyFields.fill = "color";
      pieSeries.slices.template.tooltipText = "Ruben";
      // Let's cut a hole in our Pie chart the size of 40% the radius
      chart.innerRadius = am4core.percent(40);
      // Disable ticks and labels
      pieSeries.labels.template.disabled = true;
      pieSeries.ticks.template.disabled = true;
      // Disable tooltips
      pieSeries.slices.template.tooltipText = "{category}: {litres}";
      // Add a legend
      // chart.legend = new am4charts.Legend();
      // chart.legend.position = "right";
    }
  }, [dashboardData]);

  return (
    <div className="bg-white rounded-[12px] p-[24px] m-[40px 0] relative w-[100%] [&>#appDownloads]:h-auto">
      <div className="absolute top-[24px] right-[24px] max-md:top-[10px] max-md:right-[10px]">
        <h1 className="text-info text-oxford-blue-100">{`This ${filterType}`}</h1>
      </div>
      <h1 className="text-title p-[0 0 15px 0]">App downloads</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex items-center">
          <div id="appDownloads" className="w-[65%] h-[240px]" />
          <div className={"legends"}>
            <div className="legend [&>ios]:bg-sea-green-300">
              <div className="flex items-center">
                <div className="legend-icon ios" />
                <p>
                  Ios
                  <span>{dashboardData?.app_downloads_info?.ios_total}</span>
                  <span className={"percent"}>
                    (
                    {
                      dashboardData?.app_downloads_info
                        ?.ios_percentage_in_completed
                    }
                    %)
                  </span>
                </p>
              </div>
            </div>
            <div className="legend [&>android]:bg-orange-500">
              <div className="flex items-center">
                <div className="legend-icon android" />
                <p>
                  Android
                  <span>
                    {dashboardData?.app_downloads_info?.android_total}
                  </span>
                  <span className={"percent"}>
                    (
                    {
                      dashboardData?.app_downloads_info
                        ?.android_percentage_in_completed
                    }
                    %)
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
