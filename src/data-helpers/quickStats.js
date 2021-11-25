import dayjs from "dayjs";
import { count, max, rollup } from "d3-array";
import { timeMonth } from "d3-time";
import { formatDate } from "../mock-data/dateHelpers";

export function rollupAndSummarize(
  data,
  timeInterval,
  dateAcc,
  summaryFunc,
  valueAcc
) {
  const rolledUp = rollup(
    data,
    (d) => summaryFunc(d, valueAcc),
    (d) => timeInterval.floor(dayjs(dateAcc(d)))
  );
  console.log("rolledUp", rolledUp);

  return [...rolledUp.keys()]
    .map((keyDate) => ({
      date: formatDate(keyDate),
      value: rolledUp.get(keyDate),
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function monthlyCounts(data, dateAcc, valueAcc) {
  return rollupAndSummarize(data, timeMonth, dateAcc, count, valueAcc);
}
