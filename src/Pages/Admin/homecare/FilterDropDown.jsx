import React from "react";

function FilterDropDown() {
  return (
    <div>
      <button
        data-dropdown-toggle="dropdownDelay"
        data-dropdown-delay="500"
        data-dropdown-trigger="hover"
        class="text-black bg-white focus:ring-1 focus:outline-none focus:ring-black hover:bg-white rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center "
        type="button"
      >
        Filter by category{" "}
        <svg
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
      </button>

      {/* <!-- Dropdown menu --> */}
      <div class="z-10 hidden  bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
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
          <li>
            <a
              href="#"
              class="block px-4 py-2 hover:bg-white dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Settings
            </a>
          </li>
          <li>
            <a
              href="#"
              class="block px-4 py-2 hover:bg-white dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Earnings
            </a>
          </li>
          <li>
            <a
              href="#"
              class="block px-4 py-2 hover:bg-white dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Sign out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default FilterDropDown;
