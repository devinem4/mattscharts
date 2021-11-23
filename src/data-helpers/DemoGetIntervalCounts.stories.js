import { timeMonth, timeYear } from "d3-time";
import { getIntervalCounts } from "./counts";
import { genHospStays } from "../mock-data/genHospStays";

function DemoGetIntervalCounts({
  numStays,
  randomSeed,
  interval,
  intervalName,
}) {
  const rawData = genHospStays(numStays, randomSeed);
  const counts = getIntervalCounts(rawData, (d) => d.admit, interval);
  return (
    <>
      <h3>
        Here's the {counts.length} rows of generated (fake) counts for interval
        = `{intervalName}`
      </h3>
      <pre>{JSON.stringify(counts, null, 2)}</pre>
    </>
  );
}

export default {
  component: DemoGetIntervalCounts,
  title: "Data-Helpers/getIntervalCounts",
};

const Template = (args) => <DemoGetIntervalCounts {...args} />;
export const timeMonthInterval = Template.bind({});
timeMonthInterval.args = {
  numStays: 111,
  randomSeed: 123,
  interval: timeMonth,
  intervalName: "timeMonth",
};
export const timeYearInterval = Template.bind({});
timeYearInterval.args = {
  numStays: 111,
  randomSeed: 123,
  interval: timeYear,
  intervalName: "timeYear",
};
