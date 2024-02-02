import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, useAnimation } from "framer-motion";
import DropDown from "./DropDown";
import { useLocation, useNavigate } from "react-router-dom";
// import TeleMedicine from "../../Pages/Admin/TeleMedicine";
import {
  pharmacyNav,
  telemedicine,
  homecare,
  cleartopNav,
} from "../../Redux/Features/NavbarSlice";

function SideBar() {
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
  console.log(window.location.pathname, "path name");
  const [droping, setDroping] = useState(false);

  return (
    <aside
      id="logo-sidebar"
      className={`fixed top-0 left-0 z-30 w-64 h-screen pt-20 transition-transform  
      ${toggleSidebar ? "translate-x-0" : "-translate-x-full"} 
        border-r sm:translate-x-0 bg-black  border-gray-700`}
      aria-label="Sidebar"
    >
      <div class="h-full px-3 pb-4 overflow-y-auto  bg-black">
        <ul class="space-y-9 font-medium">
          <li>
            <a
              onClick={() => {
                setCurrentRoute("/dashboard");
                navigate("/dashboard");
              }}
              href="#"
              className={`flex pl-12 items-center p-2 rounded-lg group ${
                window.location.pathname === "/dashboard"
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
                  window.location.pathname === "/dashboard" ? "svg-icon-active" : ""
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
                dispatch(telemedicine());
                setCurrentRoute("/telemedicine/category");
                navigate("/telemedicine/category");
              }}
              href="#"
              className={`flex items-center p-2 pl-12 rounded-lg group ${
                window.location.pathname === "/telemedicine/category" ||
                window.location.pathname === "/telemedicine/doctor" ||
                window.location.pathname === "/telemedicine/Withdrawalpannal"
                  ? "bg-white text-black "
                  : "text-white"
              } `}
            >
              <svg
                fill={
                  window.location.pathname === "/telemedicine/category" ||
                  window.location.pathname === "/telemedicine/doctor" ||
                  window.location.pathname === "/telemedicine/Withdrawalpannal"
                    ? "#your-active-color"
                    : "#ede8e8"
                }
                width="25"
                height="30"
                viewBox="-7.5 0 32 32"
                xmlns="http://www.w3.org/2000/svg"
                className={`svg-icon ${
                  window.location.pathname === "/telemedicine/category" ||
                  window.location.pathname === "/telemedicine/doctor" ||
                  window.location.pathname === "/telemedicine/Withdrawalpannal"
                    ? "svg-icon-active"
                    : ""
                }`}
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <title>stethoscope</title>
                  <path d="M16.56 13c0-1.32-1.080-2.4-2.4-2.4s-2.4 1.080-2.4 2.4c0 1.040 0.64 1.92 1.56 2.24v4.92c0 2.84-2.88 3.040-3.76 3.040s-3.76-0.2-3.76-3.040v-1.88c2.28-0.36 4.16-2.080 4.16-3.92v-4.96c0-0.84-0.48-1.6-1.2-1.96-0.64-0.32-1.24-0.4-1.72-0.2-0.44 0.16-0.64 0.6-0.48 1.040s0.64 0.68 1.040 0.52c0.040 0 0.16 0 0.44 0.12 0.16 0.080 0.28 0.28 0.28 0.48v4.92c0 0.92-1.4 2.32-3.32 2.32s-3.32-1.4-3.32-2.32v-4.92c0-0.2 0.12-0.4 0.28-0.48 0.24-0.12 0.4-0.12 0.44-0.12 0.44 0.16 0.92-0.080 1.080-0.52s-0.080-0.92-0.52-1.080c-0.52-0.2-1.12-0.12-1.72 0.2-0.76 0.36-1.2 1.12-1.2 1.96v4.92c0 1.88 1.88 3.56 4.16 3.92v1.88c0 3.24 2.72 4.72 5.4 4.72s5.4-1.44 5.4-4.72v-4.84c0.88-0.32 1.56-1.2 1.56-2.24zM14.16 12.24c0.4 0 0.76 0.32 0.76 0.76 0 0.4-0.32 0.76-0.76 0.76-0.4 0-0.76-0.32-0.76-0.76 0-0.4 0.32-0.76 0.76-0.76z"></path>
                </g>
              </svg>

              <span className="ms-2">Telemedicine</span>
            </a>
          </li>

          <li>
            <a
              onClick={() => {
                setCurrentRoute("/homecare/categories");
                navigate("/homecare/categories");
              }}
              href="#"
              className={`flex items-center p-2 pl-12 rounded-lg group ${
                window.location.pathname === "/homecare/categories" ||
                window.location.pathname === "/homecare/lab-items" ||
                window.location.pathname   === "/homecare/appoinment-details"
                  ? "bg-white text-black "
                  : "text-white"
              } `}
            >
              <svg
                fill={
                  window.location.pathname === "/homecare/categories" ||
                  window.location.pathname === "/homecare/lab-items" ||
                  window.location.pathname   === "/homecare/appoinment-details"
                    ? "#your-active-color"
                    : "#ede8e8"
                }
                width="20"
                height="25"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="m17.355 20.131 2.616-.146.153-2.615-4.978-4.978-2.767 2.762z"></path>
                  <path d="m10.236 1.607-1.553 1.553-2.016-2.016c-.715-.765-1.73-1.242-2.856-1.242-2.157 0-3.906 1.749-3.906 3.906 0 1.126.477 2.141 1.24 2.854l.002.002 2.017 2.016-1.553 1.553 1.967 1.967 1.663-1.664 11.532 11.531 3.653-.207 2.136 2.136 1.45-1.45-2.136-2.136.207-3.653-11.531-11.531 1.664-1.664zm10.3 18.948-3.266.186-11.112-11.112 3.453-3.453 11.112 11.112z"></path>
                </g>
              </svg>

              <span className="ms-3">Homecare</span>
            </a>
          </li>

          <li>
            <a
              onClick={() => {
                dispatch(pharmacyNav());
                setCurrentRoute("/pharmacy/category");
                navigate("/pharmacy/category");
              }}
              href="#"
              class={`flex items-center p-2 pl-12 rounded-lg group ${
                window.location.pathname === "/pharmacy/category" ||
                window.location.pathname === "/pharmacy/product" ||
                window.location.pathname === "/pharmacy/review" ||
                window.location.pathname === "/pharmacy/order"
                  ? "bg-white text-black "
                  : "text-white"
              } `}
            >
              <svg
                fill={
                  window.location.pathname === "/pharmacy/category" ||
                  window.location.pathname === "/pharmacy/product" ||
                  window.location.pathname === "/pharmacy/review" ||
                  window.location.pathname === "/pharmacy/order"
                    ? "#your-active-color"
                    : "#ede8e8"
                }
                width="20"
                height="25"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className={`svg-icon ${
                  window.location.pathname === "/pharmacy/category" ||
                  window.location.pathname === "/pharmacy/product" ||
                  window.location.pathname === "/pharmacy/review" ||
                  window.location.pathname === "/pharmacy/order"
                    ? "svg-icon-active"
                    : ""
                }`}
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M9.426,6.3,7.57,8.156l2.137,2.137a1,1,0,0,1-1.414,1.414L6.156,9.57,4.3,11.425a4.437,4.437,0,0,0,4.413,7.388,1,1,0,0,1,.574,1.916,6.437,6.437,0,0,1-6.4-10.718L8.012,4.885a6.442,6.442,0,0,1,9.8.829,1,1,0,1,1-1.63,1.159A4.44,4.44,0,0,0,9.426,6.3ZM23,15a6,6,0,1,1-6-6A6.008,6.008,0,0,1,23,15Zm-6-4a3.947,3.947,0,0,0-2.019.567l5.452,5.452A3.957,3.957,0,0,0,21,15,4,4,0,0,0,17,11Zm0,8a3.947,3.947,0,0,0,2.019-.567l-5.452-5.452A3.957,3.957,0,0,0,13,15,4,4,0,0,0,17,19Z"></path>
                </g>
              </svg>

              <span class="ms-3">Pharmacy</span>
            </a>
          </li>

          <li>
            <a
              onClick={() => {
                setCurrentRoute("/food/categories");
                navigate("/food/categories");
              }}
              href="#"
              class={`flex items-center p-2 pl-12   rounded-lg       group ${
                window.location.pathname === "/food/categories" ||
                window.location.pathname === "/food/product" ||
                window.location.pathname === "/food/review" ||
                window.location.pathname === "/food/order"
                  ? "bg-white text-black "
                  : "text-white"
              } `}
            >
              <svg
                className={`svg-icon `}
                width="20"
                height="25"
                viewBox="0 0 24 24"
                id="Layer_1"
                data-name="Layer 1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <g id="SVGRepo_iconCarrier">
                  <defs>
                    <style
                      dangerouslySetInnerHTML={{
                        __html: `.cls-1{fill:none;
            
              ${
                window.location.pathname === "/food/categories" ||
                window.location.pathname === "/food/product" ||
                window.location.pathname === "/food/review" ||
                window.location.pathname === "/food/order"
                  ? "stroke:#202124; "
                  : "  stroke:#ede8e8;"
              }
              
              stroke-miterlimit:10;stroke-width:1.92px;}`,
                      }}
                    />
                  </defs>
                  <path
                    className="cls-1"
                    d="M3.38,1.46h0A5.75,5.75,0,0,1,9.13,7.21v8.63a0,0,0,0,1,0,0H3.38a0,0,0,0,1,0,0V1.46A0,0,0,0,1,3.38,1.46Z"
                  />
                  <polyline
                    className="cls-1"
                    points="3.38 23.5 3.38 15.83 7.21 15.83 7.21 23.5"
                  />
                  <polyline
                    className="cls-1"
                    points="14.88 23.5 14.88 11.04 18.71 11.04 18.71 23.5"
                  />
                  <path
                    className="cls-1"
                    d="M13,7.21h7.67a0,0,0,0,1,0,0v1A2.87,2.87,0,0,1,17.75,11H15.83A2.88,2.88,0,0,1,13,8.17v-1A0,0,0,0,1,13,7.21Z"
                  />
                  <line
                    className="cls-1"
                    x1="16.79"
                    y1="0.5"
                    x2="16.79"
                    y2="7.21"
                  />
                  <line
                    className="cls-1"
                    x1="12.96"
                    y1="0.5"
                    x2="12.96"
                    y2="7.21"
                  />
                  <line
                    className="cls-1"
                    x1="20.63"
                    y1="0.5"
                    x2="20.63"
                    y2="7.21"
                  />
                </g>
              </svg>

              <span class="ms-3">Food</span>
            </a>
          </li>

          <li>
            <a
              onClick={() => {
                setCurrentRoute("/transaction");
                navigate("/transaction");
              }}
              href="#"
              class={`flex items-center p-2 pl-12   rounded-lg       group ${
                currentRoute === "/transaction"
                  ? "bg-white text-black "
                  : "text-white"
              } `}
            >
              {currentRoute === "/transaction" ? (
                <svg
                  fill="#"
                  width="30"
                  height="25"
                  viewBox="0 0 24 24"
                  id="exchange-dollar"
                  data-name="Flat Line"
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon flat-line"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <g id="SVGRepo_iconCarrier">
                    <path
                      id="primary"
                      d="M20,12a7.91,7.91,0,0,0-.35-2.35,8,8,0,0,0-14.35-2"
                      style={{
                        fill: "none",
                        stroke: "black", // Changed to black
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                      }}
                    />
                    <path
                      id="primary-2"
                      data-name="primary"
                      d="M4,12a7.91,7.91,0,0,0,.35,2.35,8,8,0,0,0,14.35,2"
                      style={{
                        fill: "none",
                        stroke: "black", // Changed to black
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                      }}
                    />
                    <polyline
                      id="primary-3"
                      data-name="primary"
                      points="19 11 20 12 21 11"
                      style={{
                        fill: "none",
                        stroke: "black", // Changed to black
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                      }}
                    />
                    <polyline
                      id="primary-4"
                      data-name="primary"
                      points="5 13 4 12 3 13"
                      style={{
                        fill: "none",
                        stroke: "black", // Changed to black
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                      }}
                    />
                    <path
                      id="primary-5"
                      data-name="primary"
                      d="M10,15h2.5A1.5,1.5,0,0,0,14,13.5h0A1.5,1.5,0,0,0,12.5,12h-1A1.5,1.5,0,0,1,10,10.5h0A1.5,1.5,0,0,1,11.5,9H14"
                      style={{
                        fill: "none",
                        stroke: "black", // Changed to black
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                      }}
                    />
                    <path
                      id="primary-6"
                      data-name="primary"
                      d="M12,9V8m0,8V15"
                      style={{
                        fill: "none",
                        stroke: "black", // Changed to black
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                      }}
                    />
                  </g>
                </svg>
              ) : (
                <svg
                  fill="#"
                  width="30"
                  height="25"
                  viewBox="0 0 24 24"
                  id="exchange-dollar"
                  data-name="Flat Line"
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon flat-line"
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth={0} />
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <g id="SVGRepo_iconCarrier">
                    <path
                      id="primary"
                      d="M20,12a7.91,7.91,0,0,0-.35-2.35,8,8,0,0,0-14.35-2"
                      style={{
                        fill: "none",
                        stroke: "#ede8e8",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                      }}
                    />
                    <path
                      id="primary-2"
                      data-name="primary"
                      d="M4,12a7.91,7.91,0,0,0,.35,2.35,8,8,0,0,0,14.35,2"
                      style={{
                        fill: "none",
                        stroke: "#ede8e8",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                      }}
                    />
                    <polyline
                      id="primary-3"
                      data-name="primary"
                      points="19 11 20 12 21 11"
                      style={{
                        fill: "none",
                        stroke: "#ede8e8",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                      }}
                    />
                    <polyline
                      id="primary-4"
                      data-name="primary"
                      points="5 13 4 12 3 13"
                      style={{
                        fill: "none",
                        stroke: "#ede8e8",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                      }}
                    />
                    <path
                      id="primary-5"
                      data-name="primary"
                      d="M10,15h2.5A1.5,1.5,0,0,0,14,13.5h0A1.5,1.5,0,0,0,12.5,12h-1A1.5,1.5,0,0,1,10,10.5h0A1.5,1.5,0,0,1,11.5,9H14"
                      style={{
                        fill: "none",
                        stroke: "#ede8e8",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                      }}
                    />
                    <path
                      id="primary-6"
                      data-name="primary"
                      d="M12,9V8m0,8V15"
                      style={{
                        fill: "none",
                        stroke: "#ede8e8",
                        strokeLinecap: "round",
                        strokeLinejoin: "round",
                        strokeWidth: 2,
                      }}
                    />
                  </g>
                </svg>
              )}

              <span class="ms-1">Transaction</span>
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                dispatch(cleartopNav());
                setCurrentRoute("/coupons");
                navigate("/coupons");
              }}
              href="#"
              class={`flex items-center p-2 pl-12 rounded-lg group ${
                window.location.pathname === "/coupons"
                  ? "bg-white text-black "
                  : "text-white"
              } `}
            >
              <svg
                fill={
                  window.location.pathname === "/coupons"
                    ? "#your-active-color"
                    : "#ede8e8"
                }
                width="20"
                height="25"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className={`svg-icon ${
                  window.location.pathname === "/coupons"
                    ? "svg-icon-active"
                    : ""
                }`}
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M9.426,6.3,7.57,8.156l2.137,2.137a1,1,0,0,1-1.414,1.414L6.156,9.57,4.3,11.425a4.437,4.437,0,0,0,4.413,7.388,1,1,0,0,1,.574,1.916,6.437,6.437,0,0,1-6.4-10.718L8.012,4.885a6.442,6.442,0,0,1,9.8.829,1,1,0,1,1-1.63,1.159A4.44,4.44,0,0,0,9.426,6.3ZM23,15a6,6,0,1,1-6-6A6.008,6.008,0,0,1,23,15Zm-6-4a3.947,3.947,0,0,0-2.019.567l5.452,5.452A3.957,3.957,0,0,0,21,15,4,4,0,0,0,17,11Zm0,8a3.947,3.947,0,0,0,2.019-.567l-5.452-5.452A3.957,3.957,0,0,0,13,15,4,4,0,0,0,17,19Z"></path>
                </g>
              </svg>

              <span class="ms-3">coupons</span>
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                dispatch(cleartopNav());
                setCurrentRoute("/push-notification");
                navigate("/push-notification");
              }}
              href="#"
              class={`flex items-center p-2 pl-12 rounded-lg group ${
                window.location.pathname === "/push-notification"
                  ? "bg-white text-black "
                  : "text-white"
              } `}
            >
              <svg
                fill={
                  window.location.pathname === "/push-notification"
                    ? "#your-active-color"
                    : "#ede8e8"
                }
                width="20"
                height="25"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className={`svg-icon ${
                  window.location.pathname === "/push-notification"
                    ? "svg-icon-active"
                    : ""
                }`}
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <path d="M9.426,6.3,7.57,8.156l2.137,2.137a1,1,0,0,1-1.414,1.414L6.156,9.57,4.3,11.425a4.437,4.437,0,0,0,4.413,7.388,1,1,0,0,1,.574,1.916,6.437,6.437,0,0,1-6.4-10.718L8.012,4.885a6.442,6.442,0,0,1,9.8.829,1,1,0,1,1-1.63,1.159A4.44,4.44,0,0,0,9.426,6.3ZM23,15a6,6,0,1,1-6-6A6.008,6.008,0,0,1,23,15Zm-6-4a3.947,3.947,0,0,0-2.019.567l5.452,5.452A3.957,3.957,0,0,0,21,15,4,4,0,0,0,17,11Zm0,8a3.947,3.947,0,0,0,2.019-.567l-5.452-5.452A3.957,3.957,0,0,0,13,15,4,4,0,0,0,17,19Z"></path>
                </g>
              </svg>

              <span class="ms-1">Push Notification</span>
            </a>
          </li>
          <li className="pt-1">
            <a
              onClick={() => {
                localStorage.removeItem("sophwe_token");
                localStorage.removeItem("sophwe_fcm");
                dispatch(cleartopNav())

                navigate("/login");
              }}
              href="#"
              class={`flex items-center p-2 pl-12   rounded-lg       group ${
                currentRoute === "" ? "bg-white text-black " : "text-red-500"
              } `}
            >
              <svg
                width="30"
                height="25"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M15 12L2 12M2 12L5.5 9M2 12L5.5 15"
                    stroke="#d41633"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                  <path
                    d="M9.00195 7C9.01406 4.82497 9.11051 3.64706 9.87889 2.87868C10.7576 2 12.1718 2 15.0002 2L16.0002 2C18.8286 2 20.2429 2 21.1215 2.87868C22.0002 3.75736 22.0002 5.17157 22.0002 8L22.0002 16C22.0002 18.8284 22.0002 20.2426 21.1215 21.1213C20.3531 21.8897 19.1752 21.9862 17 21.9983M9.00195 17C9.01406 19.175 9.11051 20.3529 9.87889 21.1213C10.5202 21.7626 11.4467 21.9359 13 21.9827"
                    stroke="#d41633"
                    stroke-width="1.5"
                    stroke-linecap="round"
                  ></path>{" "}
                </g>
              </svg>

              <span class="ms-3 ">logout</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default SideBar;
