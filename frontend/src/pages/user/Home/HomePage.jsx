import { Grid, Button, Typography, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  logoutUser,
  selectUser,
  setUser,
} from "../../../redux/slices/userSlice";

const HomePage = () => {
  const user = useSelector(selectUser);
  const [profile, setProfile] = useState(user?.profileImage);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleProfileNavigation = (e) => {
    e.preventDefault();
    navigate("/profile");
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    const fetchProfileImage = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://localhost:5000/api/user/profile_image/${user._id}`
        );
        if (data.imageUrl !== user.profileImage) {
          setProfile(data.imageUrl);
          dispatch(setUser({ ...user, profileImage: data.imageUrl }));
        }
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchProfileImage();
  }, [navigate, user, dispatch]);

  if (!user) return null;

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
            src={profile || user.profileImage}
            alt={user?.name || "User"}
            sx={{ width: 100, height: 100, margin: "0 auto" }}
          />
        )}
        <Typography sx={{ mt: "20px" }} variant="h5" gutterBottom>
          Welcome, {user.name}!
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
