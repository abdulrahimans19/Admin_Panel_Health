import React from 'react'
import DocNavBar from '../../components/DoctorNav/TopNavDoc'
import DocSideBar from '../../components/DoctorNav/DocSideNa'
import Content from '../../components/Navbar/Content'
import { Outlet, useLocation } from "react-router-dom";

export default function DoctorHome() {
  return (
    <>
    <DocNavBar />
    <DocSideBar />
    <Content>
      <Outlet />
    </Content>
  </>
  )
}
