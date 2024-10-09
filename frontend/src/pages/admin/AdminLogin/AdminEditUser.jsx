import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { TextField, Button, Grid, Paper, Typography } from "@mui/material";
import axios from "axios";

const AdminEditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `http://localhost:5000/api/admin/user_details/${id}`
        );
        console.log("User details fetched:", data);
        if (data) {
          setName(data.name);
          setEmail(data.email);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error fetching user details:", err);
        setLoading(false);
      }
    };
    fetchUserDetails();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await axios.patch(`http://localhost:5000/api/admin/edit/${id}`,{name,email});
      if (data){
        console.log("User details updated:", data);
        navigate("/admin_dashboard");
      }
    } catch (err) {
      console.error("Error updating user:", err);
      setLoading(false);
    }
  };

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Grid container justifyContent="center" style={{ padding: "20px" }}>
      <Grid item xs={12} sm={6}>
        <Paper elevation={3} style={{ padding: "20px" }}>
          <Typography variant="h5" gutterBottom>
            Edit User
          </Typography>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Name"
              name="name"
              variant="outlined"
              fullWidth
              margin="normal"
              value={name}
              onChange={(e)=>setName(e.target.value)}
            />
            <TextField
              label="Email"
              name="email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "20px" }}
            >
              Update User
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              style={{ marginLeft: "10px", marginTop: "20px" }}
              onClick={() => navigate("/admin_dashboard")}
            >
              Cancel
            </Button>
          </form>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AdminEditUser;
