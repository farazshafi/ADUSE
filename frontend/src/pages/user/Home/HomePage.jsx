import { Grid, Button, Typography, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import MyContext from "../../../context/MyContext";
import axios from "axios";

const HomePage = () => {
  const { user, setUser } = useContext(MyContext);
  const [profile, setProfile] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleProfileNavigation = (e) => {
    e.preventDefault();
    navigate("/profile");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
    setUser(null);
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    const fetchProfileImage = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://localhost:5000/api/user/profile_image/${user._id}`
        );
        console.log("user profile data: ", data);
        setProfile(data.imageUrl);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchProfileImage();
  }, [user, navigate]);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh", textAlign: "center" }}
    >
      <Grid item xs={12} sm={8} md={4}>
        {/* Display profile picture */}
        {loading ? (
          "loading..."
        ) : (
          <Avatar
            src={profile}
            alt={user?.name || "User"}
            sx={{ width: 100, height: 100, margin: "0 auto" }}
          />
        )}
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
