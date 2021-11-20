import { genAdtLogs } from "./genAdtLogs";

function DemoAdtLogs({ numStays, randomSeed }) {
  const data = genAdtLogs(numStays, randomSeed);
  return (
    <>
      <h3>
        Here's {data.length} generated (fake) adt logs using seed {randomSeed}
      </h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}

export default {
  component: DemoAdtLogs,
  title: "Mock-Data/genAdtLogs",
};

const Template = (args) => <DemoAdtLogs {...args} />;
export const Sample = Template.bind({});
Sample.args = {
  numStays: 5,
  randomSeed: 123,
};
