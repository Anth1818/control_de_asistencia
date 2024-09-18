import { createContext, useContext, useState } from "react";
import configApi from "../api/configApi";

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const loginEndPoint = configApi.apiBaseUrl + configApi.endpoints.login;
  const [user, setUser] = useState(null);
  const [errorCredentials, setErrorCredentials] = useState(null);

  const handleLogin = (credentials) => {
    fetch(loginEndPoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          return response.json().then((error) => {
            throw new Error(error.error);
          });
        }
      })
      .then((data) => {
        setUser(data.data[0]);
        console.log(data);
        console.log(user);
        localStorage.setItem("user", JSON.stringify(data));
      })
      .catch((error) => {
        if(error.message === "body not valid"){ 
          setErrorCredentials("Ingrese un usuario y contraseña válidos");
        }
        if(error.message === 'Usuario o contraseña no coinciden'){ 
          setErrorCredentials("Usuario o contraseña no coinciden");
        }
        console.log(error.message);
      });
  };

  return (
    <UserContext.Provider value={{ user, setUser, handleLogin, errorCredentials, setErrorCredentials }}>
      {children}
    </UserContext.Provider>
  );
};
