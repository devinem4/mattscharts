import dayjs from "dayjs";
import { timeMonth } from "d3-time";
import { rollup } from "d3-array";
import { formatDate } from "../mock-data/dateHelpers";

export function getMonthlyCounts(data, getDate) {
  const rolledUp = rollup(
    data,
    (d) => d.length,
    (d) => timeMonth.floor(dayjs(getDate(d)))
  );

  const counts = [];
  const months = [...rolledUp.keys()].sort((a, b) => a - b);
  const lastMonth = months[months.length - 1];

  /* iterate over all months in range, assign 0 to any month not in the data */
  timeMonth
    .every(1)
    .range(
      months[0],
      timeMonth.offset(lastMonth, 1)
    ) /* range is not stop month inclusive */
    .forEach((d) => {
      counts.push({
        date: formatDate(d),
        count: rolledUp.get(d) || 0,
      });
    });

  return counts;
}
