import faker from "faker";
import dayjs from "dayjs";
import { formatDate } from "./dateHelpers";

const admissionSources = ["ED", "SDU", "Transport", "Direct Admission"];

export function genHospStays(numStays, randomSeed) {
  if (randomSeed) faker.seed(randomSeed);
  const hospStays = [];
  for (var i = 0; i < numStays; i++) {
    const admit = dayjs(faker.date.between("2021-01-01", "2021-12-31"));
    const los = faker.datatype.number(1000) / 10;
    const discharge = admit.add(los * 24 * 60 * 60, "second");
    hospStays.push({
      id: i,
      name: faker.name.findName(),
      admitSource: faker.random.arrayElement(admissionSources),
      admit: formatDate(admit),
      los: los,
      discharge: formatDate(discharge),
    });
  }
  return hospStays;
}
