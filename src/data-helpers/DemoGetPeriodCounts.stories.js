import { getPeriodCounts } from "./counts";
import { genHospStays } from "../mock-data/genHospStays";

function DemoGetPeriodCounts({ numStays, randomSeed, period }) {
  const rawData = genHospStays(numStays, randomSeed);
  const counts = getPeriodCounts(rawData, (d) => d.admit, period);
  return (
    <>
      <h3>
        Here's the {counts.length} rows of generated (fake) counts for period ={" "}
        {period}
      </h3>
      <pre>{JSON.stringify(counts, null, 2)}</pre>
    </>
  );
}

export default {
  component: DemoGetPeriodCounts,
  title: "Data-Helpers/getPeriodCounts",
};

const Template = (args) => <DemoGetPeriodCounts {...args} />;
export const Day = Template.bind({});
Day.args = {
  numStays: 111,
  randomSeed: 123,
  period: "day",
};
export const Week = Template.bind({});
Week.args = {
  numStays: 111,
  randomSeed: 123,
  period: "week",
};
export const Month = Template.bind({});
Month.args = {
  numStays: 111,
  randomSeed: 123,
  period: "month",
};
export const Year = Template.bind({});
Year.args = {
  numStays: 111,
  randomSeed: 123,
  period: "year",
};
