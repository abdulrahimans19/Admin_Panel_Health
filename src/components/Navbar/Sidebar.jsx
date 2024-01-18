import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, useAnimation } from "framer-motion";
import DropDown from "./DropDown";
import { useLocation, useNavigate } from "react-router-dom";

function SideBar() {
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
        <ul class="space-y-2 font-medium">
          <li>
            <a
              onClick={() => {
                setCurrentRoute("/dashboard");
                navigate("/dashboard");
              }}
              href="#"
              class={`flex items-center p-2    rounded-lg  text-white hover:bg-gray-100  hover:bg-gray-700 group ${
                currentRoute === "/dashboard" && "bg-gray-700 "
              } `}
            >
              <svg
                class="w-5 h-5   transition duration-75  text-gray-400 group-hover:    group-hover:text-white "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 21"
              >
                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
              </svg>
              <span class="ms-3">Dashboard</span>
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                setCurrentRoute("/dashboard");
                navigate("/dashboard");
              }}
              href="#"
              class={`flex items-center p-2    rounded-lg  text-white hover:bg-gray-100  hover:bg-gray-700 group ${
                currentRoute === "/dashboard" && "bg-gray-700 "
              } `}
            >
              <svg
                class="w-5 h-5   transition duration-75  text-gray-400 group-hover:    group-hover:text-white "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 21"
              >
                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
              </svg>
              <span class="ms-3">Telemedicine</span>
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                setCurrentRoute("/telemedicine");
                navigate("/telemedicine");
              }}
              href="#"
              class={`flex items-center p-2    rounded-lg  text-white hover:bg-gray-100  hover:bg-gray-700 group ${
                currentRoute === "/telemedicine" && "bg-gray-700 "
              } `}
            >
              <svg
                class="w-5 h-5   transition duration-75  text-gray-400 group-hover:    group-hover:text-white "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 21"
              >
                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
              </svg>
              <span class="ms-3">Homecare</span>
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                setCurrentRoute("/homecare");
                navigate("/homecare");
              }}
              href="#"
              class={`flex items-center p-2    rounded-lg  text-white hover:bg-gray-100  hover:bg-gray-700 group ${
                currentRoute === "/homecare" && "bg-gray-700 "
              } `}
            >
              <svg
                class="w-5 h-5   transition duration-75  text-gray-400 group-hover:    group-hover:text-white "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 21"
              >
                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
              </svg>
              <span class="ms-3">Pharmacy</span>
            </a>
          </li>

          <li>
            <a
              onClick={() => {
                setCurrentRoute("/pharmacy");
                navigate("/pharmacy");
              }}
              href="#"
              class={`flex items-center p-2    rounded-lg  text-white hover:bg-gray-100  hover:bg-gray-700 group ${
                currentRoute === "/pharmacy" && "bg-gray-700 "
              } `}
            >
              <svg
                class="w-5 h-5   transition duration-75  text-gray-400 group-hover:    group-hover:text-white "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 21"
              >
                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
              </svg>
              <span class="ms-3">Food</span>
            </a>
          </li>
          <li>
            <a
              onClick={() => {
                setCurrentRoute("/food");
                navigate("/food");
              }}
              href="#"
              class={`flex items-center p-2    rounded-lg  text-white hover:bg-gray-100  hover:bg-gray-700 group ${
                currentRoute === "/food" && "bg-gray-700 "
              } `}
            >
              <svg
                class="w-5 h-5   transition duration-75  text-gray-400 group-hover:    group-hover:text-white "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 21"
              >
                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
              </svg>
              <span class="ms-3">Transaction</span>
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
}

export default SideBar;
