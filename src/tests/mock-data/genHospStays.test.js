import { genHospStays } from "mock-data/genHospStays";

const seededData = genHospStays(5, 123);
const seededData2 = genHospStays(3, 321);

test("generates correct number of stays", () => {
  expect(seededData.length).toBe(5);
});

test("same names are generated every time when seeded", () => {
  expect(seededData[0].name).toBe("Allen Pollich");
  expect(seededData[1].name).toBe("Lowell Wuckert");
  expect(seededData[4].name).toBe("Tina Kiehn");
});

test("new stays are generated with a different seed", () => {
  expect(seededData2[0].name).not.toBe("Allen Pollich");
  expect(seededData2[0].admit).not.toBe("2021-09-11 08:21:00");
  expect(seededData2[0].los).not.toBe(71.3);
  expect(seededData2[1].name).not.toBe("Ben Satterfield");
});

test("admit + los == discharge", () => {
  expect(seededData[0].admit).toBe("2021-09-11 08:21:00");
  expect(seededData[0].los).toBe(71.3);
  expect(seededData[0].discharge).toBe("2021-11-21 14:33:00");
});
