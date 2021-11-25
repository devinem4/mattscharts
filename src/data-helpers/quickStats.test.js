import { timeMonth, timeYear } from "d3-time";
import { count, sum } from "d3-array";
import { rollupAndSummarize, monthlyCounts } from "./quickStats";

const sampleData = [
  { admit: "2020-01-05 12:00:00", patients: 3 },
  { admit: "2020-01-08 18:00:00", patients: 2 },
  { admit: "2020-02-05 12:00:00", patients: 3 },
  { admit: "2020-04-05 12:00:00", patients: 3 },
  { admit: "2020-04-05 13:00:00", patients: 2 },
  { admit: "2020-05-05 12:00:00", patients: 3 },
  { admit: "2020-06-05 12:00:00", patients: 1 },
  { admit: "2020-04-07 12:00:00", patients: 3 },
];

test("total rollupAndSummarize with counts", () => {
  const counts = rollupAndSummarize(
    sampleData,
    timeMonth,
    (d) => d.admit,
    count,
    (d) => d.patients
  );
  expect(counts[0].date).toBe("2020-01-01 00:00:00");
  expect(counts[0].value).toBe(2);
  expect(counts[1].date).toBe("2020-02-01 00:00:00");
  expect(counts[1].value).toBe(1);
  expect(counts[2].date).toBe("2020-04-01 00:00:00");
  expect(counts[2].value).toBe(3);
});

test("monthlyCount == rollupAndSummarize with timeMonth and counts", () => {
  const counts = rollupAndSummarize(
    sampleData,
    timeMonth,
    (d) => d.admit,
    count,
    (d) => d.patients
  );
  const counts2 = monthlyCounts(
    sampleData,
    (d) => d.admit,
    (d) => d.patients
  );
  counts.forEach((_, i) => {
    expect(counts[i].date).toBe(counts2[i].date);
    expect(counts[i].value).toBe(counts2[i].value);
  });
});

test("total rollupAndSummarize with sum", () => {
  const counts = rollupAndSummarize(
    sampleData,
    timeMonth,
    (d) => d.admit,
    sum,
    (d) => d.patients
  );
  expect(counts[0].date).toBe("2020-01-01 00:00:00");
  expect(counts[0].value).toBe(5);
  expect(counts[1].date).toBe("2020-02-01 00:00:00");
  expect(counts[1].value).toBe(3);
  expect(counts[2].date).toBe("2020-04-01 00:00:00");
  expect(counts[2].value).toBe(8);
});
