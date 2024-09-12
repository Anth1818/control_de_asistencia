import { createContext, useContext, useEffect, useState } from "react";
import configApi from "../api/configApi";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const loginEndPoint = configApi.apiBaseUrl + configApi.endpoints.login;
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  const handleLogin = (credentials) => {
  
     fetch(loginEndPoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    })
    .then((response) => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Error: ' + response.status);
        }
    })
    .then((data) => {
        setUser(data.data[0]);
        console.log(data);
        console.log(user);
        localStorage.setItem("user", JSON.stringify(data));
    })
    .catch((error) => {
        console.error("Error:", error);
        setError(error.message);
    });
  };

  return (
    <UserContext.Provider value={{ user, setUser, handleLogin, error }}>
      {children}
    </UserContext.Provider>
  );
};
