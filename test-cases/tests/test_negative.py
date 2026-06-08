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
