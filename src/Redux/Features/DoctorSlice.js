import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState = {
  number: 1,
};

const DoctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    test: (state, action) => {
      console.log(action);
      state.amount = 1;
    },
  },
});
export default DoctorSlice.reducer;
export const { test } = DoctorSlice.actions;
