import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../featuers/login-slice/loginSlice"; // Adjusted the import path

// Configure the store
const store = configureStore({
  reducer: {
    login: loginSlice, 
  },
});

export default store;
