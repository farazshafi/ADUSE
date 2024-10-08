import { Grid, Typography, Avatar, Button, Paper } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import Profile from "../../../assets/profile/profile.png";
import MyContext from "../../../context/MyContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProfilePage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { user, setUser } = useContext(MyContext);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState(user && user.name);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to upload the profile image?"
    );
    if (isConfirmed) {
      if (selectedFile) {
        // Prepare FormData
        const formData = new FormData();
        formData.append("profileImage", selectedFile);

        try {
          setLoading(true);
          const { data } = await axios.post(
            "http://localhost:5000/api/user/upload-profile-image",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${user.token}`,
              },
            }
          );

          // Update user profile picture after successful upload
          setUser((prevUser) => ({
            ...prevUser,
            profileImage: data.profileImageUrl, // Assuming your API returns the new image URL
          }));

          setLoading(false);
          alert("Profile image uploaded successfully!");
        } catch (e) {
          console.log(e.message);
          setLoading(false);
          alert("Failed to upload profile image.");
        }
      } else {
        alert("No file selected.");
      }
    } else {
      setSelectedFile(null);
    }
  };

  const handleNameUpdate = async () => {
    const newName = prompt("Enter your new name:", userName); // Prompt to update the name
    if (newName) {
      try {
        setLoading(true);
        const { data } = await axios.patch(
          "http://localhost:5000/api/user/update",
          { name: newName },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        );
        setUser((prevUser) => ({
          ...prevUser,
          name: data.user.name,
        }));
        setLoading(false);
      } catch (e) {
        console.log(e.message);
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "100vh" }}
    >
      <Grid item xs={12} sm={8} md={4}>
        <Paper elevation={3} style={{ padding: "2rem", textAlign: "center" }}>
          <Avatar
            src={user?.profileImage || Profile}
            alt={user && user.name}
            sx={{ width: 100, height: 100, margin: "0 auto" }}
          />
          <Typography variant="h5" gutterBottom>
            {user && user.name}
          </Typography>
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="file-upload"
            type="file"
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload">
            <Button
              variant="contained"
              component="span"
              color="primary"
              style={{ marginTop: "1rem" }}
            >
              Upload Profile Image
            </Button>
          </label>
          {selectedFile && (
            <Typography variant="body2" style={{ marginTop: "1rem" }}>
              Selected file: {selectedFile.name}
            </Typography>
          )}
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "1rem", marginLeft: "5px" }}
            onClick={handleUpload}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Update"}
          </Button>

          {/* New Update Name Button */}
          <Button
            variant="contained"
            color="secondary"
            style={{ marginTop: "1rem", marginLeft: "5px" }}
            onClick={handleNameUpdate}
          >
            {loading ? "loading..." : "Update Name"}
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
