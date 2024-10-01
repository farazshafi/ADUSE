import { Grid, Typography, Avatar, Button, Paper } from "@mui/material";
import { useState } from "react";
import Profile from "../../../assets/profile/profile.png";

const ProfilePage = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [userName, setUserName] = useState("Faraz shafi"); // State to store user name

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    const isConfirmed = window.confirm("Are you sure you want to upload the profile image?");
    if (isConfirmed) {
      if (selectedFile) {
        // Handle file upload logic here
        alert("File uploaded successfully!");
      } else {
        alert("No file selected.");
      }
    } else {
      setSelectedFile(null)
    }
  };

  const handleNameUpdate = () => {
    const newName = prompt("Enter your new name:", userName); // Prompt to update the name
    if (newName) {
      setUserName(newName); // Update the name if not empty
    }
  };

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
            src={Profile} // User's current avatar URL
            alt={userName} // User's name
            sx={{ width: 100, height: 100, margin: "0 auto" }} // Centered avatar styling
          />
          <Typography variant="h5" gutterBottom>
            {userName}
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
          >
            Update
          </Button>

          {/* New Update Name Button */}
          <Button
            variant="contained"
            color="secondary"
            style={{ marginTop: "1rem", marginLeft: "5px" }}
            onClick={handleNameUpdate}
          >
            Update Name
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
