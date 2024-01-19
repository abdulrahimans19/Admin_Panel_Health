import { configureStore } from "@reduxjs/toolkit";
import AdminSlice from "../Features/AdminSlice";
import DoctorSlice from "../Features/DoctorSlice";
import NavbarSlice from "../Features/NavbarSlice";
export const store = configureStore({
  reducer: {
    admin: AdminSlice,
    doctor: DoctorSlice,
    navbar: NavbarSlice,
  },
});
