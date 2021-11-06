import { LineOverTimeChart } from "../../components/LineOverTimeChart";

export default {
  component: LineOverTimeChart,
  title: "Charts/LineOverTimeChart",
};

const Template = (args) => <LineOverTimeChart {...args} />;

export const Default = Template.bind({});
Default.args = {
  data: [
    { x: 0, y: 50 },
    { x: 10, y: 100 },
    { x: 200, y: 200 },
    { x: 250, y: 125 },
    { x: 300, y: 105 },
  ],
  getX: (d) => d.x,
  getY: (d) => d.y,
};

export const Small = Template.bind({});
Small.args = {
  width: 300,
  height: 300,
  ...Default.args,
};

export const Tiny = Template.bind({});
Tiny.args = {
  width: 75,
  height: 75,
  ...Default.args,
};
