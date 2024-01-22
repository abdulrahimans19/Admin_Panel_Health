import React, { useState } from "react";

function FilterDropDown({text},callback,isappoiment) {
  const [isOpen,setIsOpen]=useState(false)
  return (
    <div>
      <div >
      <button
      id="dropdownButton"
        data-dropdown-toggle="dropdownDelay"
        data-dropdown-delay="500"
        data-dropdown-trigger="hover"
        // onClick={callback}
        class="text-black shadow-sm ring-1 ring-inset ring-gray-300 bg-white focus:ring-1 focus:outline-none focus:ring-black hover:bg-white rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center "
        type="button"
      >
        {text}
        { isappoiment? <svg
          class="w-2.5 h-2.5 ms-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
        : <svg width="20px" height="20px" viewBox="0 0 24.00 24.00" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M20 10V7C20 5.89543 19.1046 5 18 5H6C4.89543 5 4 5.89543 4 7V10M20 10V19C20 20.1046 19.1046 21 18 21H6C4.89543 21 4 20.1046 4 19V10M20 10H4M8 3V7M16 3V7" stroke="#000000" stroke-width="1.008" stroke-linecap="round"></path> <rect x="6" y="12" width="3" height="3" rx="0.5" fill="#000000"></rect> <rect x="10.5" y="12" width="3" height="3" rx="0.5" fill="#000000"></rect> <rect x="15" y="12" width="3" height="3" rx="0.5" fill="#000000"></rect> </g></svg>}
        
      </button>
    <div id="dropdown" class="z-10 hidden  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
    <ul
      class="py-2 text-sm text-gray-700 dark:text-gray-200"
      aria-labelledby="dropdownDelayButton"
    >
      <li>
        <a
          href="#"
          class="block px-4 py-2 hover:bg-white dark:hover:bg-gray-600 dark:hover:text-white"
        >
          Dashboard
        </a>
      </li>
    </ul>
  </div>
    
      {/* <!-- Dropdown menu --> */}
      
      </div>
    </div>
  );
}

export default FilterDropDown;
