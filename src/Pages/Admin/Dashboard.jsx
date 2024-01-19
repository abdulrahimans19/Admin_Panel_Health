import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cleartopNav } from "../../Redux/Features/NavbarSlice";
import LineChart from "../../components/Linechart";
import PriceDisplayCard from "../../components/PriceDisplayCard";

export default function Dashboard() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(cleartopNav());
  }, []);
  return (
    <div>
      <h1 className="text-2xl font-bold p-4 ">DashBoard</h1>
      <div class="grid grid-cols-3 gap-4 mb-4">
        <div class="grid grid-cols-3 gap-4 mb-4 col-span-2">
          <PriceDisplayCard />
          <PriceDisplayCard />
          <PriceDisplayCard />

          <div className="col-span-3">
            <LineChart />
          </div>
        </div>

        <div class="flex items-center justify-center h-24 rounded bg-gray-50 dark:bg-gray-800">
          <p class="text-2xl text-gray-400 dark:text-gray-500">
            <svg
              class="w-3.5 h-3.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 18 18"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 1v16M1 9h16"
              />
            </svg>
          </p>
        </div>
      </div>
    </div>
  );
}
