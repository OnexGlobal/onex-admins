import * as am4core from "@amcharts/amcharts4/core.js";
import * as am4maps from "@amcharts/amcharts4/maps";
import { useLayoutEffect, useState } from "react";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import am4geodata_georgiaHigh from "@amcharts/amcharts4-geodata/georgiaHigh";
import { DashboardData } from "../../../types/src/dashboard";
import { georgiaRegions } from "onex-ge/src/constants/georgia-regions";
import { Loader } from "../../components/loader/Loader";

interface Props {
  dashboardData: DashboardData;
  filterType: string;
}

const MapChart = ({ dashboardData, filterType }: Props) => {
  const [sortedNewData, setSortedNewData] = useState<
    Array<Record<string, string | unknown>> | undefined
  >();

  useLayoutEffect(() => {
    if (dashboardData) {
      am4core.useTheme(am4themes_animated);

      let chart = am4core.create("MapChart", am4maps.MapChart);
      chart.width = am4core.percent(100);
      chart.height = am4core.percent(100);
      chart.geodata = am4geodata_georgiaHigh;

      // Set the projection to Mercator
      chart.projection = new am4maps.projections.Mercator();

      // Create the polygon series for regions
      let polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
      polygonSeries.useGeodata = true;

      // Configure the appearance of each polygon
      let polygonTemplate = polygonSeries.mapPolygons.template;
      polygonTemplate.tooltipText = "{name}: {value}"; // Display name and value in tooltip
      polygonTemplate.fill = am4core.color("#AECFEE"); // Set default fill color for regions
      polygonTemplate.nonScalingStroke = true;

      const APIData = dashboardData?.registration_by_region_info;

      // Convert object to array of key-value pairs
      const arr = Object.entries(APIData);

      const colors = [
        "#010413",
        "#02123C",
        "#072669",
        "#042E95",
        "#083BB7",
        "#214AAC",
        "#2959CA",
        "#3167E8",
        "#6C98F4",
        "#ABC7FD",
        "#D4E1FF",
      ];

      // Sort the array based on "total" values
      let sortedArr = arr.sort(function (a, b) {
        return b[1].total - a[1].total;
      });

      let newData = sortedArr.map((region, index) => {
        let id = georgiaRegions.find((i) => i.name === region[0]);

        return {
          id: id?.shortName || "",
          name: region[0],
          value: region[1].total || 0,
          color: am4core.color(colors[index]) as unknown,
        };
      });

      setSortedNewData(newData);

      // Set the data for the polygon series
      polygonSeries.data = newData;

      // Apply custom colors to each region

      // Enable tooltips
      if (polygonSeries.tooltip) {
        polygonSeries.tooltip.label.interactionsEnabled = true;
        polygonSeries.tooltip.keepTargetHover = true;
        polygonSeries.tooltip.label.interactionsEnabled = true;
        polygonSeries.tooltip.keepTargetHover = true;
      }
      // Apply custom colors to each region
      polygonSeries.mapPolygons.template.propertyFields.fill = "color";

      // Enable tooltips
      chart.seriesContainer.draggable = false;
      chart.seriesContainer.resizable = false;
      chart.chartContainer.wheelable = false;
    }
    // ... rest of the code
  }, [dashboardData]);
  return (
    <div className="bg-white rounded-[12px] p-[24px] mt-[40px] mb-[40px] relative w-[100%] ">
      <div className="absolute top-[24px] right-[24px] max-md:top-[10px] max-md:right-[10px]">
        <h1 className="text-info text-oxford-blue-100">{`This ${filterType}`}</h1>
      </div>
      <h1 className="text-title p-[0 0 15px 0]">Regions</h1>

      {!dashboardData ? (
        <Loader />
      ) : (
        <>
          <div className="flex items-center justify-between max-md:flex-col max-md:items-baseline">
            <div id="MapChart" className="h-[500px] w-[100%] max-md:h-auto " />
            <div>
              <ul className="list-none p-0">
                {sortedNewData?.map((item) =>
                  item?.value ? (
                    <li className="mb-[10px]">
                      <div className="flex items-center">
                        <div
                          className="cube"
                          style={{
                            width: 20,
                            height: 20,
                            background: `${item.color}`,
                            borderRadius: 5,
                            marginRight: 10,
                          }}
                        />
                        {`${item.name} - ${item.value}`}
                      </div>
                    </li>
                  ) : null
                )}
              </ul>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default MapChart;
