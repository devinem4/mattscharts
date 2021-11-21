import { getMonthlyCounts } from "./counts";
import { genHospStays } from "../mock-data/genHospStays";

function DemoGetMonthlyCounts({ numStays, randomSeed }) {
  const rawData = genHospStays(numStays, randomSeed);
  const data = getMonthlyCounts(rawData, (d) => d.admit);
  return (
    <>
      <h3>Here's {rawData.length} generated (fake) from monthly counts</h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}

export default {
  component: DemoGetMonthlyCounts,
  title: "Data-Helpers/getMonthlyCounts",
};

const Template = (args) => <DemoGetMonthlyCounts {...args} />;
export const Sample = Template.bind({});
Sample.args = {
  numStays: 111,
  randomSeed: 123,
};
