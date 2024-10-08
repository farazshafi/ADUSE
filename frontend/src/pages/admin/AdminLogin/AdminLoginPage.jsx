import {
  Grid,
  Paper,
  Avatar,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MyContext from "../../../context/MyContext";

const AdminLoginPage = () => {
  const {admin,setAdmin} = useContext(MyContext)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const {data} = await axios.post("http://localhost:5000/api/admin/login", {
        email,
        password,
      });
      if (data) {
        localStorage.setItem("admin", JSON.stringify(data));
        setAdmin(data)
        navigate("/admin_dashboard");
      } else {
        alert("Invalid credentials");
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(()=>{
    if(admin){
      navigate("/admin_dashboard");
    }
  })

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={10} style={{ padding: "2rem", textAlign: "center" }}>
          <Avatar style={{ backgroundColor: "#FF7F11", margin: "0 auto" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography sx={{ marginTop: "20px" }} variant="h5" gutterBottom>
            Admin Login
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              label="Email"
              placeholder="Enter admin email"
              variant="outlined"
              fullWidth
              required
              type="email"
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              placeholder="Enter admin password"
              variant="outlined"
              fullWidth
              required
              margin="normal"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              fullWidth
              style={{ marginTop: "1rem" }}
            >
              {loading ? "Loading..." : "Login"}
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AdminLoginPage;
