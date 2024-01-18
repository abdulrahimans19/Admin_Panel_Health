import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  amount: 9,

  isLoading: true,
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
    test: (state, action) => {
      console.log(action);
      state.amount = 1;
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
export const { test } = AdminSlice.actions;
