import faker from "faker";
import dayjs from "dayjs";
import { formatDate } from "mock-data/dateHelpers";

const genLos = (min, max) => {
  return () =>
    faker.datatype.number({
      min: min * 1000,
      max: max * 1000,
    }) / 1000;
};

const units = [
  {
    name: "ED",
    genLos: genLos(0.05, 1),
    nextStops: ["NICU", "CICU", "Floor", "Discharge"],
  },
  {
    name: "SDU",
    genLos: genLos(0.2, 1),
    nextStops: ["NICU", "CICU"],
  },
  {
    name: "CICU",
    genLos: genLos(5, 50),
    nextStops: ["Floor", "Discharge"],
  },
  {
    name: "NICU",
    genLos: genLos(8, 80),
    nextStops: ["ITCU", "CICU", "Floor", "Discharge"],
  },
  {
    name: "ITCU",
    genLos: genLos(3, 7),
    nextStops: ["Discharge", "Floor", "NICU"],
  },
  {
    name: "Floor",
    genLos: genLos(2, 8),
    nextStops: ["Discharge"],
  },
];

/* each patient stay is going to have one to many adt rows */
export function genAdtLogs(numStays, randomSeed) {
  if (randomSeed) faker.seed(randomSeed);
  const adtLogs = [];
  for (var i = 0; i < numStays; i++) {
    const name = faker.name.findName();
    var admit = dayjs(faker.date.between("2021-01-01", "2021-12-31"));
    var nextStop = faker.random.arrayElement(units).name;
    do {
      const unit = units.find((unit) => unit.name === nextStop);
      const los = unit.genLos();
      const discharge = admit.add(los * 24 * 60 * 60, "second");
      adtLogs.push({
        id: i,
        name: name,
        unit: unit.name,
        admit: formatDate(admit),
        los: los,
        discharge: formatDate(discharge),
      });
      nextStop = faker.random.arrayElement(unit.nextStops);
      admit = discharge.add(1, "minute");
    } while (nextStop !== "Discharge");
  }
  return adtLogs;
}
