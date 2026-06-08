
> Source: Python testing guide adapted from content by [Pranish Poudel](https://github.com/pranishpoudel)

---

<h1 align="center">
  Testing in Python with Pytest
</h1>

<p align="center">
  <img src="https://img.shields.io/badge/Framework-Pytest-0098D8?style=for-the-badge&logo=pytest&logoColor=white" />
  <img src="https://img.shields.io/badge/Language-Python-3776AB?style=for-the-badge&logo=python&logoColor=white" />
  <img src="https://img.shields.io/badge/ Coverage-Excellent-4CAF50?style=for-the-badge" />
</p>

---

## What is Pytest?

[Pytest](https://docs.pytest.org/) is the **most popular testing framework** for Python. It makes writing tests as simple as writing plain functions with the `assert` keyword — no boilerplate, no classes required (though classes are supported).

### Why Pytest Stands Out

| Feature | What It Gives You |
|:---|---|
| **Minimal syntax** 🎯 | Write `assert a == b` — no `self.assertEqual()` needed |
| **Auto-discovery** 🔍 | Name files `test_*.py` and Pytest finds them automatically |
| **Rich assertions** 🧠 | Failing asserts show **exact values** — no debugger needed |
| **Fixtures** 🔧 | Reusable setup/teardown with dependency injection |
| **Parametrization** 🔁 | Run the same test with **dozens of inputs** in one line |
| **Plugins** 🔌 | 1,000+ plugins for coverage, mocking, Django, Flask, and more |

```python
# This is all you need for a Pytest test
def test_addition():
    assert 2 + 2 == 4
```

When this fails, Pytest prints:

```
>       assert 2 + 2 == 5
E       assert (2 + 2) == 5
E        +  where 4 = 2 + 2
```

---

## The Anatomy of a Test Case

Every test follows the same **AAA** pattern:

| Step | Meaning | Code |
|:---:|---|---|
| **Arrange** 🎭 | Set up inputs and state | `a, b = 2, 3` |
| **Act** 🎬 | Call the function being tested | `result = add(a, b)` |
| **Assert** ✅ | Verify the result | `assert result == 5` |

---

## Parametrized Tests — One Test, Many Inputs

One of Pytest's superpowers: run the **same test logic** across many inputs without duplication.

```python
import pytest
from src.calculator import add


@pytest.mark.parametrize("a, b, expected", [
    (2, 3, 5),
    (-1, 1, 0),
    (0, 0, 0),
    (100, 200, 300),
    (-5, -7, -12),
])
def test_add_with_multiple_inputs(a, b, expected):
    assert add(a, b) == expected
```

This generates **5 separate tests** automatically. When one fails, Pytest reports exactly which input combination broke it.

---

## Fixtures — Reusable Test Setup

Fixtures are Pytest's replacement for `setup`/`beforeEach`. They handle **setup, teardown, and dependency injection** cleanly.

```python
import pytest


@pytest.fixture
def sample_data():
    """Provide fresh test data for each test."""
    return {"name": "Ram", "email": "ram@gmail.com"}


def test_user_has_name(sample_data):
    assert sample_data["name"] == "Ram"


def test_user_has_email(sample_data):
    assert "@" in sample_data["email"]
```

Pytest **injects** the fixture by matching the parameter name. Fixtures can also clean up after themselves using `yield`:

```python
@pytest.fixture
def database():
    db = connect_to_database()
    yield db
    db.close()  # cleanup runs after test finishes
```

---

## Unit Tests — Testing One Small Thing

> A **unit test** checks a **single function** in **isolation** — no database, no network, no other modules.

Find the actual source at [`src/calculator.py`](../test-cases/src/calculator.py):

```python
def add(a, b):
    return a + b


def subtract(a, b):
    return a - b


def multiply(a, b):
    return a * b


def divide(a, b):
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b
```

File: [`tests/test_unit.py`](../test-cases/tests/test_unit.py)

```python
from src.calculator import add, subtract, multiply


class TestUnitCalculator:
    def test_add(self):
        assert add(2, 3) == 5

    def test_subtract(self):
        assert subtract(10, 4) == 6

    def test_multiply(self):
        assert multiply(3, 4) == 12
```

---

## Negative Tests — Breaking Things on Purpose

> Feed bad input. Assert the code **fails correctly**. If it doesn't fail, the test should fail.

See the actual source at [`src/user_service.py`](../test-cases/src/user_service.py):

```python
def register_user(name, email):
    if not name or not email:
        raise ValueError("Name and email are required")

    if "@" not in email:
        raise ValueError("Invalid email format")

    user = {
        "id": len(users) + 1,
        "name": name,
        "email": email,
    }

    users.append(user)
    return user
```

File: [`tests/test_negative.py`](../test-cases/tests/test_negative.py)

```python
import pytest
from src.calculator import divide
from src.user_service import register_user, clear_users


class TestNegativeInvalidInputs:
    def setup_method(self):
        clear_users()

    def test_divide_by_zero(self):
        with pytest.raises(ValueError, match="Cannot divide by zero"):
            divide(10, 0)

    def test_register_empty_name(self):
        with pytest.raises(ValueError, match="Name and email are required"):
            register_user("", "ram@gmail.com")

    def test_register_empty_email(self):
        with pytest.raises(ValueError, match="Name and email are required"):
            register_user("Ram", "")

    def test_register_invalid_email(self):
        with pytest.raises(ValueError, match="Invalid email format"):
            register_user("Ram", "ramgmail.com")
```

---

## Integration Tests — Do Pieces Work Together?

> An **integration test** verifies that multiple functions or modules **cooperate correctly**.

The actual `user_service.py` ([`src/user_service.py`](../test-cases/src/user_service.py)) uses a shared global `users` list. `register_user`, `get_users`, `find_user_by_email`, and `clear_users` all operate on the same data. A unit test **cannot** tell us if that list is wired up correctly across calls — but an integration test **can**.

File: [`tests/test_integration.py`](../test-cases/tests/test_integration.py)

```python
from src.user_service import register_user, get_users, find_user_by_email, clear_users


class TestIntegrationUserRegistration:
    def setup_method(self):
        clear_users()

    def test_register_user_and_save(self):
        user = register_user("Ram", "ram@gmail.com")
        assert user["name"] == "Ram"
        assert user["email"] == "ram@gmail.com"
        assert len(get_users()) == 1

    def test_register_multiple_and_find_by_email(self):
        register_user("Ram", "ram@gmail.com")
        register_user("Sita", "sita@gmail.com")
        assert len(get_users()) == 2
        found_user = find_user_by_email("sita@gmail.com")
        assert found_user is not None
        assert found_user["name"] == "Sita"

    def test_incremental_ids(self):
        user1 = register_user("Ram", "ram@gmail.com")
        user2 = register_user("Sita", "sita@gmail.com")
        assert user1["id"] == 1
        assert user2["id"] == 2
```

---

## Mocking — Isolate Code from External Services

When your code calls external APIs, databases, or file systems, **mocking** lets you test the logic without actually hitting those services.

```python
# src/weather.py
import requests

def get_weather(city):
    response = requests.get(f"https://api.weather.com/{city}")
    return response.json()["temperature"]
```

```python
# tests/test_weather.py
from unittest.mock import patch
from src.weather import get_weather


def test_get_weather_returns_temperature():
    mock_response = {"temperature": 25, "condition": "Sunny"}

    with patch("src.weather.requests.get") as mock_get:
        mock_get.return_value.json.return_value = mock_response

        result = get_weather("Kathmandu")

        assert result == 25
        mock_get.assert_called_once_with("https://api.weather.com/Kathmandu")
```

---

## Skipping and Marking Tests

Pytest lets you **skip** tests or **mark** them for special treatment.

```python
import pytest
import sys


@pytest.mark.skip(reason="Feature not implemented yet")
def test_future_feature():
    ...


@pytest.mark.skipif(sys.version_info < (3, 10), reason="Requires Python 3.10+")
def test_new_syntax():
    ...


@pytest.mark.slow
def test_expensive_computation():
    ...
```

Run with: `pytest -m slow`

---

## Test Discovery — How Pytest Finds Your Tests

Pytest follows a simple convention — no registration needed:

| Rule | Example |
|:---|---|
| Files named `test_*.py` or `*_test.py` | `test_calculator.py` |
| Functions named `test_*` | `def test_add():` |
| Methods named `test_*` inside `Test*` classes | `class TestCalc:` → `def test_add():` |

```
project/
├── src/
│   ├── calculator.py
│   └── user_service.py
└── tests/
    ├── test_calculator.py   ← Pytest finds this
    ├── test_user_service.py  ← and this
    └── helpers.py            ← skipped (no test_ prefix)
```

---

## Running Tests

```bash
# Navigate to the test-cases directory first
cd ../test-cases

# Run all tests
pytest

# Run with verbose output
pytest -v

# Run a specific file
pytest tests/test_unit.py

# Run a specific test
pytest tests/test_unit.py::TestUnitCalculator::test_add

# Run tests matching a keyword
pytest -k "register"

# Run with coverage report
pytest --cov=src --cov-report=html
```

---

> **Tip:** Use `assert` for everything. Pytest's assertion introspection is so good you rarely need custom error messages.

<p align="center">
  <em>Back to <a href="../intro.md">Introduction →</a></em>
</p>
