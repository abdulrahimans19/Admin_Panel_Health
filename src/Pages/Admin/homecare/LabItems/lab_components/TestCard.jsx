import React, { useState } from "react";
import AddLabItemsButton from "../../AddLabItemsButton";
import LabModal from "./LabModal";

function TestCard(data, callback, isdisbled) {
  const [showList, setShowList] = useState(false);
  const [showModal, setShowModal] = React.useState(false);
  // const [showModal1, setShowModal1] = React.useState(false);

  const toggleMenu = () => {
    setShowList(!showList);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <div>
      <LabModal showModal={showModal} callback={toggleModal} />
      <div class="relative">
        {/* <!-- TW Elements is free under AGPL, with commercial license required for specific uses. See more details: https://tw-elements.com/license/ and contact us for queries at tailwind@mdbootstrap.com -->  */}

        <div class="px-5 py-2.5 rounded-lg border border-zinc-300 flex-col">
          <div class="flex-col justify-start items-start flex">
            <div className="flex text gap-10">
              {isdisbled ? 
                <div className="top-0 absolute p-2">
                  <label class="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" value="" class="sr-only peer" />
                    <div class="w-6 h-3 bg-red-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[0px] after:start-[0px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all  peer-checked:bg-green-600"></div>
                    <span class="ms-3 text-sm font-medium text-gray-900 "></span>
                  </label>
                </div>
               : null}
              <div className="">
                <p class="text-lg font-semibold">{data.data?.name}</p>
              </div>
              <div
                className=""
                // onClick={(event) => toggleMenu(event)}
                style={{ width: "30px", height: "30px", cursor: "pointer" }}
              >
                <button
                  onClick={toggleMenu}
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
                {showList && (
                  <div
                    id="dropdown"
                    class=" absolute right-16 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
                  >
                    <ul class="py-2" aria-labelledby="dropdownButton">
                      <li>
                        <a
                          onClick={toggleModal}
                          href="#"
                          class="block px-4 py-2 text-sm text-neutral-950 hover:bg-gray-100 dark:text-black dark:hover:text-black"
                        >
                          Edit
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={toggleMenu}
                          href="#"
                          class="block px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:text-red-600"
                        >
                          Disabled
                        </a>
                      </li>
                      <li>
                        <a
                          onClick={toggleMenu}
                          href="#"
                          class="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100  dark:text-black dark:hover:text-black"
                        >
                          Add to Recommended
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
            <div class="justify-start items-start gap-2.5 inline-flex">
              <h3 class="text-slate-600 text-xs font-normal">
                Includes {data.data.daily_test_limit} tests
              </h3>
              <div class="justify-start items-end gap-1 flex">
                <div class="w-3.5 h-3.5 relative">
                  <div class="w-3.5 h-3.5 left-0 top-0 absolute"></div>
                </div>
                <div class="text-slate-500 text-xs font-light">
                  Reports in {data.data.testing_time} Hrs
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
                  AED {data.data.price + 50}
                </p>
                <p class="text-slate-600 text-base font-bold">
                  AED {data.data.price}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TestCard;
