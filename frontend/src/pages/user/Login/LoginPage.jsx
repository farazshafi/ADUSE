import { useContext, useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  useRadioGroup,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import MyContext from "../../../context/MyContext";
import axios from "axios";
// import axios from "axios"

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(MyContext);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const {data} = await axios.post("http://localhost:5000/api/user/login", {
        email: email,
        password: password,
      });
      if(data){
        setUser(data)
        navigate("/")
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(useRadioGroup);
    if (user) {
      navigate("/");
    }
  }, [user,navigate]);

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
