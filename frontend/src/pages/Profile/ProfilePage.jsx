import { Grid, Typography, Avatar, Button, Paper } from "@mui/material";
import { useState } from "react";
import Profile from "../../assets/profile/profile.png";

const ProfilePage = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = () => {
    alert("Are You sure you want to upload")
    if (selectedFile) {
      // Handle
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
            alt={"Faraz"} // User's name
            sx={{ width: 100, height: 100, margin: "0 auto" }} // Centered avatar styling
          />
          <Typography variant="h5" gutterBottom>
            {"Faraz shafi"}
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
            style={{ marginTop: "1rem" }}
            onClick={handleUpload}
            
          >
            Update
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default ProfilePage;
