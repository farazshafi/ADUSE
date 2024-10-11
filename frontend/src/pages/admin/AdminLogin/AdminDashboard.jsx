import { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Button,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { logoutAdmin, selectAdmin, selectUsers, setAllUsers } from "../../../redux/slices/adminSlice";

const AdminDashboard = () => {
  const admin = useSelector(selectAdmin);
  const users = useSelector(selectUsers);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const fetchAllUsers = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/admin/users", {
        headers: {
          Authorization: `Bearer ${admin.token}`, // Attach admin token
        },
      });
      dispatch(setAllUsers(data)); // Update Redux with fetched users
    } catch (err) {
      console.error("Error fetching users:", err);
    }
  };

  const handleAddUser = () => {
    navigate("/admin/add_user");
  };

  const handleDeleteUser = async (id, name) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete ${name}?`
    );
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5000/api/admin/delete/${id}`, {
          headers: {
            Authorization: `Bearer ${admin.token}`, // Attach admin token
          },
        });
        fetchAllUsers(); // Refresh user list after deletion
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleEditUser = (id) => {
    navigate(`/admin/edit_user/${id}`);
  };

  const handleLogout = () => {
    dispatch(logoutAdmin())
    navigate("/admin_login");
  };

  useEffect(() => {
    if (!admin) {
      navigate("/admin_login");
    } else {
      fetchAllUsers(); // Fetch users only if admin is logged in
    }
  }, [admin, navigate]);

  if(!admin){
    return null
  }

  return (
    <Grid container justifyContent="center" style={{ padding: "20px" }}>
      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: "20px", textAlign: "center" }}>
          <Typography variant="h4" gutterBottom>
            <h3 onClick={handleLogout}>Logout</h3>
          </Typography>
          <Typography variant="h4" gutterBottom>
            Admin Dashboard
          </Typography>
          
          <TextField
            label="Search Users"
            variant="outlined"
            value={search}
            onChange={handleSearchChange}
            style={{ marginBottom: "20px" }}
          />
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddUser}
            style={{ marginLeft: "20px" }}
          >
            Add User
          </Button>
        </Paper>
      </Grid>

      <Grid item xs={12}>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .map((user) => (
                  <TableRow key={user._id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        aria-label="edit"
                        onClick={() => handleEditUser(user._id)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => handleDeleteUser(user._id, user.name)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Grid>
  );
};

export default AdminDashboard;
