import { monthlyCounts } from "./quickStats";
import { genHospStays } from "../mock-data/genHospStays";

function DemoQuickStats({ summaryFunction }) {
  const rawData = genHospStays(10, 123);
  const counts = monthlyCounts(
    rawData,
    (d) => d.admit,
    (d) => d.los
  );
  return (
    <>
      <h3>
        <pre>monthlyCounts(rawData, (d) => d.admit, (d) => d.los)</pre>
        yields:
      </h3>
      <pre>{JSON.stringify(counts, null, 2)}</pre>
      <h3>rawData (fake)</h3>
      <pre>{JSON.stringify(rawData, null, 2)}</pre>
    </>
  );
}

export default {
  component: DemoQuickStats,
  title: "Data-Helpers/DemoQuickStats",
};

const Template = (args) => <DemoQuickStats {...args} />;
export const MonthlyCounts = Template.bind({});
MonthlyCounts.args = {};
