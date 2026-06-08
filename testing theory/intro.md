
> Source: Course materials on software testing fundamentals

---

<h1 align="center">
  Testing in Software Development
</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Concept-Introductory-6A1B9A?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Difficulty-Beginner-4CAF50?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Focus-Quality_Assurance-FF6F00?style=for-the-badge" />
</p>

<p align="center">
  <img src="https://images.ctfassets.net/23aumh6u8s0i/5wVBG4E2ihTfP4Wc8AKMqs/25da1b2f4dafb1ac3356acdaf9f3f27b/software-testing" alt="Software Testing" width="600"/>
</p>

---

## What is Testing?

> Software testing is the process of **evaluating and verifying** that a software application does what it's supposed to do.

At its core, testing answers **two fundamental questions**:

| Question | Type |
|:---|:---|
| Does the software do what we **intended**? | Validation |
| Does it do it **correctly**, without defects? | Verification |

---

## Why Do We Test?

> Software has **bugs** — this is inevitable. The goal of testing isn't to prove software is perfect, but to **find problems early**, when they're cheap to fix.

### The Cost of Defects Curve

Consider the cost of a bug found at different stages:

| Stage Found | Relative Cost |
|:---|---:|
| During Design | **1x** |
| During Development | **10x** |
| During Testing | **100x** |
| In Production | **1,000x** |

<p align="center"><strong>The later you find a bug, the more expensive it is.</strong></p>

---

## Core Concepts

### Failure vs. Defect vs. Error

| Term | Definition |
|:---|---|
| **Error** 🧑‍💻 | A **human mistake** — a developer misunderstands a requirement |
| **Defect** (Bug) 🐛 | The **flawed code** that results from that mistake |
| **Failure** 💥 | What the **user sees** when that defect is triggered at runtime |

---

### Test Case

> A test case is a specific scenario with a **defined input**, **expected output**, and the **actual output**. If `actual != expected`, the test **fails**.

```
  Input ──▶ Function ──▶ Actual Output
                              │
                     ┌───────▼───────┐
                     │ Expected vs.  │
                     │  Actual Match │
                     │  Pass / Fail  │
                     └───────────────┘
```

### Test Suite

> A collection of **test cases grouped together** — usually around a feature or module.

---

## The Testing Mindset

> Good testing requires a **destructive mindset** — you're trying to **break** the software, not confirm it works.

This is **counterintuitive** for developers who just built something and want it to succeed.

### Key Principles

1. Testing shows the **presence** of bugs, not their **absence** — *Dijkstra*
2. You can **never test everything** — good testers prioritize **risk**
3. Testing is most effective when **independent** from development

---

## What Can Be Tested?

Testing covers **more than just** *"does it run"*:

| Category | Question |
|:---|---:|
| **Functionality** ✅ | Does it do the **right** thing? |
| **Performance** ⚡ | Does it do it **fast enough**? |
| **Security** 🔒 | Can it be **exploited**? |
| **Usability** 🖐️ | Can users **actually use** it? |
| **Reliability** 🔄 | Does it work **consistently** over time? |

---

<p align="center">
  <em>Next: <a href="./python/test_case_pytest.md">Pytest Guide →</a> · <a href="./javascript/test_cases_jest.md">Jest Guide →</a></em>
</p>
