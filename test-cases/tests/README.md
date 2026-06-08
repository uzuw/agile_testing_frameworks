
<h1 align="center">
  🧪 Software Testing — Theory & Practice
</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Work_in_Progress-FFA000?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Language-JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" />
  <img src="https://img.shields.io/badge/Language-Python-3776AB?style=for-the-badge&logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/Framework-Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" />
  <img src="https://img.shields.io/badge/Framework-Pytest-0098D8?style=for-the-badge&logo=pytest&logoColor=white" />
</p>

---

## 📁 Project Structure

```
testing theory/
├── README.md                         ← You are here
├── intro.md                          ← Core testing concepts (shared)
├── javascript/
│   └── test_cases_jest.md            ← Jest testing guide (JS)
├── python/
│   └── test_case_pytest.md           ← Pytest testing guide (Python)
└── .vscode/
    └── settings.json
```

---

## ✅ Progress Checklist

### Completed

| # | Topic | Files |
|:---:|---|---|
| 1 | **Testing fundamentals** — what, why, cost of defects, mindset | [`intro.md`](./intro.md) |
| 2 | **Test case anatomy** — AAA pattern, input/action/expected output | [`intro.md`](./intro.md) |
| 3 | **Jest (JavaScript)** — unit, negative, integration, E2E tests | [`javascript/test_cases_jest.md`](./javascript/test_cases_jest.md) |
| 4 | **Pytest (Python)** — parametrized tests, fixtures, mocking, marks, discovery | [`python/test_case_pytest.md`](./python/test_case_pytest.md) |

### Coming Up Next

| # | Topic | Tool / Framework | Status |
|:---:|---|---|:---:|
| 5 | **Black Box Testing** | Equivalence partitioning, boundary value analysis | 📝 Planned |
| 6 | **White Box Testing** | Statement coverage, branch coverage, path testing | 📝 Planned |
| 7 | **Regression Testing** | Automating retests on code changes | 📝 Planned |
| 8 | **System Testing** | Full end-to-end system validation | 📝 Planned |
| 9 | **Selenium** | Browser automation for web apps (Java/Python) | 📝 Planned |
| 10 | **Playwright** | Cross-browser testing (Microsoft) | 📝 Planned |
| 11 | **JUnit** | Unit testing for Java | 📝 Planned |
| 12 | **Postman / Newman** | API testing & collection runner | 📝 Planned |
| 13 | **Cypress** | Frontend E2E testing | 📝 Planned |
| 14 | **Behavior-Driven Development (BDD)** | Cucumber, Gherkin syntax | 📝 Planned |
| 15 | **Performance & Load Testing** | k6, Locust, JMeter | 📝 Planned |
| 16 | **Security Testing** | OWASP, vulnerability scanning | 📝 Planned |
| 17 | **CI/CD Integration** | GitHub Actions, Jenkins pipelines | 📝 Planned |

---

## 🚀 Quick Start

### JavaScript (Jest)

```bash
# Install Jest
npm install jest

# Run all tests
npm test
```

### Python (Pytest)

```bash
# Install Pytest
pip install pytest pytest-cov

# Run all tests
pytest

# With coverage
pytest --cov=src --cov-report=html
```

---

## 🙏 Special Thanks

All Jest test case content adapted from **[Pranish Poudel](https://github.com/pranishpaudel)** — check out his original test cases repo:  
🔗 [`pranishpaudel/test-cases`](https://github.com/pranishpaudel/test-cases.git)

---

<p align="center">
  <em>Start from <a href="./intro.md">Introduction →</a></em>
</p>
