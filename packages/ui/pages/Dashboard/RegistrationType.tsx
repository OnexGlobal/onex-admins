import { useLayoutEffect } from "react";
import { Last4BoxesType } from "../../../types/src/dashboard";
import * as am4core from "@amcharts/amcharts4/core.js";
import * as am4charts from "@amcharts/amcharts4/charts.js";
import { Loader } from "../../components/loader/Loader";

export default function RegistrationType({
  dashboardData,
  isLoading,
  filterType,
}: Last4BoxesType) {
  useLayoutEffect(() => {
    const chart = am4core.create("registrationByType", am4charts.PieChart);

    if (dashboardData) {
      // Add data
      chart.data = [
        {
          category: "Georgian",
          litres:
            dashboardData?.registration_by_nationality_info?.georgian_total,
          color: "#0A94FF",
        },
        {
          category: "Foreigner",
          litres:
            dashboardData?.registration_by_nationality_info?.foreigner_total,
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
      pieSeries.slices.template.tooltipText = "Ruben";

      // Disable ticks and labels
      pieSeries.labels.template.disabled = true;
      pieSeries.ticks.template.disabled = true;

      // Disable tooltips
      pieSeries.slices.template.tooltipText = "{category}: {litres}";
      //
      // // Add a legend
      // chart.legend = new am4charts.Legend();
      // chart.legend.position = "right";
    }
  }, [dashboardData]);

  return (
    <div className="bg-white rounded-[12px] p-[24px] m-[40px 0] relative w-[100%] [&>#registrationByType]:h-auto">
      <div className="absolute top-[24px] right-[24px] max-md:top-[10px] max-md:right-[10px]">
        <h1 className="text-info text-oxford-blue-100">{`This ${filterType}`}</h1>
      </div>

      <h1 className="text-title p-[0 0 15px 0]">Residency</h1>

      {isLoading ? (
        <Loader />
      ) : (
        <div className="flex items-center">
          <div id="registrationByType" className="w-[60%] h-[280px]" />
          <div className={"legends"}>
            <div className="legend">
              <div className="flex items-center">
                <div className="legend-icon georgian bg-blue-600 w-[18px] h-[18px] rounded-[5px] mr-[5px]" />
                <p className="mt-[16px] mb-[16px]">
                  Georgian
                  <span className="pl-[5px] font-[600]">
                    {
                      dashboardData?.registration_by_nationality_info
                        ?.georgian_total
                    }
                  </span>
                  <span className="text-oxford-blue-200 pl-[5px]">
                    (
                    {
                      dashboardData?.registration_by_nationality_info
                        ?.georgian_percentage_in_completed
                    }
                    %)
                  </span>
                </p>
              </div>
            </div>
            <div className="legend">
              <div className="flex items-center">
                <div className="legend-icon foreigner bg-cyan-500 w-[18px] h-[18px] rounded-[5px] mr-[5px]" />
                <p className="mt-[16px] mb-[16px]">
                  Foreigner
                  <span className="pl-[5px] font-[600]">
                    {
                      dashboardData?.registration_by_nationality_info
                        ?.foreigner_total
                    }
                  </span>
                  <span className="text-oxford-blue-200 pl-[5px]">
                    (
                    {
                      dashboardData?.registration_by_nationality_info
                        ?.foreigner_percentage_in_completed
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
