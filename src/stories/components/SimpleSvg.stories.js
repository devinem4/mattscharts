import { SimpleSvg } from "../../components/SimpleSvg";

export default {
  component: SimpleSvg,
  title: "Charts/SimpleSvg",
};

const Template = (args) => <SimpleSvg {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  width: "100",
  height: "100",
};
