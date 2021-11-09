import { LineOverTimeChart } from "./LineOverTimeChart";
import { genHospStays } from "../mock-data/genHospStays";

export default {
  component: LineOverTimeChart,
  title: "Charts/LineOverTimeChart",
};

const Template = (args) => <LineOverTimeChart {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: genHospStays(30, 123),
  getX: (d) => d.id,
  getY: (d) => d.los,
};

export const Small = Template.bind({});
Small.args = {
  width: 300,
  height: 300,
  ...Default.args,
};

export const NoData = Template.bind({});
NoData.args = {
  ...Default.args,
  data: [],
};
