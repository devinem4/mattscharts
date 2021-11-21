import dayjs from "dayjs";
import { timeMonth } from "d3-time";
import { extent } from "d3-array";
import { genHospStays } from "../mock-data/genHospStays";
import { getMonthlyCounts } from "./counts";

const seededData = genHospStays(50);
const monthlyCounts = getMonthlyCounts(seededData, (d) => d.admit);
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
