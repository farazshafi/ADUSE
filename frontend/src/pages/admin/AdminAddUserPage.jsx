import { useState } from "react";
import {
  Grid,
  Paper,
  TextField,
  Button,
  Typography,
  Checkbox,
  FormControlLabel,
} from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const AdminAddUserPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  const handleCreateUser = async () => {
    try {
        const {data} = await axios.post(`http://localhost:5000/api/admin/create_user`,{
            name,
            email,
            password,
            isAdmin
        })
        if(data){
            
            navigate("/admin_dashboard");
        }
      
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };
  return (
    <Grid container justifyContent="center" style={{ padding: "20px" }}>
      <Grid item xs={12} md={6}>
        <Paper elevation={3} style={{ padding: "20px", textAlign: "center" }}>
          <Typography variant="h5" gutterBottom>
            Create New User
          </Typography>

          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            variant="contained"
            color="primary"
            style={{ marginTop: "20px" }}
            onClick={handleCreateUser}
          >
            Create User
          </Button>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default AdminAddUserPage;
