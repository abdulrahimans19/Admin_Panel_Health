import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "../../components/Navbar/TopNavbar";
import SideBar from "../../components/Navbar/Sidebar";
import Content from "../../components/Navbar/Content";
import { Outlet, useLocation } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const { number } = useSelector((state) => {
    return state.doctor;
  });

  useEffect(() => {
    console.log(number);
  }, []);

  return (
    <>
      <NavBar />
      <SideBar />
      <Content>
        <Outlet />
      </Content>
    </>
  );
}

export default Home;
