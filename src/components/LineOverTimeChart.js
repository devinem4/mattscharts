/* plot how one metric changes over time */
import { LinePath } from "@visx/shape";
import { scaleLinear } from "@visx/scale";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { extent } from "d3-array";
import { BaseChart, getPlotAreaHeight, getPlotAreaWidth } from "./BaseChart";

export function LineOverTimeChart({
  data = [],
  getX = (d) => d.x,
  getY = (d) => d.y,
  ...restProps
}) {
  const innerWidth = getPlotAreaWidth(restProps);
  const innerHeight = getPlotAreaHeight(restProps);

  const xScale = scaleLinear({
    domain: extent(data, getX),
    range: [0, innerWidth],
  });
  const yScale = scaleLinear({
    domain: extent(data, getY),
    range: [innerHeight, 0],
  });

  return (
    <BaseChart {...restProps}>
      <AxisLeft scale={yScale} top={0} left={0} />
      <AxisBottom scale={xScale} top={innerHeight} left={0} />
      <LinePath
        data={data}
        x={(d) => xScale(getX(d))}
        y={(d) => yScale(getY(d))}
        stroke="black"
        strokeWidth={2}
      />
    </BaseChart>
  );
}
