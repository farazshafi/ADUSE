import { Grid, TextField, Button, Typography, Paper } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MyContext from "../../../context/MyContext";
import axios from "axios";
import { toast } from "react-toastify";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);

  const { setUser, user } = useContext(MyContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Create form data
      const formData = new FormData();
      formData.append("name", username);
      formData.append("email", email);
      formData.append("password", password);
      if (image) formData.append("image", image); 
      const { data } = await axios.post(
        "http://localhost:5000/api/user/register",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
  
      setUser(data);
      toast.success("User registered successfully")
      navigate("/login");
      setLoading(false);
    } catch (err) {
      if(err.response && err.response.data && err.response.data.message){
        toast.error(err.response.data.message) 
      }
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

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
            Sign Up
          </Typography>
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <TextField
              label="Username"
              variant="outlined"
              fullWidth
              margin="normal"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
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
            <input
              type="file"
              accept="image/*"
              name="image"
              onChange={(e) => setImage(e.target.files[0])}
              style={{ marginTop: "1rem" }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              type="submit"
              style={{ marginTop: "1rem" }}
            >
              {loading ? "loading..." : "Sign Up"}
            </Button>
            <Typography sx={{ mt: "20px" }} variant="body2" align="center">
              Already have an account? <Link to={"/login"}>Login</Link>
            </Typography>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default SignUpPage;
