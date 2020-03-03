export const getUser = () => {
  if (sessionStorage.user) {
    return JSON.parse(sessionStorage.user);
  }
  return null;
};

export const setUser = user => {
  sessionStorage.user = JSON.stringify(user);
};

export const logoutUser = () => {
  if (sessionStorage.user) {
    sessionStorage.removeItem('user');
  }
}

export const isLogin = () => {
  return sessionStorage.user !== undefined;
};
