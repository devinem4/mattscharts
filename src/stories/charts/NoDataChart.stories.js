import { NoDataChart } from "charts/BaseChart";

export default {
  component: NoDataChart,
  title: "Charts/NoData",
};

const Template = (args) => <NoDataChart {...args} />;

export const Default = Template.bind({});
Default.args = {};

export const CustomMessage = Template.bind({});
CustomMessage.args = {
  message: "I'm a custom message.",
};

export const Small = Template.bind({});
Small.args = {
  width: 300,
  height: 300,
};
