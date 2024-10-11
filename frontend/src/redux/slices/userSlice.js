import { createSlice } from "@reduxjs/toolkit";

const savedUser = JSON.parse(localStorage.getItem("user")) || null;

const initialState = {
  user: savedUser || null
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state,action){
        state.user = {
            email: action.payload.email,
            imageUrl: action.payload.imageUrl,
            name: action.payload.name,
            profileImage: action.payload.profileImage,
            token: action.payload.token,
            _id: action.payload._id,
          };
          localStorage.setItem("user",JSON.stringify(state.user))
    },
    logoutUser(state){
        state.user = null;
        localStorage.removeItem("user")
    }
  },
});

export const selectUser = (state) => state.user.user;
export const {setUser,logoutUser} = userSlice.actions
export default userSlice.reducer;
