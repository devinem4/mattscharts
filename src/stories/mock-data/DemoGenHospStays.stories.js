import { genHospStays } from "mock-data/genHospStays";

function DemoHospStays({ numStays, randomSeed }) {
  const data = genHospStays(numStays, randomSeed);
  return (
    <>
      <h3>
        Here's {data.length} generated (fake) hospital stays using seed{" "}
        {randomSeed}
      </h3>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </>
  );
}

export default {
  component: DemoHospStays,
  title: "Mock-Data/genHospStays",
};

const Template = (args) => <DemoHospStays {...args} />;
export const Sample = Template.bind({});
Sample.args = {
  numStays: 5,
  randomSeed: 123,
};
