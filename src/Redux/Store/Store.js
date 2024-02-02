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
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['yourNonSerializableAction'],
        // Or ignore certain paths:
        // ignoredPaths: ['some.path.to.ignore']
      },
    }),
});
