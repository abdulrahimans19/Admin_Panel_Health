import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  toggleSidebar: false,
  topnavData: [],
};
const NavBarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    openSidebar: (state, action) => {
      state.toggleSidebar = !state.toggleSidebar;
    },
    telemedicine: (state, action) => {
      state.topnavData = [
        {
          name: "categorys",
          link: "/telemedicine/category",
        },
        {
          name: "Doctor",
          link: "/telemedicine/doctor",
        },
      ];
    },
    pharmacyNav: (state, payload) => {
      state.topnavData = [
        {
          name: "categories",
          link: "",
        },
        {
          name: "Products",
          link: "",
        },
        {
          name: "Order",
          link: "",
        },
        {
          name: "Review",
          link: "",
        },
      ];
    },
    cleartopNav: (state, action) => {
      state.topnavData = [];
    },
  },
});
export default NavBarSlice.reducer;
export const { openSidebar, telemedicine, cleartopNav, pharmacyNav } =
  NavBarSlice.actions;
