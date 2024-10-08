import {
  Avatar,
  Button,
  Grid,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useContext, useEffect, useState } from "react";
import MyContext from "../../../context/MyContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ProfilePage = () => {
  const { user, setUser } = useContext(MyContext);
  const [name, setName] = useState(user && user.name);
  const [email, setEmail] = useState(user && user.email);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState(user && user.imageUrl);

  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true during submit

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
            Authorization: `Bearer ${user.token}`, // Corrected this line
          },
        }
      );

      console.log("Profile updated successfully:", data);
      setUser((prevUser) => ({
        ...prevUser,
        name: data.name,
        email: data.email,
        imageUrl: data.imageUrl,
      }));
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
