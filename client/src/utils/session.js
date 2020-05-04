const getUser = () => {
  if (sessionStorage.user) {
    return JSON.parse(sessionStorage.user);
  }
  return null;
};

const setUser = user => {
  sessionStorage.user = JSON.stringify(user);
};

const logoutUser = () => {
  if (sessionStorage.user) {
    sessionStorage.removeItem('user');
  }
}

const isLogin = () => {
  return sessionStorage.user !== undefined;
};

const isAuthenticated = () => {
  if (isLogin()) return true;
  window.handlePopup('login');
  return false;
}

export {
  getUser,
  setUser,
  logoutUser,
  isLogin,
  isAuthenticated
}