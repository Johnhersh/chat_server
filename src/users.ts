type activeUser = { username: string; room: string; socketID: string };
const activeUsers: activeUser[] = [];

export const checkIfUserIsActive = (name: string) => {
  const existingUser = activeUsers.find((user) => user.username === name);

  if (existingUser) return true;

  return false;
};

export const addUser = (name: string, room: string, socketID: string) => {
  const newUser = { username: name, room: room, socketID: socketID };

  // This is needed in case someone refreshes the page and this gets called twice
  if (!checkIfUserIsActive(name)) {
    activeUsers.push(newUser);
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

export const getUser = (id: string): activeUser => {
  const foundUser = activeUsers.find((user) => user.socketID === id);

  if (foundUser) {
    return foundUser;
  } else
    return {
      username: "",
      room: "",
      socketID: "",
    };
};
