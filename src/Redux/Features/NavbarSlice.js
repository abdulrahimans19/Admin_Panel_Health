import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState={
 
    toggleSidebar:false
}
const NavBarSlice=createSlice({
    name:"navbar",
    initialState,
    reducers:{
        openSidebar:(state,action)=>
        {
            state.toggleSidebar=!state.toggleSidebar
        }
    }
})
export default NavBarSlice.reducer
export const  {openSidebar}=NavBarSlice.actions