import React, { useState } from "react";
import { motion, useAnimationControls } from "framer-motion";

function TestCard() {
  const [showList, setShowList] = React.useState(false);
  function onclickss() {
    setShowList(!showList);
  }
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
              <div
                // onClick={(event) => toggleMenu(event)}
                style={{ width: "30px", height: "30px", cursor: "pointer" }}
              >
                <button
                  onClick={() => onclickss()}
                  id="dropdownButton"
                  data-dropdown-toggle="dropdown"
                  class="inline-block dark:focus:ring-gray-700 rounded-lg text-sm p-0.5"
                  type="button"
                >
                  <svg
                    class="w-4 h-5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 16 3"
                  >
                    <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                  </svg>
                </button>
                {showList ? (
                  <div
                    id="dropdown"
                    class="z-10 absolute right-16 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
                  >
                    <ul class="py-2" aria-labelledby="dropdownButton">
                      <li>
                        <a
                          href="#"
                          class="block px-4 py-2 text-sm text-neutral-950 hover:bg-gray-100 dark:text-black dark:hover:text-black"
                        >
                          Edit
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          class="block px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:text-red-600"
                        >
                          Disabled
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100  dark:text-black dark:hover:text-black"
                        >
                          Add to Recommended
                        </a>
                      </li>
                    </ul>
                  </div>
                ) : null }
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
