import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
function LoggedInDoctor() {
    const {role}=useSelector((state) => {
        return state.admin;
      });
//   const user = localStorage.getItem("doctor_token");

  return role=="doctor" ? <Navigate to="/dashboard" /> : <Outlet />;
}

export default LoggedInDoctor;