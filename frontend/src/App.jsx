import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/user/Login/LoginPage";
import SignUpPage from "./pages/user/SignUp/SignUpPage";
import HomePage from "./pages/user/Home/HomePage";
import ProfilePage from "./pages/user/Profile/ProfilePage";
import AdminLoginPage from "./pages/admin/AdminLogin/AdminLoginPage";
import AdminDashboard from "./pages/admin/AdminLogin/AdminDashboard";
import AdminEditUser from "./pages/admin/AdminLogin/AdminEditUser";
import AdminAddUserPage from "./pages/admin/AdminAddUserPage";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Routes>
          {/* user route */}
          <Route exact path="/" element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/signup" element={<SignUpPage />}></Route>
          <Route path="/profile" element={<ProfilePage />}></Route>

          {/* admin route */}
          <Route path="/admin_login" element={<AdminLoginPage />}></Route>
          <Route path="/admin_dashboard" element={<AdminDashboard />}></Route>
          <Route path="admin/edit_user/:id" element={<AdminEditUser />}></Route>
          <Route path="admin/add_user/" element={<AdminAddUserPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
