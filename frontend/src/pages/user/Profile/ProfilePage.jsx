import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, setUser } from "../../../redux/slices/userSlice"; // Import Redux actions and selectors

const ProfilePage = () => {
  const user = useSelector(selectUser); // Get the user from Redux state
  const dispatch = useDispatch(); // Dispatch for updating Redux store
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(user?.profileImage || "");

  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    try {
      const { data } = await axios.patch(
        "http://localhost:5000/api/user/update",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${user.token}`, // Ensure proper Authorization
          },
        }
      );

      // Dispatch the updated user to the Redux store
      dispatch(
        setUser({
          ...user,
          name: data.name,
          email: data.email,
          profileImage: data.imageUrl,
        })
      );

      // Update local profile state
      setProfile(data.imageUrl);
      toast.success("Profile updated successfully!");
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error updating profile");
      }
      console.error(
        "Error updating profile:",
        error.response ? error.response.data : error.message
      );
    } finally {
      setLoading(false);
    }
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
        console.log("User profile data: ", data);
        setProfile(data.imageUrl);
      } catch (err) {
        console.log(err);
      } finally {
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
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={12} sm={8} md={4}>
        <Paper elevation={3} style={{ padding: "2rem", textAlign: "center" }}>
          <Typography variant="h5" gutterBottom>
            <p onClick={() => navigate("/")}>GO BACK</p>
          </Typography>
          <Typography variant="h5" gutterBottom>
            Update Profile
          </Typography>

          <Avatar
            src={selectedFile ? URL.createObjectURL(selectedFile) : profile}
            sx={{ width: 100, height: 100, margin: "0 auto" }}
          />

          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ marginTop: "1.5rem" }}
          />

          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ marginTop: "1.5rem" }}
          />

          <Button
            variant="contained"
            component="label"
            fullWidth
            style={{ marginTop: "1.5rem" }}
          >
            Upload Profile Image
            <input
              type="file"
              accept="image/*"
              name="image"
              hidden
              onChange={handleFileChange}
            />
          </Button>

          {selectedFile && (
            <Typography variant="body2" style={{ marginTop: "0.5rem" }}>
              Selected file: {selectedFile.name}
            </Typography>
          )}

          <Button
            variant="contained"
            color="primary"
            fullWidth
            style={{ marginTop: "1.5rem" }}
            onClick={handleSubmit}
          >
            {loading ? "Loading..." : "Submit"}
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
