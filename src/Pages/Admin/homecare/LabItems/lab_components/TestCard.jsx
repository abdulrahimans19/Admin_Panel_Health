import React, { useState } from "react";
import { motion, useAnimationControls } from "framer-motion";

function TestCard() {
  const [openMenu, setOpenMenu] = React.useState(false);
  const list = {
    visible: { opacity: 1, scale: 1 },
    hidden: { opacity: 0, scale: 0 },
  };

  const item = {
    visible: { opacity: 1, x: 0 },
    hidden: { opacity: 0, x: -100 },
  };
  const controls = useAnimationControls();
  const toggleMenu = () => {
    setOpenMenu(!openMenu);
    controls.start(openMenu ? "hidden" : "visible");
  };

  return (
    <div>
      <div class="">
        {/* <!-- TW Elements is free under AGPL, with commercial license required for specific uses. See more details: https://tw-elements.com/license/ and contact us for queries at tailwind@mdbootstrap.com -->  */}

        <div class="px-5 py-2.5 rounded-lg border border-zinc-300 flex-col">
          <div class="flex-col justify-start items-start flex">
            <div className="flex gap-2">
              <div className="">
                <p class=" text-lg font-semibold">
                  Comprehensive full body check up with vitamin
                </p>
              </div>
              <div style={{ width: '30px', height: '30px' }}>
                <svg
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
                    <rect width="10" height="10" fill="white"></rect>{" "}
                    <circle
                      cx="12"
                      cy="7"
                      r="0.5"
                      transform="rotate(90 12 7)"
                      stroke="#000000"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></circle>{" "}
                    <circle
                      cx="12"
                      cy="12"
                      r="0.5"
                      transform="rotate(90 12 12)"
                      stroke="#000000"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></circle>{" "}
                    <circle
                      cx="12"
                      cy="17"
                      r="0.5"
                      transform="rotate(90 12 17)"
                      stroke="#000000"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></circle>{" "}
                  </g>
                </svg>
                {openMenu && (
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
                )}
              </div>
            </div>
            <div class="justify-start items-start gap-2.5 inline-flex">
              <h3 class="text-slate-600 text-xs font-normal">
                Includes 90 tests
              </h3>
              <div class="justify-start items-end gap-1 flex">
                <div class="w-3.5 h-3.5 relative">
                  <div class="w-3.5 h-3.5 left-0 top-0 absolute"></div>
                </div>
                <div class="text-slate-500 text-xs font-light">
                  Reports in 15 Hrs
                </div>
              </div>
            </div>
            <div class="w-6 h-6 left-[290px] top-[4px] absolute">
              <div class="w-6 h-6 left-0 top-[24px] absolute origin-top-left -rotate-90">
                <div class="w-6 h-6 left-0 top-0 absolute"></div>
              </div>
            </div>
          </div>
          <div class="justify-end items-center gap-40 inline-flex">
            <div class="justify-end items-center gap-1 flex">
              <div class="flex-col justify-center items-start gap-2.5 inline-flex">
                <p class="text-slate-500 text-xs font-normal line-through">
                  AED 150
                </p>
                <p class="text-slate-600 text-base font-bold">AED 100</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestCard;
