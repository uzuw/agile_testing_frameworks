<h1 align="center">
  Software Testing — Theory & Practice
</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Work_in_Progress-FFA000?style=for-the-badge" />
  <img src="https://img.shields.io/badge/JS-Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" />
  <img src="https://img.shields.io/badge/Python-Pytest-0098D8?style=for-the-badge&logo=pytest&logoColor=white" />
</p>

A hands-on guide to software testing with real code examples in **JavaScript (Jest)** and **Python (Pytest)**. The actual source code and test files live in the [`test-cases/`](./test-cases/) directory.

---

## Project Structure

```
agile_testing_frameworks/
├── testing theory/                    ← Docs & guides
│   ├── intro.md                       ← Core concepts (shared)
│   ├── javascript/
│   │   └── test_cases_jest.md         ← Jest testing guide
│   └── python/
│       └── test_case_pytest.md        ← Pytest testing guide
│
└── test-cases/                        ← Actual source & test files
    ├── .gitignore
    ├── package.json                   ← Jest dependency & scripts
    ├── requirements.txt               ← Pytest dependency
    ├── pyrightconfig.json
    ├── test-cases-guide.pdf
    ├── src/
    │   ├── __init__.py
    │   ├── calculator.js
    │   ├── userService.js
    │   ├── calculator.py
    │   └── user_service.py
    └── tests/
        ├── __init__.py
        ├── README.md
        ├── unit.test.js
        ├── negative.test.js
        ├── integration.test.js
        ├── test_unit.py
        ├── test_negative.py
        └── test_integration.py
```

---

## Installation & Running

### JavaScript (Jest)

```bash
cd test-cases
npm install
npm test            # runs jest --verbose
```

Expected output — one deliberate failure in `unit.test.js`:

```text
PASS tests/integration.test.js
PASS tests/negative.test.js
FAIL tests/unit.test.js
  ● Unit Tests - Calculator › add(2, 3) should return 5
    expect(received).toBe(expected)
    Expected: 9
    Received: 5
```

### Python (Pytest)

```bash
cd test-cases
pip install -r requirements.txt
pytest -v
```

---

## Completed

| # | Topic | Guide | Code |
|:---:|---|---|---|
| 1 | **Testing fundamentals** — what, why, cost of defects, mindset | [`intro.md`](./testing%20theory/intro.md) | — |
| 2 | **Jest — Unit Tests** | [`javascript/test_cases_jest.md`](./testing%20theory/javascript/test_cases_jest.md) | [`test-cases/tests/unit.test.js`](./test-cases/tests/unit.test.js) |
| 3 | **Jest — Negative Tests** | [`javascript/test_cases_jest.md`](./testing%20theory/javascript/test_cases_jest.md) | [`test-cases/tests/negative.test.js`](./test-cases/tests/negative.test.js) |
| 4 | **Jest — Integration Tests** | [`javascript/test_cases_jest.md`](./testing%20theory/javascript/test_cases_jest.md) | [`test-cases/tests/integration.test.js`](./test-cases/tests/integration.test.js) |
| 5 | **Pytest — Unit Tests** | [`python/test_case_pytest.md`](./testing%20theory/python/test_case_pytest.md) | [`test-cases/tests/test_unit.py`](./test-cases/tests/test_unit.py) |
| 6 | **Pytest — Negative Tests** | [`python/test_case_pytest.md`](./testing%20theory/python/test_case_pytest.md) | [`test-cases/tests/test_negative.py`](./test-cases/tests/test_negative.py) |
| 7 | **Pytest — Integration Tests** | [`python/test_case_pytest.md`](./testing%20theory/python/test_case_pytest.md) | [`test-cases/tests/test_integration.py`](./test-cases/tests/test_integration.py) |

---

## Upcoming

| # | Topic | Tool / Framework |
|:---:|---|---|
| 1 | **Black Box Testing** | Equivalence partitioning, boundary value analysis |
| 2 | **White Box Testing** | Statement coverage, branch coverage, path testing |
| 3 | **Regression Testing** | Automating retests on code changes |
| 4 | **System Testing** | Full end-to-end system validation |
| 5 | **Browser Automation** | Selenium, Playwright, Cypress |
| 6 | **API Testing** | Postman, Newman, REST Assured |
| 7 | **Java Testing** | JUnit 5, Mockito, TestNG |
| 8 | **BDD** | Cucumber, Behave, Gherkin |
| 9 | **Performance Testing** | k6, Locust, JMeter |
| 10 | **Security Testing** | OWASP ZAP, Burp Suite |
| 11 | **CI/CD Integration** | GitHub Actions, Jenkins |

---

## Special Thanks

All Jest test case content adapted from **[Pranish Poudel](https://github.com/pranishpaudel)**.  
Check out his original test cases repo:  
[`github.com/pranishpaudel/test-cases`](https://github.com/pranishpaudel/test-cases.git)

---

<p align="center">
  <em>Start from <a href="./testing%20theory/intro.md">Introduction →</a></em>
</p>
