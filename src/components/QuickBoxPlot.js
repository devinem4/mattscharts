import { extent } from "d3-array";
import { timeMonth } from "d3-time";
import { scaleLinear, scaleBand } from "@visx/scale";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { BoxPlot as VisxBoxPlot } from "@visx/stats";
import {
  calcBoxPlotStats,
  rollupAndSummarize,
} from "../data-helpers/quickStats";
import {
  BaseChart,
  NoDataChart,
  getPlotAreaHeight,
  getPlotAreaWidth,
} from "./BaseChart";

export function BoxPlotMonthly({ data = [], valueAcc, dateAcc, ...restProps }) {
  if (data.length === 0) {
    return <NoDataChart {...restProps} />;
  }

  const monthlyData = rollupAndSummarize(
    data,
    timeMonth,
    dateAcc,
    calcBoxPlotStats,
    valueAcc
  );

  const innerWidth = getPlotAreaWidth(restProps);
  const innerHeight = getPlotAreaHeight(restProps);

  const xScale = scaleBand({
    domain: monthlyData.map((d) => d.date.slice(0, 7)),
    range: [0, innerWidth],
    padding: 0.5,
  });
  const yScale = scaleLinear({
    domain: extent(data, valueAcc),
    range: [innerHeight, 0],
  });

  return (
    <>
      <BaseChart {...restProps}>
        <AxisBottom scale={xScale} top={innerHeight} left={0} />
        <AxisLeft scale={yScale} top={0} left={0} />
        {monthlyData.map((month, i) => (
          <VisxBoxPlot
            key={month.date}
            valueScale={yScale}
            left={xScale(month.date.slice(0, 7))}
            boxWidth={xScale.bandwidth()}
            min={month.value.whiskerMin}
            max={month.value.whiskerMax}
            firstQuartile={month.value.q1}
            thirdQuartile={month.value.q3}
            median={month.value.median}
            fill="#FFFFFF"
            fillOpacity={0.3}
            stroke="#FFFFFF"
            strokeWidth={2}
            outliers={month.value.outliers}
          />
        ))}
        */}
      </BaseChart>
    </>
  );
}
