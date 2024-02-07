import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { openSidebar } from "../../Redux/Features/NavbarSlice";
import { motion, useAnimationControls } from "framer-motion";
import logo from "../../assets/images/logo.png";
import { useLocation, useNavigate } from "react-router-dom";
import { BellIcon } from "@heroicons/react/24/outline";
import toast, { Toaster } from "react-hot-toast";
import "../../assets/style/navbar.css";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import wavFile from "../../assets/short-success-sound-glockenspiel-treasure-video-game-6346.mp3";
import {
  onMessageListener,
  requestForToken,
} from "../../firebase/Firebaseconfig";
// import Notification from "./Notification";
import NotificationBar from "./NotificationMenu";
import { getNotificationApi } from "../../API/ApiCall";

function NavBar() {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const {
    toggleSidebar,
    topnavData,
    notification,
    notificationCount,
    notificationData,
  } = useSelector((state) => {
    return state.navbar;
  });

  const [currentRoute, setCurrentRoute] = useState(useLocation().pathname);

  const [openMenu, setOpenMenu] = useState(false);
  const [notificationnew, setNotificationnew] = useState();
  const [openNotification, setOpenNotification] = useState(false);
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
  //     console.log(topnavData);
  //   }
  // useEffect(() => {
  //   console.log(window.location.pathname);

  //   // setCurrentRoute(useLocation().pathname)
  // }, [useLocation().pathname]);

  // const [audio] = useState(new Audio('../../assets/short-success-sound-glockenspiel-treasure-video-game-6346.mp3'));

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("sophwe_token"));

    if (user?.user_role == "Admin") {
      onMessageListener()
        .then((payload) => {
          console.log(payload, "its coming here");
          getNotificationData();
          const audio = new Audio(wavFile);
          audio.play().catch((err) => {
            console.log(err);
          });

          setNotificationnew(payload);

          toast.custom((t) => (
            <div
              className={`${
                t.visible ? "animate-enter" : "animate-leave"
              } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
            >
              <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 pt-0.5"></div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {payload?.notification?.title}
                    </p>
                    <p className="mt-1 text-sm text-gray-500">
                      {payload.notification?.body}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex border-l border-gray-200">
                <button
                  onClick={() => toast.dismiss(t.id)}
                  className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Close
                </button>
              </div>
            </div>
          ));
        })
        .catch((err) => console.log("failed: ", err));
    }
  }, [notificationnew]);

  const [getNotData, setGetNotData] = useState(0);
  const getNotificationData = () => {
    getNotificationApi().then(({ data }) => {
      console.log(data, "notification");
      setGetNotData(data.data.unread_notifications);
    });
  };

  useEffect(() => {
    getNotificationData();
  }, []);

  // const [openNotification, setOpenNotification] = useState(false);
  useEffect(() => {
    const closeNotificationOnClickAnywhere = (event) => {
      if (openNotification) {
        console.log("rsdoigreg");
        // Check if the click occurred outside of the notification bar
        const notificationBar = document.getElementById("notification-bar");
        console.log(notificationBar);

        if (notificationBar && !notificationBar.contains(event.target)) {
          console.log("rsdoibgreg");

          setOpenNotification(false);
        }
      }
    };

    document.addEventListener("click", closeNotificationOnClickAnywhere);

    return () => {
      document.removeEventListener("click", closeNotificationOnClickAnywhere);
    };
  }, [openNotification]);

  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <nav className="fixed top-0 z-50 w-full  border-b  bg-black border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          {/* <Notification /> */}
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

              <div className="flex justify-end ms-2 sm:ms-16  md:me-24">
                {/* <img src="https://flowbite.com/docs/images/logo.svg" class="h-8 me-3" alt="FlowBite Logo" /> */}
                {/* <span class="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  SOPHWE
                </span> */}
                <div className="max-w-44 ">
                  <img className="self-center w-28 " src={logo} alt="" />
                </div>
              </div>
              <div
                className={`${
                  topnavData[0] && "p-1"
                } rounded-md flex justify-start gap-5 bg-zinc-900 overflow-x-auto`}
                style={{
                  scrollbarWidth: "none",
                  WebkitOverflowScrolling: "touch",
                }}
              >
                {topnavData[0] &&
                  topnavData.map((data) => {
                    console.log(data);
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
                        <span class="text-white text_hidden">{data.name}</span>
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
              {/* Notification and Profile */}
              <div id="notification-bar" class="flex items-center ms-3">
                <div className="relative inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <button
                    type="button"
                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    onClick={async () => {
                      setOpenNotification((e) => !e);
                    }}
                  >
                    <BellIcon className="h-6 w-6" />
                  </button>
                  <div
                    className="badge  p-2 absolute  rounded-full flex items-center justify-center right-5 top-4
                  
                   "
                    style={{
                      width: "15px",
                      height: "15px",
                      backgroundColor: "red",
                    }}
                  >
                    <span className="text-white text-xs">{getNotData}</span>
                  </div>
                </div>
                {openNotification && (
                  <div>
                    <NotificationBar
                      getNotificationData={getNotificationData}
                      notifications={notification}
                      setOpenNotification={setOpenNotification}
                    />
                  </div>
                )}
              </div>
              <div class="flex items-center ms-3">
                {/* <div>
                  <button
                    onClick={() => {
                      setOpenMenu((e) => !e);
                    }}
                    type="button"
                    class="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span class="sr-only">Open user menu</span>
                    <img
                      class="w-8 h-8 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      alt="user photo"
                    />
                  </button>
                </div> */}
                {/* {openMenu && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={list}
                    class="z-50 fixed my-4 right-7 top-6 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                    id="dropdown-user"
                  >
                    <div class="px-4 py-3" role="none">
                      <p
                        class="text-sm text-gray-900 dark:text-white"
                        role="none"
                      >
                        Neil Sims
                      </p>
                      <p
                        class="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                        role="none"
                      >
                        neil.sims@flowbite.com
                      </p>
                    </div>
                    <motion.ul
                      initial="hidden"
                      animate="visible"
                      variants={list}
                      class="py-1"
                      role="none"
                    >
                      <motion.li variants={item}>
                        <a
                          href="#"
                          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                        >
                          Dashboard
                        </a>
                      </motion.li>
                      <motion.li variants={item}>
                        <a
                          href="#"
                          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                        >
                          Settings
                        </a>
                      </motion.li>
                      <li>
                        <a
                          href="#"
                          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                        >
                          Earnings
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={() => {}}
                          href="#"
                          class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                          role="menuitem"
                        >
                          Sign out
                        </a>
                      </li>
                    </motion.ul>
                  </motion.div>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
