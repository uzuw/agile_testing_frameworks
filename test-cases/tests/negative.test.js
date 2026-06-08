const { divide } = require("../src/calculator");
const { registerUser, clearUsers } = require("../src/userService");

describe("Negative Tests - Invalid Inputs", () => {
  beforeEach(() => {
    clearUsers();
  });

  test("divide(10, 0) should throw 'Cannot divide by zero'", () => {
    expect(() => divide(10, 0)).toThrow("Cannot divide by zero");
  });

  test("registerUser with empty name should throw error", () => {
    expect(() => registerUser("", "ram@gmail.com")).toThrow(
      "Name and email are required"
    );
  });

  test("registerUser with empty email should throw error", () => {
    expect(() => registerUser("Ram", "")).toThrow(
      "Name and email are required"
    );
  });

  test("registerUser with invalid email format should throw error", () => {
    expect(() => registerUser("Ram", "ramgmail.com")).toThrow(
      "Invalid email format"
    );
  });
});
