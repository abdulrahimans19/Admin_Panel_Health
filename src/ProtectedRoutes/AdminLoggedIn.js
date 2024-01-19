import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function LoggedOutUser() {
  const user = JSON.parse(localStorage.getItem("sophwe_token"));

  console.log(user, "protected");
  return user?.user_role == "Admin" ? <Outlet /> : <Navigate to="/login" />;
}

export default LoggedOutUser;
