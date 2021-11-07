import faker from "faker";
import dayjs from "dayjs";

const standardDateFormat = "YYYY-MM-DD HH:mm:00";
const formatDate = (date) => dayjs(date).format(standardDateFormat);

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
      admit: formatDate(admit),
      los,
      discharge: formatDate(discharge),
    });
  }
  return hospStays;
}
