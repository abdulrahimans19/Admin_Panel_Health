import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  amount: 9,
  role: null,
  isLoading: true,
  testFilter:null,
  subTestsData:[]
};

const AdminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setRole: (state, action) => {
      console.log(action);
      state.role = "admin";
    },
    setFilter: (state, action) => {
      console.log(action);
      state.testFilter = action.payload;
    },
    setSubtest: (state, action) => {
      console.log(action);
      state.subTestsData.push(action.payload)
    },
  },
  
});
export default AdminSlice.reducer;
export const { test,setFilter,setSubtest } = AdminSlice.actions;
