import { useContext, useState } from "react";
import { Grid, TextField, Button, Typography, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import MyContext from "../../../context/MyContext"
// import axios from "axios"

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const {setUser} = useContext(MyContext)

  const handleSubmit = (e) => {
    e.preventDefault();
  };

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
              Login
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
