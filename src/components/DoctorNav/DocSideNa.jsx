import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, useAnimation } from "framer-motion";
// import DropDown from "./DropDown";
import { useLocation, useNavigate } from "react-router-dom";
// import TeleMedicine from "../../Pages/Admin/TeleMedicine";
import {
  pharmacyNav,
  telemedicine,
  homecare,
} from "../../Redux/Features/NavbarSlice";

function DocSideBar() {
  const dispatch = useDispatch();
  const { toggleSidebar } = useSelector((state) => {
    return state.navbar;
  });
  const controls = useAnimation();
  const dropdown = useAnimation();
  const [currentRoute, setCurrentRoute] = useState(useLocation().pathname);
  const navigate = useNavigate();
  const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  const [droping, setDroping] = useState(false);

  return (
    <aside
      id="logo-sidebar"
      className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform  
      ${toggleSidebar ? "translate-x-0" : "-translate-x-full"} 
        border-r sm:translate-x-0 bg-black  border-gray-700`}
      aria-label="Sidebar"
    >
      <div class="h-full px-3 pb-4 overflow-y-auto  bg-black">
        <ul class="space-y-9 font-medium">
          <li>
            <a
              onClick={() => {
                setCurrentRoute("/doctor/overview");
                navigate("/doctor/overview");
              }}
              href="#"
              className={`flex pl-12 items-center p-2 rounded-lg group ${
                currentRoute === "/doctor/overview"
                  ? "bg-white text-black "
                  : "text-white"
              } `}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`svg-icon ${
                  currentRoute === "/dashboard" ? "svg-icon-active" : ""
                }`}
              >
                <path
                  d="M7.49984 18.3332H12.4998C16.6665 18.3332 18.3332 16.6665 18.3332 12.4998V7.49984C18.3332 3.33317 16.6665 1.6665 12.4998 1.6665H7.49984C3.33317 1.6665 1.6665 3.33317 1.6665 7.49984V12.4998C1.6665 16.6665 3.33317 18.3332 7.49984 18.3332Z"
                  stroke="#ede8e8"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.1084 12.0748L8.09173 9.4998C8.37507 9.13314 8.90007 9.06647 9.26673 9.3498L10.7917 10.5498C11.1584 10.8331 11.6834 10.7665 11.9667 10.4081L13.8917 7.9248"
                  stroke="#ede8e8"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="ms-3 ">Dashboard</span>
            </a>
          </li>
          {/* <DropDown
            title="Booking"
            dropdowndata={[
              { title: "all Booking", link: "/all-booking" },
              { title: "add Booking", link: "/add-booking" },
              { title: "Edit Booing", link: "/edit-booking" },
            ]}
            setCurrentRoute={setCurrentRoute}
            currentRoute={currentRoute}
          /> */}

          <li>
            <a
              onClick={() => {
                setCurrentRoute("/doctor/appointments");
                navigate("/doctor/appointments");
              }}
              href="#"
              className={`flex pl-12 items-center p-2 rounded-lg group ${
                currentRoute === "/doctor/appointments"
                  ? "bg-white text-black "
                  : "text-white"
              } `}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`svg-icon ${
                  currentRoute === "/doctor/appointments"
                    ? "svg-icon-active"
                    : ""
                }`}
              >
                <path
                  d="M7.49984 18.3332H12.4998C16.6665 18.3332 18.3332 16.6665 18.3332 12.4998V7.49984C18.3332 3.33317 16.6665 1.6665 12.4998 1.6665H7.49984C3.33317 1.6665 1.6665 3.33317 1.6665 7.49984V12.4998C1.6665 16.6665 3.33317 18.3332 7.49984 18.3332Z"
                  stroke="#ede8e8"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.1084 12.0748L8.09173 9.4998C8.37507 9.13314 8.90007 9.06647 9.26673 9.3498L10.7917 10.5498C11.1584 10.8331 11.6834 10.7665 11.9667 10.4081L13.8917 7.9248"
                  stroke="#ede8e8"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="ms-3 ">Appointments</span>
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                setCurrentRoute("/doctor/history");
                navigate("/doctor/history");
              }}
              href="#"
              className={`flex pl-12 items-center p-2 rounded-lg group ${
                currentRoute === "/doctor/history"
                  ? "bg-white text-black "
                  : "text-white"
              } `}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`svg-icon ${
                  currentRoute === "/doctor/history" ? "svg-icon-active" : ""
                }`}
              >
                <path
                  d="M7.49984 18.3332H12.4998C16.6665 18.3332 18.3332 16.6665 18.3332 12.4998V7.49984C18.3332 3.33317 16.6665 1.6665 12.4998 1.6665H7.49984C3.33317 1.6665 1.6665 3.33317 1.6665 7.49984V12.4998C1.6665 16.6665 3.33317 18.3332 7.49984 18.3332Z"
                  stroke="#ede8e8"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.1084 12.0748L8.09173 9.4998C8.37507 9.13314 8.90007 9.06647 9.26673 9.3498L10.7917 10.5498C11.1584 10.8331 11.6834 10.7665 11.9667 10.4081L13.8917 7.9248"
                  stroke="#ede8e8"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="ms-3 ">Appointment History</span>
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                setCurrentRoute("/doctor/transaction");
                navigate("/doctor/transaction");
              }}
              href="#"
              className={`flex pl-12 items-center p-2 rounded-lg group ${
                currentRoute === "/doctor/transaction"
                  ? "bg-white text-black "
                  : "text-white"
              } `}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`svg-icon ${
                  currentRoute === "/doctor/transaction"
                    ? "svg-icon-active"
                    : ""
                }`}
              >
                <path
                  d="M7.49984 18.3332H12.4998C16.6665 18.3332 18.3332 16.6665 18.3332 12.4998V7.49984C18.3332 3.33317 16.6665 1.6665 12.4998 1.6665H7.49984C3.33317 1.6665 1.6665 3.33317 1.6665 7.49984V12.4998C1.6665 16.6665 3.33317 18.3332 7.49984 18.3332Z"
                  stroke="#ede8e8"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.1084 12.0748L8.09173 9.4998C8.37507 9.13314 8.90007 9.06647 9.26673 9.3498L10.7917 10.5498C11.1584 10.8331 11.6834 10.7665 11.9667 10.4081L13.8917 7.9248"
                  stroke="#ede8e8"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>

              <span className="ms-3 ">Transaction</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default DocSideBar;