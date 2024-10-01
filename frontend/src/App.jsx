import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/user/Login/LoginPage";
import SignUpPage from "./pages/user/SignUp/SignUpPage";
import HomePage from "./pages/user/Home/HomePage";
import ProfilePage from "./pages/user/Profile/ProfilePage";
import AdminLoginPage from "./pages/admin/AdminLogin/AdminLoginPage"
import AdminDashboard from "./pages/admin/AdminLogin/AdminDashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* user route */}
          <Route exact path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignUpPage />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>

          {/* admin route */}
          <Route path="/admin_login" element={<AdminLoginPage />}></Route>
          <Route path="/admin_dashboard" element={<AdminDashboard />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
