const activeUsers: { username: string; socketID: string }[] = [];

export const checkIfUserIsActive = (name: string) => {
  const existingUser = activeUsers.find((user) => user.username === name);

  if (existingUser) return true;

  return false;
};

export const addUser = (
  name: string,
  socketID: string
): { username: string | undefined; error: string | undefined } => {
  const existingUser = activeUsers.find((user) => user.username === name);

  if (existingUser) return { username: undefined, error: "Username is taken" };

  const newUser = { username: name, socketID: socketID };

  activeUsers.push(newUser);

  return { username: newUser.username, error: undefined };
};

export const removeUser = (id: string) => {};
