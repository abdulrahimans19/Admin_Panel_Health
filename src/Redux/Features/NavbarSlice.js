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
          logo:  <svg
          class="w-5 h-5   transition duration-75  "
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 22 21"
        >
          <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
          <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
        </svg>
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
        link:"/pharmacy/category"
      },
      {
        name:"Products",
        link:"/pharmacy/product"
      },
      {
        name:"Order",
        link:"/pharmacy/order"
      },
      {
        name:"Review",
        link:"/pharmacy/review"
      }
    ]

    },
    cleartopNav: (state, action) => {
      state.topnavData = [];
    },
  },
});
export default NavBarSlice.reducer;

export const { openSidebar, telemedicine, cleartopNav, pharmacyNav,homecare } =
  NavBarSlice.actions;
