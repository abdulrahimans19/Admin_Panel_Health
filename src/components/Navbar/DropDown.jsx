
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, useAnimation } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
function DropDown({ title, dropdowndata, currentRoute, setCurrentRoute }) {
  const { toggleSidebar } = useSelector((state) => {
    return state.navbar;
  });

  const controls = useAnimation();
  const dropdown = useAnimation();
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

  const [droping, setDroping] = useState(false);

  return (
    <li className="">
      <p
        onClick={async () => {
          console.log(droping);
          //   var dropdownDelayElement = document.getElementById("Kanban");
          if (!droping) {
            setDroping(!droping);

            await controls.start({
              height: "auto",
              visibility: "visible",
              transition: {
                delayChildren: 5,
                staggerChildren: 5,
              },
            });
            await dropdown.start({ visibility: "visible" });
          } else {
            dropdown.start({ visibility: "hidden" });

            await controls.start({ height: "0" });
            setDroping(!droping);
          }
        }}
        variants={dropdown}
        class={`flex cursor-pointer items-center p-2 text-gray-900 rounded-t-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
          droping && "bg-gray-900 border-t border-l border-r"
        }  `}
      >
        <svg
          class="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 18 18"
        >
          <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
        </svg>
        <span class="flex-1 ms-3 whitespace-nowrap">{title}</span>
      </p>
      <motion.div
        variants={container}
        initial={{ height: "0px", visibility: "hidden" }}
        animate={controls}
        id="Kanban"
        class={`z-10  w-full bg-white divide-y divide-gray-100 rounded-b-lg shadow  dark:bg-gray-900 ${
          droping && "bg-gray-900  border-l border-b border-r   "
        }`}
      >
        {
          <motion.ul
            id="dropdownDelay"
            class="  py-2 text-sm text-gray-700 dark:text-gray-200  "
            aria-labelledby="dropdownDelayButton"
          >
            {dropdowndata.map((data, index) => (
              <motion.li
                id=""
                onClick={() => {
                  setCurrentRoute(data.link);
                  navigate(data.link);
                }}
                key={index}
                className={`item  flex  pl-9  items-left p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer ${
                  data.link == currentRoute && "bg-gray-600"
                } `}
                initial={{ visibility: "hidden" }}
                animate={dropdown}
              >
                {data.title}
              </motion.li>
            ))}
          </motion.ul>
        }
      </motion.div>
    </li>
  );
}

export default DropDown;
