
> Source: All content from [Pranish Poudel](https://github.com/pranishpaudel/test-cases.git)

---

<h1 align="center">
  What is a Test Case?
</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Framework-Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" />
  <img src="https://img.shields.io/badge/Framework-Pytest-0098D8?style=for-the-badge&logo=pytest&logoColor=white" />
</p>

---

> A **test case** is a small experiment we run on our code to check that it behaves the way we **expect**.

## Anatomy of a Test Case

A test case generally consists of **3 parts**:

1. **Input** — what we feed into the function
2. **Action** — calling the function
3. **Expected output** — what we think should come back

If the `actual output` **matches** what we expected, the test **passes**. If not, it **fails** — and Jest will tell us exactly where and why.

---

## Basic Shape of a Jest Test

> Pranish uses **Jest** (a popular JavaScript testing framework from Meta). Later we'll use **Pytest** (a Python testing library).

```javascript
test("description of test", () => {
  const result = add(2, 3);
  expect(result).toBe(5);
});
```

### The AAA Pattern

| Letter | Stands For | Meaning |
|:---:|:---|---|
| **A** | **Arrange** 🎭 | Set up inputs |
| **A** | **Act** 🎬 | Call the function |
| **A** | **Assert** ✅ | Check the result with `expect(...)` |

---

## Types of Tests in This Session

| # | Type | What It Checks | Reference |
|:---:|---|---|:---:|
| 1 | **Unit Test** 🧩 | Does **one function** work on its own? | [`tests/unit.test.js`](../test-cases/tests/unit.test.js) |
| 2 | **Negative Test** 🚫 | Does the code **fail correctly** on bad input? | [`tests/negative.test.js`](../test-cases/tests/negative.test.js) |
| 3 | **Integration Test** 🔗 | Do **multiple pieces** work together? | [`tests/integration.test.js`](../test-cases/tests/integration.test.js) |

---

## 1. Unit Test — Testing One Small Thing

> A **unit test** tests the smallest unit of code — usually a **single function** — in **isolation**.
> No database, no network, no other modules.

### The Code

Find the actual source at [`src/calculator.js`](../test-cases/src/calculator.js):

```javascript
function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error("Cannot divide by zero");
  }
  return a / b;
}
```

### The Unit Test

File: [`tests/unit.test.js`](../test-cases/tests/unit.test.js)

```javascript
const { add, subtract, multiply } = require("../src/calculator");

describe("Unit Tests - Calculator", () => {
  test("add(2, 3) should return 5", () => {
    expect(add(2, 3)).toBe(9);   // deliberate bug — makes test fail!
  });

  test("subtract(10, 4) should return 6", () => {
    expect(subtract(10, 4)).toBe(6);
  });

  test("multiply(3, 4) should return 12", () => {
    expect(multiply(3, 4)).toBe(12);
  });
});
```

> ⚠️ Notice the deliberate bug: `expect(add(2, 3)).toBe(9)` — this test is **expected to fail**, demonstrating a red test.

### Key Takeaways

- We call functions and **assert** the expected results
- The `add` test has a deliberate bug (`expect(...).toBe(9)` instead of `5`) — running it shows a **red test**
- If real logic breaks, the test catches it **immediately**

### When to Write Unit Tests

| Condition | Why |
|:---|---|
| Function has **clear input & output** | Easy to isolate and verify |
| You want **fast feedback** ⚡ | Unit tests run in **milliseconds** |
| You want to **lock in behavior** before refactoring | Safety net for changes |

---

## 2. Negative Tests — Making Sure Bad Input is Rejected

> A **negative test** checks that the code **fails the right way** when given invalid input. You are deliberately feeding it junk.

### The Code

Suppose we have `src/userService.js` for accepting a username & email:

```javascript
function registerUser(name, email) {
  if (!name || !email) {
    throw new Error("Name and email are required");
  }
  if (!email.includes("@")) {
    throw new Error("Invalid email format");
  }
  // ... otherwise create the user
}
```

### The Negative Test

File: [`tests/negative.test.js`](../test-cases/tests/negative.test.js)

```javascript
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
```

> **Note:** The call is wrapped in an arrow function because `toThrow()` needs a function it can call itself — so Jest can **catch the error and inspect it**.

### What Counts as a Negative Case?

| Input | Example |
|:---|---|
| **Empty strings** 🫗 | `""`, `null`, `undefined` |
| **Numbers out of range** 🔢 | Zero divisor, negative ages |
| **Wrong types** 🧬 | String where a number was expected |
| **Malformed values** 🏷️ | Email without `@` |

---

## 3. Integration Tests — Testing Things Together

> A **unit test** looks at one function in isolation. An **integration test** checks that **several functions, modules, or layers cooperate correctly**.

### The Scenario

`registerUser`, `getUsers`, and `findUserByEmail` all share the same in-memory `users` array. A unit test **cannot** tell us if that array is wired up correctly across calls — but an integration test **can**.

### The Integration Test

File: [`tests/integration.test.js`](../test-cases/tests/integration.test.js)

```javascript
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
```

### What This Proves

| Check | Why It Matters |
|:---|---|
| `registerUser` saves into the **same store** that `getUsers` reads from | Shared state works correctly |
| IDs **increment correctly** across calls | No collisions |
| Lookup by email finds the **right record** | Search works |
| A single function passing in isolation **cannot guarantee** any of the above | Integration tests matter |

### Why `beforeEach(clearUsers)`?

> Each test should be **independent** — one test must not leave users in the array that influence the next test's results.

`beforeEach(clearUsers)` **resets the state** before every single test — no test leakage, reliable isolated tests.

---

## E2E Tests
End-to-End (E2E) tests just like name says drive the entire application the way a real user would.
|Test type|What runs|Speed|
| --- | --- | --- |
|Unit|One function in memory|Milliseconds|
|Integration|Several functions / modules together|Fast — usually under a second|
|E2E|Real browser → real server → real database|Seconds to minutes|

### Example E2E scenario (conceptual)
1. Open the browser at http://localhost:3000/signup .
2. Type a name and email into the form.
3. Click the Register button.
4. Assert that the page shows "Welcome, Ram".

Popular E2E tools include:
- Cypress — friendly UI, great for frontend devs.
- Playwright — fast, multi-browser, made by Microsoft.
- Selenium — the original; supports many languages.

> Trade-off: E2E tests give the highest confidence ("the whole app works!") but they are slow and can be flaky. We use them sparingly — only for the most important user journeys.

A healthy project has lots of unit tests at the base, fewer integration tests in the middle, and only a
handful of E2E tests at the top.

### Jest Installation & Running

```bash
cd ../test-cases
npm install
```

Running tests:

```bash
npm test
```

Jest prints a green tick for passing tests and a red cross for failing ones. A typical output looks like:

```text
PASS tests/integration.test.js
PASS tests/negative.test.js
FAIL tests/unit.test.js
  ● Unit Tests - Calculator › add(2, 3) should return 5
  expect(received).toBe(expected)
  Expected: 9
  Received: 5
```

The error tells us which test failed, what we expected, and what we actually got — usually enough to fix the bug in seconds.



<p align="center">
  <em>Back to <a href="../intro.md">Introduction →</a></em>
</p>

