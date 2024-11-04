import { useEffect, useState } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";
import { Segmented, Select } from "antd";
import useGetDashboardChartsData from "../../hooks/dashboard/useGetDashboardCharts.hook";

interface Props {
  customRange?: string[];
}

export default function DashboardCharts({ customRange }: Props) {
  const [filters, setFilters] = useState<Record<string, string>>({
    time_statement: "weekly",
    property: "quantity",
  });

  useEffect(() => {
    if (customRange) {
      const newFilters: Record<string, string> = {};
      newFilters.time_statement = filters.time_statement;
      newFilters.property = filters.property;
      newFilters.start_date = customRange[0];
      newFilters.end_date = customRange[1];
      setFilters(newFilters);
    }
  }, [customRange]);

  const { dashboardCharts } = useGetDashboardChartsData(filters);
  const countryTotals = ["China", "Germany", "United Kingdom", "USA"];

  useEffect(() => {
    if (dashboardCharts) {
      const data = Object.entries(dashboardCharts)?.map((dashboardItem) => {
        console.log(dashboardItem);
        const newData: { [key: string]: string | Date | number } = {
          date: new Date(dashboardItem[0]),
        };
        dashboardItem[1].map((item) => {
          const key = item?.country.toString();
          newData[key] = item?.total;
        });
        return newData;
      });

      am4core.useTheme(am4themes_animated);
      // Create chart instance
      const chart = am4core.create("chartsDashboard", am4charts.XYChart);

      // Add data
      chart.data = data;

      const categoryAxis = chart.xAxes.push(new am4charts.DateAxis());
      categoryAxis.renderer.grid.template.location = 0;
      //categoryAxis.renderer.minGridDistance = 30;

      chart.yAxes.push(new am4charts.ValueAxis());

      // Create series
      const createSeries = (field: string, name: string) => {
        const series = chart.series.push(new am4charts.LineSeries());
        series.dataFields.valueY = field;
        series.dataFields.dateX = "date";
        series.name = name;
        series.tooltipText = "{name}: [b]{valueY}[/]";
        series.strokeWidth = 2;
        series.stroke = am4core.color(
          field === "USA"
            ? "#3FCC75"
            : field === "Germany"
            ? "#FC9A3A"
            : field === "United Kingdom"
            ? "#4ED2F7"
            : field === "China"
            ? "#7B75E1"
            : ""
        );

        const bullet = series.bullets.push(new am4charts.CircleBullet());
        bullet.fill = am4core.color(
          field === "USA"
            ? "#3FCC75"
            : field === "Germany"
            ? "#FC9A3A"
            : field === "United Kingdom"
            ? "#4ED2F7"
            : field === "China"
            ? "#7B75E1"
            : ""
        );
      };

      const countriesShortNames: { [key: string]: string } = {
        China: "China",
        Germany: "Germany",
        "United Kingdom": "UK",
        USA: "USA",
      };

      countryTotals?.map((country) => {
        createSeries(country, countriesShortNames[country]);
      });
      // createSeries("value", "Series #1");
      // createSeries("value2", "Series #2");
      // createSeries("value3", "Series #3");

      chart.legend = new am4charts.Legend();
      chart.cursor = new am4charts.XYCursor();
    }
  }, [dashboardCharts]);

  return (
    <div className="flex w-[100%] m-[0 0 44px 0]">
      <div className="flex justify-items-end gap-[24px] w-[100%] m-[0 0 16px 0]">
        <h1 className="text-title">Growth</h1>
        <Segmented
          className="flex bg-white items-stretch has-[:ant-segmented-item]:flex has-[:ant-segmented-item]:items-center has-[:ant-segmented-item-selected]:bg-[#e3e2e2]"
          size={"small"}
          options={[
            // "Daily",
            "Weekly",
            "Monthly",
          ]}
          onChange={(val) => {
            const newFilters: Record<string, string> = {};
            newFilters.time_statement = String(val).toLowerCase();
            newFilters.property = filters.property;
            newFilters.start_date = filters?.start_date;
            newFilters.end_date = filters?.end_date;
            setFilters(newFilters);
          }}
        />
        <Select
          style={{ width: 200 }}
          defaultValue={"quantity"}
          onChange={(val) => {
            const newFilters: Record<string, string> = {};
            newFilters.time_statement = filters.time_statement;
            newFilters.property = val;
            newFilters.start_date = filters?.start_date;
            newFilters.end_date = filters?.end_date;
            setFilters(newFilters);
          }}
        >
          <Select.Option value={"quantity"}>Quantity</Select.Option>
          <Select.Option value={"weight"}>Weight</Select.Option>
        </Select>
      </div>
      <div id="chartsDashboard" style={{ width: "100%", height: "500px" }} />
    </div>
  );
}
