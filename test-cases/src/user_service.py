users = []


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


def get_users():
    return users


def find_user_by_email(email):
    for u in users:
        if u["email"] == email:
            return u
    return None


def clear_users():
    users.clear()
