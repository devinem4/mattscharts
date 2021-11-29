import { calcBoxPlotStats } from "../data-helpers/quickStats";
import { BoxPlotMonthly } from "./QuickBoxPlot";
import { genHospStays } from "../mock-data/genHospStays";

function DemoQuickBoxPlot({}) {
  const rawData = genHospStays(111, 123);
  return (
    <>
      <h3>Here's {rawData.length} obs summarized to a boxPlot:</h3>
      <pre>
        {`
const rawData = genHospStays(111, 123);
<BoxPlotMonthly
  data={rawData}
  valueAcc={(d) => d.los}
  dateAcc={(d) => d.admit}
/>`}
      </pre>
      <BoxPlotMonthly
        data={rawData}
        valueAcc={(d) => d.los}
        dateAcc={(d) => d.admit}
      />
    </>
  );
}
export default {
  component: DemoQuickBoxPlot,
  title: "Charts/QuickBoxPlot",
};

const Template = (args) => <DemoQuickBoxPlot {...args} />;
export const Default = Template.bind({});
Default.args = {};
