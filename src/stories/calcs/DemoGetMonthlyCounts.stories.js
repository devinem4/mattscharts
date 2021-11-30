import { getMonthlyCounts } from "../../calcs/counts";
import { genHospStays } from "../../mock-data/genHospStays";

function DemoGetMonthlyCounts({ numStays, randomSeed, zeroFill }) {
  const rawData = genHospStays(numStays, randomSeed);
  const data = getMonthlyCounts(rawData, (d) => d.admit);
  return (
    <>
      <h3>Here's {rawData.length} obs aggregated to monthly counts</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}

export default {
  component: DemoGetMonthlyCounts,
  title: "Data-Helpers/getMonthlyCounts",
};

const Template = (args) => <DemoGetMonthlyCounts {...args} />;
export const NoZeroFill = Template.bind({});
NoZeroFill.args = {
  numStays: 111,
  randomSeed: 123,
  zeroFill: false,
};

export const ZeroFilled = Template.bind({});
ZeroFilled.args = {
  numStays: 18,
  randomSeed: 1234,
  zeroFill: true,
};
