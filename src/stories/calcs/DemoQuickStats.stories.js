import { monthlyCounts } from "../../calcs/quickStats";
import { genHospStays } from "../../mock-data/genHospStays";

function DemoQuickStats({}) {
  const rawData = genHospStays(10, 123);
  const counts = monthlyCounts(
    rawData,
    (d) => d.admit,
    (d) => d.los
  );
  return (
    <>
      <h3>
        <pre>
          const rawData = genHospStays(10, 123);{"\n"}monthlyCounts(rawData, (d)
          =&gt; d.admit, (d) =&gt; d.los);
        </pre>
      </h3>
      <pre>{JSON.stringify(counts, null, 2)}</pre>
      <h3>rawData.slice(0, 3)</h3>
      <pre>{JSON.stringify(rawData.slice(0, 3), null, 2)}</pre>
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
