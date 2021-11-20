import { genAdtLogs } from "./genAdtLogs";

const seededData = genAdtLogs(5, 123);
const seededData2 = genAdtLogs(3, 321);

test("generates correct stays for the correct number of patients", () => {
  expect(new Set(seededData.map((d) => d.id)).size).toBe(5);
});

test("same data is generated every time when seeded", () => {
  expect(seededData[0].name).toBe("Clara Keebler");
  expect(seededData[1].unit).toBe("NICU");
  expect(seededData[5].name).toBe("Gabriel Frami");
  expect(seededData[9].los).toBe(4.669);
});

test("new rows are generated with a different seed", () => {
  expect(seededData2[0].name).not.toBe("Clara Keebler");
  expect(seededData2[1].unit).not.toBe("NICU");
  expect(seededData2[5].name).not.toBe("Gabriel Frami");
});

test("admit + los == discharge", () => {
  expect(seededData[0].admit).toBe("2021-03-24 09:46:00");
  expect(seededData[0].los).toBe(5.205);
  expect(seededData[0].discharge).toBe("2021-03-29 14:41:00");
});
