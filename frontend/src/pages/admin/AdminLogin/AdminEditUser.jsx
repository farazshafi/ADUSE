import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Grid,
  Paper,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import MyContext from "../../../context/MyContext";

const AdminEditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { setUser,user } = useContext(MyContext);

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
      const { data } = await axios.patch(
       `http://localhost:5000/api/admin/edit/${id}`,
        { name, email, isAdmin }
      );
      if (data) {
        if (data._id === user._id) {
          setUser(data);
        }
        toast.success("User details updated");
        navigate("/admin_dashboard");
      }
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        toast.error(err.response.data.message);
      }
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
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Email"
              name="email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={isAdmin}
                  onChange={(e) => setIsAdmin(e.target.checked)}
                />
              }
              label="Is Admin"
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