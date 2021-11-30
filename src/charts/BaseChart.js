export const defaults = {
  width: 800,
  height: 480,
  margin: { top: 20, right: 20, bottom: 40, left: 40 },
  chartBackground: "hotpink",
  plotBackground: "lightblue",
};

export const getPlotAreaWidth = ({
  width = defaults.width,
  margin = defaults.margin,
}) => width - margin.left - margin.right;

export const getPlotAreaHeight = ({
  height = defaults.width,
  margin = defaults.margin,
}) => height - margin.top - margin.bottom;

export function BaseChart({
  width = defaults.width,
  margin = defaults.margin,
  height = defaults.width,
  chartBackground = defaults.chartBackground,
  plotBackground = defaults.plotBackground,
  children,
}) {
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  return (
    <svg width={width} height={height}>
      <rect width="100%" height="100%" fill={chartBackground} />
      <g transform={`translate(${margin.left}, ${margin.top})`}>
        <rect width={innerWidth} height={innerHeight} fill={plotBackground} />
        {children}
      </g>
    </svg>
  );
}

export function NoDataChart({ message = "No Data", ...restProps }) {
  const innerWidth = getPlotAreaWidth(restProps);
  const innerHeight = getPlotAreaHeight(restProps);

  return (
    <BaseChart {...restProps}>
      <text
        x={innerWidth / 2}
        y={innerHeight / 2}
        textAnchor="middle"
        alignmentBaseline="middle"
        fontSize="20"
        fontWeight="bold"
        fill="black"
      >
        {message}
      </text>
    </BaseChart>
  );
}
