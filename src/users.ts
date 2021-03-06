type activeUser = { readonly username: string; readonly room: string; readonly socketID: string };

const activeUsersStore = (() => {
  let _activeUsers: readonly activeUser[] = [];
  return {
    getUsers: () => [..._activeUsers],
    setUsers: (newUsers: readonly activeUser[]) => (_activeUsers = [...newUsers]),
  };
})();

export const isUserNameAvailable = (name: string): boolean => {
  const activeUsers = activeUsersStore.getUsers();
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
  let removedUser = "";
  const activeUsers = activeUsersStore.getUsers().filter((user) => {
    if (user.socketID === id) {
      removedUser = user.username;
      return false;
    }
    return true;
  });
  activeUsersStore.setUsers(activeUsers);
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
