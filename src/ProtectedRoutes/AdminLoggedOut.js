import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function LoggedInUser() {
  const user = JSON.parse(localStorage.getItem("sophwe_token"));

  return user?.user_role == "Admin" ? (
    <Navigate to="/dashboard" />
  ) : user?.user_role == "DOCTOR" ? (
    <Navigate to="/doctor/home" />
  ) : (
    <Outlet />
  );
}

export default LoggedInUser;
