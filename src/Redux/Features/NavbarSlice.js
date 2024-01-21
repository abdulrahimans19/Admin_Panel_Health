import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import images from "../../assets/images/image";
const {category,testtube,book}=images;
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
    homecare:(state,action)=>{
      state.topnavData = [
        {
          name: "Categories",
          link: "/homecare/categories",
          // logo:category
        },
        {
          name:"Lab Items",
          link:"/homecare/lab-items",
          // logo:testtube
        },
        {
          name:"Appoinment Details",
          link:"/homecare/appoinment-details",
          // logo:book
        }
      ];
    },
    pharmacyNav:(state,payload)=>
    {state.topnavData = [
      {
        name:"categories",
        link:""
      },
      {
        name:"Products",
        link:""
      },
      {
        name:"Order",
        link:""
      },
      {
        name:"Review",
        link:""
      }
    ]
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

export const { openSidebar, telemedicine, cleartopNav, pharmacyNav,homecare } =
  NavBarSlice.actions;
