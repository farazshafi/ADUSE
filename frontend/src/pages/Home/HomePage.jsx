import { Grid, Button, Typography, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Profile from "../../assets/profile/profile.png"
const HomePage = () => {
  const navigate = useNavigate();
  const handleProfileNavigation = (e) => {
    e.preventDefault();
    navigate("/profile");
  };
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh", textAlign: "center" }}
    >
      <Grid item xs={12} sm={8} md={4}>
        <Avatar
          src={Profile} // Replace with user's avatar URL
          alt={"Faraz shafi"} // Replace with user's name
          sx={{ width: 100, height: 100, margin: "0 auto" }} // Centered avatar styling
        />
        <Typography sx={{mt:"20px"}} variant="h5" gutterBottom>
          Welcome, Faraz shafi!
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={handleProfileNavigation}
        >
          Go to Profile
        </Button>
      </Grid>
    </Grid>
  );
};

export default HomePage;
