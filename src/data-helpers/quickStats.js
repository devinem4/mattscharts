import dayjs from "dayjs";
import { count, min, max, quantileSorted, rollup } from "d3-array";
import { timeMonth } from "d3-time";
import { formatDate } from "../mock-data/dateHelpers";

export function zeroFillMissingData(rolledUp, interval) {
  const dates = [...rolledUp.keys()];
  const minDate = min(dates, (d) => d.date);
  const maxDate = max(dates, (d) => d.date);
  const dateRange = interval.range(dayjs(minDate), dayjs(maxDate));

  dateRange.forEach((date) => {
    rolledUp.has(date) || rolledUp.set(date, 0);
  });

  return rolledUp;
}

export function rollupAndSummarize(
  data,
  timeInterval,
  dateAcc,
  summaryFunc,
  valueAcc,
  zeroFill = false
) {
  const rolledUp = rollup(
    data,
    (d) => summaryFunc(d, valueAcc),
    (d) => timeInterval.floor(dayjs(dateAcc(d)))
  );
  console.log("rolledUp", rolledUp);

  if (zeroFill) {
    rolledUp = zeroFillMissingData(rolledUp, timeInterval);
  }

  return [...rolledUp.keys()]
    .map((keyDate) => ({
      date: formatDate(keyDate),
      value: rolledUp.get(keyDate),
    }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export function monthlyCounts(data, dateAcc, valueAcc, zeroFill = false) {
  return rollupAndSummarize(
    data,
    timeMonth,
    dateAcc,
    count,
    valueAcc,
    zeroFill
  );
}

export function calcBoxPlotStats(data, valueAcc) {
  /* d3 uses the R-7 type of quantile calculations 
  https://en.wikipedia.org/wiki/Quantile */
  const values = data.map((d) => valueAcc(d)).sort((a, b) => a - b);
  const q1 = quantileSorted(values, 0.25);
  const median = quantileSorted(values, 0.5);
  const q3 = quantileSorted(values, 0.75);
  const iqr = q3 - q1;
  const whiskerMin = values.filter((d) => d >= q1 - 1.5 * iqr)[0];
  const whiskerMax = values.filter((d) => d <= q3 + 1.5 * iqr).slice(-1)[0];
  const outliers = values.filter((d) => d < whiskerMin || d > whiskerMax);
  return { whiskerMin, q1, median, q3, whiskerMax, outliers };
}
