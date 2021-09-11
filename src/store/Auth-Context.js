import React, { useCallback, useEffect, useState } from "react";

let logoutTimer;
const AuthContext = React.createContext({
  token: "",
  email: "",
  isLoggedin: false,
  login: (token) => {},
  logout: () => {},
});

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();
  const remainingTime = adjExpirationTime - currentTime;
  return remainingTime;
};
const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedEmail = localStorage.getItem("email");
  const storedExpirationTime = localStorage.getItem("expirationTime");
  const remainingTime = calculateRemainingTime(storedExpirationTime);
  if (remainingTime <= 60000) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("email");
    return null;
  } else {
    return {
      token: storedToken,
      email: storedEmail,
      expirationTime: remainingTime,
    };
  }
};
export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  let initialToken;
  let initialEmail;
  if (tokenData) {
    initialToken = tokenData.token;
    initialEmail = tokenData.email;
  }

  const [token, setToken] = useState(initialToken);
  const [email, setEmail] = useState(initialEmail);
  const isUserLoggedIn = !!token;

  const logoutHandler = useCallback(() => {
    setToken(null);
    setEmail(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    localStorage.removeItem("email");
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);
  const loginHandler = (token, email, expirationTime) => {
    setToken(token);
    setEmail(email);
    localStorage.setItem("token", token);
    localStorage.setItem("email", email);
    localStorage.setItem("expirationTime", expirationTime);

    const remainingTime = calculateRemainingTime(expirationTime);
    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };
  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.expirationTime);
    }
  }, [tokenData, logoutHandler]);
  const contextValue = {
    token: token,
    email: email,
    isLoggedin: isUserLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
  };
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
