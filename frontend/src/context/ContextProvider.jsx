import { useEffect, useState } from "react";
import MyContext from "./MyContext";

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      console.log("logged user : ", user);
      localStorage.setItem("user",JSON.stringify(user))
    } else {
      console.log("user is not logged in");
    }
  });
  return (
    <MyContext.Provider value={{ user, setUser }}>
      {children}
    </MyContext.Provider>
  );
};

export default ContextProvider;
