import dayjs from "dayjs";
import { timeDay, timeMonth, timeWeek, timeYear } from "d3-time";
import { rollup } from "d3-array";
import { formatDate } from "mock-data/dateHelpers";

export function getIntervalCounts(data, getDate, interval) {
  /* interval is a d3.time interval */
  const rolledUp = rollup(
    data,
    (d) => d.length,
    (d) => interval.floor(dayjs(getDate(d)))
  );

  const counts = [];
  const periods = [...rolledUp.keys()].sort((a, b) => a - b);
  const lastPeriod = periods[periods.length - 1];

  /* iterate over all months in range, assign 0 to any month not in the data */
  interval
    .every(1)
    .range(
      periods[0],
      interval.offset(lastPeriod, 1)
    ) /* range is not stop month inclusive */
    .forEach((d) => {
      counts.push({
        date: formatDate(d),
        count: rolledUp.get(d) || 0,
      });
    });

  return counts;
}

/* short cut function for common intervals */
export function getPeriodCounts(data, getDate, period = "month") {
  const interval =
    period === "day"
      ? timeDay
      : period === "month"
      ? timeMonth
      : period === "week"
      ? timeWeek
      : period === "year"
      ? timeYear
      : null;

  return getIntervalCounts(data, getDate, interval);
}

export function getMonthlyCounts(data, getDate) {
  return getIntervalCounts(data, getDate, timeMonth);
}
