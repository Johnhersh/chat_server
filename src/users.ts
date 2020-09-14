const activeUsers: { username: string; socketID: string }[] = [];

export const checkIfUserIsActive = (name: string) => {
  const existingUser = activeUsers.find((user) => user.username === name);

  if (existingUser) return true;

  return false;
};

export const addUser = (name: string, socketID: string) => {
  const newUser = { username: name, socketID: socketID };

  activeUsers.push(newUser);
};

export const getActiveUsers = () => {
  let activeUsersList: string[] = [];

  activeUsers.forEach((user) => {
    activeUsersList.push(user.username);
  });

  return activeUsersList;
};

export const removeUser = (id: string) => {};
