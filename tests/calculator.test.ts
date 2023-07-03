import { calculate } from "../utils/";

const BASE_NUMBER = 0;

test("if level 1 to 10 is greater than 0", () => {
  expect(calculate(1, 10, 0)).toBeGreaterThan(BASE_NUMBER);
});

test("if level 100 to 80 is less than 0", () => {
  expect(calculate(100, 80, 0)).toBeLessThan(BASE_NUMBER);
});

test("if level 80 to 80 is equal to 0", () => {
  expect(calculate(80, 80, 0)).toEqual(BASE_NUMBER);
});

test("if level 80 to 81 with 9 extra stars is equal to 1", () => {
  expect(calculate(80, 81, 9)).toEqual(1);
});
