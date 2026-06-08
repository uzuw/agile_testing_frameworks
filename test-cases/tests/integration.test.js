const {
  registerUser,
  getUsers,
  findUserByEmail,
  clearUsers,
} = require("../src/userService");

describe("Integration Tests - User Registration Flow", () => {
  beforeEach(() => {
    clearUsers();
  });

  test("should register a user and save it in the users list", () => {
    const user = registerUser("Ram", "ram@gmail.com");

    expect(user.name).toBe("Ram");
    expect(user.email).toBe("ram@gmail.com");
    expect(getUsers().length).toBe(1);
  });

  test("should register multiple users and find them by email", () => {
    registerUser("Ram", "ram@gmail.com");
    registerUser("Sita", "sita@gmail.com");

    expect(getUsers().length).toBe(2);

    const foundUser = findUserByEmail("sita@gmail.com");
    expect(foundUser).toBeDefined();
    expect(foundUser.name).toBe("Sita");
  });

  test("should assign incremental IDs to each registered user", () => {
    const user1 = registerUser("Ram", "ram@gmail.com");
    const user2 = registerUser("Sita", "sita@gmail.com");

    expect(user1.id).toBe(1);
    expect(user2.id).toBe(2);
  });
});
