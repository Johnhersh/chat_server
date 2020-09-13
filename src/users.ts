const users: { username: string }[] = [];

export const addUser = (name: string): {username: string | undefined, error: string | undefined} => {
  const existingUser = users.find((user) => user.username === name);

  if (existingUser) return { username: undefined, error: "Username is taken" };

  const newUser = { username: name };

  users.push(newUser);

  return {username: newUser.username, error: undefined};
};
