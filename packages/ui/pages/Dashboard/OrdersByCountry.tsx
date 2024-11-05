import { useLayoutEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core.js";
import * as am4charts from "@amcharts/amcharts4/charts.js";
import LeftBottomArrowIcon from "../../assets/icons/LeftBottomArrow";
import TopRightArrowIcon from "../../assets/icons/TopRightArrow";
import { DashboardData } from "../../../types/src/dashboard";
import { Loader } from "../../components/loader/Loader";

interface Props {
  dashboardData: DashboardData;
  filterType: string;
  currentWeekDay: number;
}

export default function OrdersByCountry({
  dashboardData,
  filterType,
  currentWeekDay,
}: Props) {
  useLayoutEffect(() => {
    console.log(dashboardData);
    if (dashboardData) {
      const chart = am4core.create("ordersByCountry", am4charts.XYChart);
      chart.hiddenState.properties.opacity = 0; // this creates initial fade-in

      chart.paddingBottom = 30;

      const data = Object.entries(dashboardData?.order_info).map((key) => {
        return {
          country: key[0] === "United Kingdom" ? "UK" : key[0],
          steps: key[1].total ? key[1].total : 0,
          img: `https://backadmin.onex.ge/storage/images/warehouses/${key[1].round_flag}`,
        };
      });

      chart.data = data;

      const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      categoryAxis.dataFields.category = "country";
      categoryAxis.renderer.grid.template.strokeOpacity = 0;
      categoryAxis.renderer.minGridDistance = 10;
      categoryAxis.renderer.labels.template.dy = 35;
      if (categoryAxis.renderer.tooltip) categoryAxis.renderer.tooltip.dy = 35;

      const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.renderer.inside = true;
      valueAxis.renderer.labels.template.fillOpacity = 0;
      valueAxis.renderer.grid.template.strokeOpacity = 0.1;
      valueAxis.min = 0;
      valueAxis.cursorTooltipEnabled = false;
      valueAxis.renderer.baseGrid.strokeOpacity = 0;

      const series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueY = "steps";
      series.dataFields.categoryX = "country";
      series.tooltipText = "{valueY.value}";
      if (series.tooltip) series.tooltip.pointerOrientation = "vertical";
      if (series.tooltip) series.tooltip.dy = -6;
      series.columnsContainer.zIndex = 100;

      const columnTemplate = series.columns.template;
      columnTemplate.width = am4core.percent(40);
      columnTemplate.maxWidth = 66;
      columnTemplate.column.cornerRadius(12, 12, 12, 12);
      columnTemplate.strokeOpacity = 0;

      series.heatRules.push({
        target: columnTemplate,
        property: "fill",
        dataField: "valueY",
        min: am4core.color("#5DBA2F"),
        max: am4core.color("#8eca76"),
      });
      series.mainContainer.mask = undefined;

      const cursor = new am4charts.XYCursor();
      chart.cursor = cursor;
      cursor.lineX.disabled = true;
      cursor.lineY.disabled = true;
      cursor.behavior = "none";

      const bullet = columnTemplate.createChild(am4charts.CircleBullet);
      bullet.circle.radius = 30;
      bullet.valign = "bottom";
      bullet.align = "center";
      bullet.isMeasured = true;
      bullet.verticalCenter = "bottom";

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const hoverState = bullet.states.create("hover");
      const outlineCircle = bullet.createChild(am4core.Circle);
      outlineCircle.adapter.add("radius", function (radius, target) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const circleBullet = target.parent;
        return 0;
      });

      const image = bullet.createChild(am4core.Image);
      image.width = 30;
      image.height = 30;
      image.horizontalCenter = "middle";
      image.verticalCenter = "middle";

      image.adapter.add("href", function (href, target) {
        const dataItem = target.dataItem;
        if (dataItem) {
          // @ts-ignore
          return dataItem._dataContext.img;
        }
      });

      image.adapter.add("mask", function (mask, target) {
        const circleBullet = target.parent;
        // @ts-ignore
        return circleBullet.circle;
      });
      // const image = bullet.createChild(am4core.Image);
      // image.width = 30;
      // image.height = 30;
      // image.horizontalCenter = "middle";
      // image.verticalCenter = "middle";

      // image.adapter.add("href", function (href, target) {
      //   if (target.dataItem) {
      //     return target.dataItem?._dataContext?.img;
      //   }
      // });

      // image.adapter.add("mask", function (mask, target) {
      //   let circleBullet = target.parent;
      //   return circleBullet?.circle;
      // });

      // let previousBullet = {};
      // chart.cursor.events.on("cursorpositionchanged", function (event) {
      //   let dataItem = series.tooltipDataItem;

      //   if (dataItem.column) {
      //     let bullet = dataItem.column.children.getIndex(1);

      //     if (previousBullet && previousBullet != bullet) {
      //       previousBullet.isHover = false;
      //     }
      //   }
      // });
    }
  }, [dashboardData]);
  return (
    <div className="relative p-[24px] bg-white rounded-[12px] h-[100%] w-[100%] max-md:mb-[40px]">
      <div className="absolute top-[24px] right-[24px] max-md:top-[10px] max-md:right-[10px]">
        <h1 className="text-info text-oxford-blue-100">
          {`This ${filterType}`}
        </h1>
      </div>
      <h1 className="text-title pb-[15px]">Orders by country</h1>
      {dashboardData ? (
        <div id="ordersByCountry" className="w-[100%] h-[325px]"></div>
      ) : (
        <Loader />
      )}
      <div className="orders-counts">
        {dashboardData
          ? Object.entries(dashboardData?.order_info).map((expected) => {
              return (
                <div className="flex items-center justify-between">
                  <div className="flex items-center max-md:flex-row max-md:items-center">
                    <img
                      src={`https://backadmin.onex.ge/storage/images/warehouses/${expected[1].round_flag}`}
                    />
                    <div className="max-md:hidden max-md:mb-[10px]">
                      <h1 className="text-info font-[500] pr-[12px] pl-[5px]">
                        {expected[0]}
                      </h1>
                    </div>
                    <div className="flex max-md:flex-col">
                      <h1 className="text-info font-[500] pr-[12px] pl-[5px]">{`${expected[1].total} items `}</h1>
                      <div className="flex">
                        <h1 className="text-info font-[500] pr-[12px] pl-[5px]]">{` ${expected[1].total_weight} kg`}</h1>

                        <h1 className="text-info text-green-500 font-[500] pr-[12px] pl-[5px]">{`Avg ${expected[1].avg_weight} kg`}</h1>
                      </div>
                    </div>
                  </div>

                  <div className="flex max-md:flex-col">
                    <div className="flex items-center">
                      {Math.sign(expected[1].percentage_expression) === -1 ? (
                        <LeftBottomArrowIcon />
                      ) : (
                        <TopRightArrowIcon />
                      )}

                      <h1
                        className={`text-info ${
                          Math.sign(expected[1].percentage_expression) === -1
                            ? "text-red-500"
                            : "text-green-500"
                        } pr-[16px] pl-[4px]`}
                      >{`${expected[1].percentage_expression}%`}</h1>
                    </div>

                    <h1 className="text-info pr-[16px] pl-[4px]">{`${
                      Math.sign(expected[1].sum_expression) === -1
                        ? expected[1].sum_expression
                        : "+" + expected[1].sum_expression
                    } since  last ${
                      filterType === "day" ? currentWeekDay : filterType
                    } `}</h1>
                  </div>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}
