const { add, subtract, multiply } = require("../src/calculator");

describe("Unit Tests - Calculator", () => {
  test("add(2, 3) should return 5", () => {
    expect(add(2, 3)).toBe(9);
  });

  test("subtract(10, 4) should return 6", () => {
    expect(subtract(10, 4)).toBe(6);
  });

  test("multiply(3, 4) should return 12", () => {
    expect(multiply(3, 4)).toBe(12);
  });
});
