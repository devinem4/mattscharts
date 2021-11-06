/* plot how one metric changes over time */
import { LinePath } from "@visx/shape";
import { scaleLinear } from "@visx/scale";
import { AxisLeft, AxisBottom } from "@visx/axis";
import { extent } from "d3-array";

export function LineOverTimeChart({
  width = 800,
  height = 480,
  margin = { top: 20, right: 20, bottom: 40, left: 40 },
  data,
  getX,
  getY,
}) {
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = scaleLinear({
    domain: extent(data, getX),
    range: [0, innerWidth],
  });
  const yScale = scaleLinear({
    domain: extent(data, getY),
    range: [innerHeight, 0],
  });

  return (
    <svg width={width} height={height}>
      <rect width="100%" height="100%" fill="beige" />
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <rect width={innerWidth} height={innerHeight} fill="orange" />
        <AxisLeft scale={yScale} top={0} left={0} />
        <AxisBottom scale={xScale} top={innerHeight} left={0} />
        <LinePath
          data={data}
          x={(d) => xScale(d.x)}
          y={(d) => yScale(d.y)}
          stroke="black"
          strokeWidth={2}
        />
      </g>
    </svg>
  );
}
