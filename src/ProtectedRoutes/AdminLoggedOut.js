import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function LoggedInUser() {
  const user = localStorage.getItem("doctor_token");
console.log(user);
  return user ? <Navigate to="/" /> : <Outlet />;
}

export default LoggedInUser;
