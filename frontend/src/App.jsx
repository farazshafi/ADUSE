import { useContext } from "react";
import MyContext from "./context/MyContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/Login/LoginPage";
import SignUpPage from "./pages/SignUp/SignUpPage";

function App() {
  const { testMsg } = useContext(MyContext);
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* <Route exact path="/" element={}></Route> */}
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignUpPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
