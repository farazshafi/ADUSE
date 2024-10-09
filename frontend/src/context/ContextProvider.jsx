
import { useEffect, useState } from "react";
import MyContext from "./MyContext";

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });
  const [admin, setAdmin] = useState(() => {
    const savedAdmin = localStorage.getItem("admin");
    return savedAdmin ? JSON.parse(savedAdmin) : null;
  });

  useEffect(() => {
    if (user) {
      console.log("logged user : ", user);
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      console.log("user is not logged in");
    }
    if (admin) {
      console.log("logged admin : ", admin);
      localStorage.setItem("admin", JSON.stringify(admin));
    }else{
      console.log("admin is not logged in");
    }
  },[setUser,user]);
  return (
    <MyContext.Provider value={{ user, setUser, admin, setAdmin }}>
      {children}
    </MyContext.Provider>
  );
};

export default ContextProvider;