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
