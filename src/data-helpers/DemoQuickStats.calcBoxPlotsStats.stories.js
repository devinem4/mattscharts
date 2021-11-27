import { calcBoxPlotStats } from "./quickStats";
import { genHospStays } from "../mock-data/genHospStays";

function DemoQuickStatsCalcBoxPlotStats({}) {
  const rawData = genHospStays(10, 123);
  /* force an outlier in the data */
  rawData.push({
    id: 99,
    name: "Tony Outlier",
    admitSource: "Transport",
    admit: "2021-09-11 08:21:00",
    los: 1000,
    discharge: "2021-11-21 14:33:00",
  });
  const boxPlotStats = calcBoxPlotStats(rawData, (d) => d.los);
  return (
    <>
      <h3>
        <pre>
          const rawData = genHospStays(10, 123);{"\n"}calcBoxPlotStats(rawData,
          (d) =&gt; d.los);
        </pre>
      </h3>
      <pre>{JSON.stringify(boxPlotStats, null, 2)}</pre>
      <h3>rawData.slice(0, 3)</h3>
      <pre>{JSON.stringify(rawData.slice(0, 3), null, 2)}</pre>
    </>
  );
}

export default {
  component: DemoQuickStatsCalcBoxPlotStats,
  title: "Data-Helpers/CalcBoxPlotStats",
};

const Template = (args) => <DemoQuickStatsCalcBoxPlotStats {...args} />;
export const BoxPlotStats = Template.bind({});
BoxPlotStats.args = {};
