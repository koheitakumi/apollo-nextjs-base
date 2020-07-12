interface User {
  email: string;
  password: string;
}
const userList: User[] = [];

function findUser(email: string | undefined): User | null {
  if (!email) return null;
  return userList.find((i) => i.email === email);
}

function addUser(email: string, hashedPassword: string): User {
  const user: User = { email, password: hashedPassword };
  userList.push(user);
  return user;
}

export default {
  findUser,
  addUser,
};
