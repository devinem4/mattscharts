import dayjs from "dayjs";
import { timeMonth, timeYear } from "d3-time";
import { extent } from "d3-array";
import { genHospStays } from "../mock-data/genHospStays";
import { getIntervalCounts, getPeriodCounts, getMonthlyCounts } from "./counts";

const seededData = genHospStays(50);
const monthlyCounts = getMonthlyCounts(seededData, (d) => d.admit);
const periodCounts = getPeriodCounts(seededData, (d) => d.admit, "month");
const periodCountsDay = getPeriodCounts(seededData, (d) => d.admit, "day");
const intervalCounts = getIntervalCounts(seededData, (d) => d.admit, timeMonth);
const intervalCountsYear = getIntervalCounts(
  seededData,
  (d) => d.admit,
  timeYear
);

const seededData2 = genHospStays(8);
const monthlyCounts2 = getMonthlyCounts(seededData2, (d) => d.admit);

test("total admits == number of rows", () => {
  const sum = monthlyCounts.reduce((acc, curr) => acc + curr.count, 0);
  expect(seededData.length).toBe(sum);
});

test("full range of months reported", () => {
  const [firstMonth, lastMonth] = extent(seededData2, (d) =>
    timeMonth.floor(dayjs(d.admit))
  );

  expect(monthlyCounts2.length).toBe(
    timeMonth.count(firstMonth, lastMonth) + 1
  );
});

test("monthlyCounts returns the same as periodCounts with period = month", () => {
  periodCounts.forEach((p, i) => {
    expect(p.date).toBe(monthlyCounts[i].date);
    expect(p.count).toBe(monthlyCounts[i].count);
  });
});

test("getIntervalCounts for timeMonth returns the same as periodCounts with period = month", () => {
  intervalCounts.forEach((p, i) => {
    expect(p.date).toBe(monthlyCounts[i].date);
    expect(p.count).toBe(monthlyCounts[i].count);
  });
});

test("getIntervalCounts for timeYear returns the same total as periodCounts with period = day", () => {
  const daysum = periodCountsDay.reduce((acc, curr) => acc + curr.count, 0);
  const yearsum = intervalCountsYear.reduce((acc, curr) => acc + curr.count, 0);
  expect(daysum).toBe(yearsum);
});
