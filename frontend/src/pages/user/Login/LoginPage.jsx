import { useEffect, useState } from "react";
import { Grid, TextField, Button, Typography, Paper } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUser } from "../../../redux/slices/userSlice";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector(selectUser);
  const dispatch = useDispatch();  // Redux dispatch function
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.post(
        "http://localhost:5000/api/user/login",
        {
          email: email,
          password: password,
        }
      );
      if (data) {
        // Dispatch to Redux store instead of context
        dispatch(setUser(data));

        // Store the user details in localStorage for persistence
        localStorage.setItem("user", JSON.stringify(data));

        toast.success("Successfully logged in");
        navigate("/");
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message); // Error message from backend
      } else {
        toast.error("An error occurred. Please try again.");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      console.log("user: ", user)
      navigate("/");
    }
  }, [user, navigate]);

  if(user){
    return null
  }

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={12} sm={8} md={4}>
        <Paper elevation={3} style={{ padding: "2rem" }}>
          <Typography variant="h5" align="center" gutterBottom>
            Login
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Email"
              variant="outlined"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Password"
              variant="outlined"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              style={{ marginTop: "1rem" }}
            >
              {loading ? "Loading..." : "Login"}
            </Button>
            <Typography sx={{ mt: "20px" }} variant="body2" align="center">
              {"Don't have an account? "}
              <Link to={"/signup"}>Signup</Link>
            </Typography>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LoginPage;
