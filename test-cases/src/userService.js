const users = [];

function registerUser(name, email) {
  if (!name || !email) {
    throw new Error("Name and email are required");
  }

  if (!email.includes("@")) {
    throw new Error("Invalid email format");
  }

  const user = {
    id: users.length + 1,
    name,
    email,
  };

  users.push(user);
  return user;
}

function getUsers() {
  return users;
}

function findUserByEmail(email) {
  return users.find((u) => u.email === email);
}

function clearUsers() {
  users.length = 0;
}

module.exports = { registerUser, getUsers, findUserByEmail, clearUsers };
