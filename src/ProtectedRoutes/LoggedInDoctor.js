import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
function LoggedInDoctor() {
  const user = JSON.parse(localStorage.getItem("sophwe_token"));

  return user?.user_role == "DOCTOR" ? <Outlet /> : <Navigate to="/login" />;
}

export default LoggedInDoctor;
