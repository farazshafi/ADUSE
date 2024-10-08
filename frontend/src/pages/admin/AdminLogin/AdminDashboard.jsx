import { useContext, useEffect, useState } from "react";
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
  Modal,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit"; // Import Edit Icon
import AddIcon from "@mui/icons-material/Add";
import MyContext from "../../../context/MyContext";
import { useNavigate } from "react-router-dom";

const initialUsers = [
  { id: 1, name: "John Doe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", email: "jane@example.com" },
  { id: 3, name: "Sam Wilson", email: "sam@example.com" },
];

const AdminDashboard = () => {
  const {admin} = useContext(MyContext)
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false); // State for Edit Modal
  const [selectedUser, setSelectedUser] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedEmail, setEditedEmail] = useState("");

  const navigate = useNavigate()

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleOpenDeleteModal = (user) => {
    setSelectedUser(user);
    setOpenDeleteModal(true);
  };

  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const handleOpenEditModal = (user) => {
    setSelectedUser(user);
    setEditedName(user.name); 
    setEditedEmail(user.email);
    setOpenEditModal(true);
  };

  const handleCloseEditModal = () => setOpenEditModal(false);

  const handleDeleteUser = () => {
    setUsers(users.filter((user) => user.id !== selectedUser.id));
    handleCloseDeleteModal();
  };

  const handleEditUser = () => {
    setUsers(
      users.map((user) =>
        user.id === selectedUser.id
          ? { ...user, name: editedName, email: editedEmail }
          : user
      )
    );
    handleCloseEditModal();
  };

  useEffect(()=>{
    if(!admin){
      navigate("/admin_login");
    }
  })
  return (
    <Grid container justifyContent="center" style={{ padding: "20px" }}>
      <Grid item xs={12}>
        <Paper elevation={3} style={{ padding: "20px", textAlign: "center" }}>
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
            onClick={handleOpenModal}
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
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell align="right">
                    <IconButton
                      aria-label="edit"
                      onClick={() => handleOpenEditModal(user)} // Open Edit Modal
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      aria-label="delete"
                      onClick={() => handleOpenDeleteModal(user)}
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

      {/* Add User Modal */}
      <Modal open={openModal} onClose={handleCloseModal}>
        <Paper
          style={{
            padding: "20px",
            textAlign: "center",
            width: 300,
            margin: "auto",
            marginTop: "20%",
          }}
        >
          <Typography variant="h6">Add New User</Typography>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
          />
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "20px" }}
            onClick={() => {
              // Handle adding the user logic
              handleCloseModal();
            }}
          >
            Add User
          </Button>
        </Paper>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal open={openDeleteModal} onClose={handleCloseDeleteModal}>
        <Paper
          style={{
            padding: "20px",
            textAlign: "center",
            width: 300,
            margin: "auto",
            marginTop: "20%",
          }}
        >
          <Typography variant="h6">Confirm Deletion</Typography>
          <Typography>
            Are you sure you want to delete {selectedUser?.name}?
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            style={{ marginTop: "20px" }}
            onClick={handleDeleteUser}
          >
            Delete
          </Button>
          <Button
            variant="outlined"
            color="primary"
            style={{ marginTop: "20px", marginLeft: "10px" }}
            onClick={handleCloseDeleteModal}
          >
            Cancel
          </Button>
        </Paper>
      </Modal>

      {/* Edit User Modal */}
      <Modal open={openEditModal} onClose={handleCloseEditModal}>
        <Paper
          style={{
            padding: "20px",
            textAlign: "center",
            width: 300,
            margin: "auto",
            marginTop: "20%",
          }}
        >
          <Typography variant="h6">Edit User</Typography>
          <TextField
            label="Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={editedName}
            onChange={(e) => setEditedName(e.target.value)} // Set edited name
          />
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            value={editedEmail}
            onChange={(e) => setEditedEmail(e.target.value)} // Set edited email
          />
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "20px" }}
            onClick={handleEditUser} // Handle editing the user
          >
            Save Changes
          </Button>
        </Paper>
      </Modal>
    </Grid>
  );
};

export default AdminDashboard;
