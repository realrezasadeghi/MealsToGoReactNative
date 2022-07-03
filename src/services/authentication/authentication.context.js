import React, { createContext, useState } from "react";
import { loginRequest, registerRequest } from "./authentication.service";
import { auth } from "../firebase";

export const AuthenticationContext = createContext({
  isLoading: false,
  user: null,
  error: null,
  isAuthentication: false,
  onLogin: (email, password) => {},
  onRegister: (email, password, repeatPassword) => {},
  onLogout: () => {},
});

export const AuthenticationContextProvider = ({ children }) => {
  const [isAuthentication, setIsAuthentication] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  auth.onAuthStateChanged((usr) => {
    if (usr) {
      setUser(usr);
    }
    setIsLoading(false);
  });

  const onLogin = async (email, password) => {
    setIsLoading(true);
    try {
      const user = await loginRequest(email, password);
      setIsAuthentication(true);
      setUser(user);
    } catch (error) {
      setError(error.toString());
    } finally {
      setIsLoading(false);
    }
  };

  const onRegister = async (email, password, repeatPassword) => {
    if (password !== repeatPassword) {
      setError("Error : Password not match");
      return;
    }

    setIsLoading(true);
    try {
      const user = await registerRequest(email, password);
      setIsAuthentication(true);
      setUser(user);
    } catch (error) {
      setError(error.toString());
    } finally {
      setIsLoading(false);
    }
  };

  const onLogout = () => {
    setUser(null);
    setIsAuthentication(false)
    auth.signOut();
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isLoading,
        error,
        user,
        onLogin,
        isAuthentication,
        onRegister,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
