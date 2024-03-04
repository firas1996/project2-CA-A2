import { createContext, useEffect, useState } from "react";

export const AuthStore = createContext({
  isLoggedIn: false,
  token: "",
  onLogin: () => {},
  onLogout: () => {},
});

const AuthProvider = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const token = localStorage.getItem("isLoggedIn");
    if (token == 1) {
      setIsLoggedIn(true);
    }
  }, []);

  const loginHandler = (email, password) => {
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", 1);
  };

  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };
  return (
    <AuthStore.Provider
      value={{
        isLoggedIn: isLoggedIn,
        onLogin: loginHandler,
        onLogout: logoutHandler,
      }}
    ></AuthStore.Provider>
  );
};

export default AuthProvider;
