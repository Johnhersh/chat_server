const activeUsers: { username: string; socketID: string }[] = [];

export const checkIfUserIsActive = (name: string) => {
  const existingUser = activeUsers.find((user) => user.username === name);

  if (existingUser) return true;

  return false;
};

export const addUser = (name: string, socketID: string) => {
  const newUser = { username: name, socketID: socketID };

  if (!checkIfUserIsActive(name)) {
    activeUsers.push(newUser); // This is needed in case someone refreshes the page and this gets called twice
    console.log(`Added ${name}`);
  }
};

export const getActiveUsers = () => {
  let activeUsersList: string[] = [];

  activeUsers.forEach((user) => {
    activeUsersList.push(user.username);
  });

  return activeUsersList;
};

export const removeUser = (id: string) => {
  let removedUser = "";
  for (var i = 0; i < activeUsers.length; i++) {
    if (activeUsers[i].socketID === id) {
      removedUser = activeUsers[i].username;
      activeUsers.splice(i, 1);
    }
  }
  return removedUser;
};
