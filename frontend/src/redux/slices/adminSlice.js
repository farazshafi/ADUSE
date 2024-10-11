import { createSlice } from "@reduxjs/toolkit";

const savedAdmin = JSON.parse(localStorage.getItem("admin")) || null;
console.log("saved admin :",savedAdmin);


const initialState = {
  admin: savedAdmin,
  users: [],
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setAdmin(state, action) {
      state.admin = action.payload;
    },
    setAllUsers(state, action) {
      state.users = action.payload;
    },
    logoutAdmin(state){
        state.admin = null;
        localStorage.removeItem("admin")
    }
    
  },
});

export const selectAdmin = (state) => state.admin.admin;
export const selectUsers = (state) => state.admin.users;

export const { setAdmin, setAllUsers, logoutAdmin } = adminSlice.actions;
export default adminSlice.reducer;
