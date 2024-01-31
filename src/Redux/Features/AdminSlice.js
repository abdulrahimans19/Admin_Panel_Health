import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  amount: 9,
  role: null,
  isLoading: true,
  testFilter:null,
  subTestsData:[]
};
// export const  getCartData=createAsyncThunk('cart/getcartDAta',async ()=>
// {
//     const {data} =await axios.get('')
//     return data
// })

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
  
  // extraReducers:(builder)=>
  // {
  //     builder.addCase(getCartData.pending,(state=>
  //         {
  //             console.log('thsi working ');
  //             state.isLoading=false
  //         })).addCase(getCartData.fulfilled,(state,action)=>
  //         {
  //             state.CartItem=action.payload
  //         }).addCase(getCartData.rejected,(state)=>
  //         {
  //             state.isLoading=true
  //         })

  // }
});
export default AdminSlice.reducer;
export const { test,setFilter,setSubtest } = AdminSlice.actions;
