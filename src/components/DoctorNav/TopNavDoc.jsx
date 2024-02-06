import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openSidebar } from "../../Redux/Features/NavbarSlice";
import { motion, useAnimationControls } from "framer-motion";
import logo from "../../assets/images/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { BellIcon } from "@heroicons/react/24/outline";

function DocNavBar() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { toggleSidebar, topnavData } = useSelector((state) => {
    return state.navbar;
  });
  const [currentRoute, setCurrentRoute] = useState(useLocation().pathname);

  const [openMenu, setOpenMenu] = useState(false);
  const list = {
    visible: { opacity: 1, scale: 1 },
    hidden: { opacity: 0, scale: 0 },
  };

  const item = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -100 },
  };
  const controls = useAnimationControls();

  //   const DatatopNav=()=>
  //   {
  //     const {topnavData}=useSelector((state) => {
  //       return state.navbar;
  //     })
  //
  //   }
  useEffect(() => {
    // setCurrentRoute(useLocation().pathname)
  }, [useLocation().pathname]);

  return (
    <>
      <nav className="fixed top-0 z-50 w-full  border-b  bg-black border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                onClick={() => {
                  dispatch(openSidebar());
                }}
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  class="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    fill-rule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  ></path>
                </svg>
              </button>

              <div className="flex ms-2 sm:ms-16  md:me-24">
                <div className="max-w-44 ">
                  <img className="self-center w-28 " src={logo} alt="" />
                </div>
              </div>
              <div
                className={`${
                  topnavData[0] && "p-1"
                } rounded-md flex justify-start gap-5 bg-gray-900 overflow-x-auto`}
                style={{
                  scrollbarWidth: "none",
                  WebkitOverflowScrolling: "touch",
                }}
              >
                {topnavData[0] &&
                  topnavData.map((data) => {
                    return (
                      <div
                        onClick={() => {
                          navigate(data.link);
                        }}
                        className={`${
                          window.location.pathname == data.link
                            ? "bg-black "
                            : ""
                        }flex gap-1 p-2 rounded-md text-white cursor-pointer `}
                      >
                        {data.logo}
                        <span class="text-white">{data.name}</span>
                      </div>
                    );
                  })}

                {/* <div className="flex gap-1  p-2 rounded-md text-white ">
           <svg
                class="w-5 h-5   transition duration-75  "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 21"
              >
                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
              </svg>
              <span class="text-white">Dashboard</span>
           </div> */}
              </div>
            </div>

            <div className="flex items-center">
            
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
           
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default DocNavBar;
