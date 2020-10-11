type activeUser = { readonly username: string; readonly room: string; readonly socketID: string };

const activeUsersStore = (() => {
  let _activeUsers: readonly activeUser[] = [];
  return {
    getUsers: () => [..._activeUsers],
    setUsers: (newUsers: readonly activeUser[]) => (_activeUsers = [...newUsers]),
  };
})();

export const isUserNameAvailable = (name: string): boolean => {
  // const existingUser = activeUsers.find((user) => user.username === name);
  const activeUsers = activeUsersStore.getUsers();
  console.log("Active users:");
  console.log(activeUsers);
  const existingUser = activeUsers.find((user) => user.username === name);

  if (existingUser === undefined) return true;

  return false;
};

export const addUser = (name: string, room: string, socketID: string): void => {
  const activeUsers = activeUsersStore.getUsers();
  const newUser = { username: name, room: room, socketID: socketID };

  // This is needed in case someone refreshes the page and this gets called twice
  if (isUserNameAvailable(name)) {
    activeUsers.push(newUser);
    activeUsersStore.setUsers(activeUsers);
  }
};

export const getActiveUsers = (): readonly string[] => {
  const activeUsers = activeUsersStore.getUsers();
  let activeUsersList: string[] = [];

  activeUsers.forEach((user) => {
    activeUsersList.push(user.username);
  });

  return [...activeUsersList];
};

export const removeUser = (id: string): string => {
  const activeUsers = activeUsersStore.getUsers();
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
  const activeUsers = activeUsersStore.getUsers();
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
