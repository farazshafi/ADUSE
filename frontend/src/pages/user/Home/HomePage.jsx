import { Grid, Button, Typography, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Profile from "../../../assets/profile/profile.png";
import { useContext, useEffect } from "react";
import MyContext from "../../../context/MyContext";

const HomePage = () => {
  const { user, setUser } = useContext(MyContext);
  const navigate = useNavigate();

  const handleProfileNavigation = (e) => {
    e.preventDefault();
    navigate("/profile");
  };

  const handleLogout = () => {
    localStorage.removeItem("user")
    navigate("/login")
    setUser(null)
  }

  useEffect(() => {
    if(!user){
      navigate("/login");
    }
  },[user]);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh", textAlign: "center" }}
    >
      <Grid item xs={12} sm={8} md={4}>
        <Avatar
          src={Profile} 
          alt={"Faraz shafi"}
          sx={{ width: 100, height: 100, margin: "0 auto" }} 
        />
        <Typography sx={{ mt: "20px" }} variant="h5" gutterBottom>
          Welcome, {user && user.name}!
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={handleProfileNavigation}
          sx={{ mt: "10px" }}
        >
          Go to Profile
        </Button>

        <Button
          onClick={handleLogout}
          variant="contained"
          color="secondary"
          sx={{ mt: "10px", ml: "10px" }}
        >
          Logout
        </Button>
      </Grid>
    </Grid>
  );
};

export default HomePage;
