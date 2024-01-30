import React from "react";
import downArrow from "../../../assets/images/arrowDown.png";
import calender from "../../../assets/images/solar_calendar-outline.png";

export default function Appointments() {
  return (
    <div>
      <div className="container p-3">
        <div className="flex justify-between">
          <div>
            <h1 className="text-xl font-extrabold mb-3">
              See what you got here!!
            </h1>
            <p className="text-gray-500 text-sm">
              There are new appointments awaits you
            </p>
          </div>
          <div className="flex justify-center items-center ">
            <select
              className="border border-blue-300 border-thin 
            p-1 pt-3 pb-3 rounded-full flex  justify-center items-center"
            >
              <option value="today">Today</option>
              <option value="tomorrow">Tomorrow</option>
              <option value="yesterday">Yestterday</option>
            </select>
            <div className="ml-3 p-2 h-[50px] w-[50px] justify-center items-center flex rounded-full border border-blue-300 border-thin ">
              <img src={calender} className="" alt="" />
            </div>
          </div>
        </div>
        {/* {Head} */}
        <div>
          <h1 className="text-xl text-blue-400 text-extrabold mt-10 mb-3">
            Today
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 mb-4 mt-6">
          {/* card */}
          <div className="p-3 border w-[350px] border-blue-300 border-thin rounded-lg">
            <div className=" flex  items-center ">
              <div className=" w-[100px] h-[100px] rounded-full border border-blue-300 border-thin"></div>
              <div className="ml-3">
                <h1 className=" font-bold">Mrs. Watkins rome</h1>
                <p className="text-gray-400 text-xs mt-4">Duration: 30 min</p>
              </div>
            </div>
            <div className="text-center text-sm text-gray-400 mt-5">
              <p>
                Problem: Blood sugar increased and feels a little bit
                <br /> missing the amount of platelets on the blood cell
              </p>
            </div>
            <div className="p-3">
              <button className="w-full bg-blue-400 text-white p-3 rounded-lg mt-6">
                join
              </button>
            </div>
          </div>
          {/* card */}
          {/* card */}
          <div className="p-3 border w-[350px] border-blue-300 border-thin rounded-lg">
            <div className=" flex  items-center ">
              <div className=" w-[100px] h-[100px] rounded-full border border-blue-300 border-thin"></div>
              <div className="ml-3">
                <h1 className=" font-bold">Mrs. Watkins rome</h1>
                <p className="text-gray-400 text-xs mt-4">Duration: 30 min</p>
              </div>
            </div>
            <div className="text-center text-sm text-gray-400 mt-5">
              <p>
                Problem: Blood sugar increased and feels a little bit
                <br /> missing the amount of platelets on the blood cell
              </p>
            </div>
            <div className="p-3">
              <button className="w-full bg-blue-400 text-white p-3 rounded-lg mt-6">
                join
              </button>
            </div>
          </div>
          {/* card */}
          {/* card */}
          <div className="p-3 border w-[350px] border-blue-300 border-thin rounded-lg">
            <div className=" flex  items-center ">
              <div className=" w-[100px] h-[100px] rounded-full border border-blue-300 border-thin"></div>
              <div className="ml-3">
                <h1 className=" font-bold">Mrs. Watkins rome</h1>
                <p className="text-gray-400 text-xs mt-4">Duration: 30 min</p>
              </div>
            </div>
            <div className="text-center text-sm text-gray-400 mt-5">
              <p>
                Problem: Blood sugar increased and feels a little bit
                <br /> missing the amount of platelets on the blood cell
              </p>
            </div>
            <div className="p-3">
              <button className="w-full bg-blue-400 text-white p-3 rounded-lg mt-6">
                join
              </button>
            </div>
          </div>
          {/* card */}
          {/* card */}
          <div className="p-3 border w-[350px] border-blue-300 border-thin rounded-lg">
            <div className=" flex  items-center ">
              <div className=" w-[100px] h-[100px] rounded-full border border-blue-300 border-thin"></div>
              <div className="ml-3">
                <h1 className=" font-bold">Mrs. Watkins rome</h1>
                <p className="text-gray-400 text-xs mt-4">Duration: 30 min</p>
              </div>
            </div>
            <div className="text-center text-sm text-gray-400 mt-5">
              <p>
                Problem: Blood sugar increased and feels a little bit
                <br /> missing the amount of platelets on the blood cell
              </p>
            </div>
            <div className="p-3">
              <button className="w-full bg-blue-400 text-white p-3 rounded-lg mt-6">
                join
              </button>
            </div>
          </div>
          {/* card */}
          {/* card */}
          <div className="p-3 border w-[350px] border-blue-300 border-thin rounded-lg">
            <div className=" flex  items-center ">
              <div className=" w-[100px] h-[100px] rounded-full border border-blue-300 border-thin"></div>
              <div className="ml-3">
                <h1 className=" font-bold">Mrs. Watkins rome</h1>
                <p className="text-gray-400 text-xs mt-4">Duration: 30 min</p>
              </div>
            </div>
            <div className="text-center text-sm text-gray-400 mt-5">
              <p>
                Problem: Blood sugar increased and feels a little bit
                <br /> missing the amount of platelets on the blood cell
              </p>
            </div>
            <div className="p-3">
              <button className="w-full bg-blue-400 text-white p-3 rounded-lg mt-6">
                join
              </button>
            </div>
          </div>
          {/* card */}
          {/* card */}
          <div className="p-3 border w-[350px] border-blue-300 border-thin rounded-lg">
            <div className=" flex  items-center ">
              <div className=" w-[100px] h-[100px] rounded-full border border-blue-300 border-thin"></div>
              <div className="ml-3">
                <h1 className=" font-bold">Mrs. Watkins rome</h1>
                <p className="text-gray-400 text-xs mt-4">Duration: 30 min</p>
              </div>
            </div>
            <div className="text-center text-sm text-gray-400 mt-5">
              <p>
                Problem: Blood sugar increased and feels a little bit
                <br /> missing the amount of platelets on the blood cell
              </p>
            </div>
            <div className="p-3">
              <button className="w-full bg-blue-400 text-white p-3 rounded-lg mt-6">
                join
              </button>
            </div>
          </div>
          {/* card */}
          {/* card */}
          <div className="p-3 border w-[350px] border-blue-300 border-thin rounded-lg">
            <div className=" flex  items-center ">
              <div className=" w-[100px] h-[100px] rounded-full border border-blue-300 border-thin"></div>
              <div className="ml-3">
                <h1 className=" font-bold">Mrs. Watkins rome</h1>
                <p className="text-gray-400 text-xs mt-4">Duration: 30 min</p>
              </div>
            </div>
            <div className="text-center text-sm text-gray-400 mt-5">
              <p>
                Problem: Blood sugar increased and feels a little bit
                <br /> missing the amount of platelets on the blood cell
              </p>
            </div>
            <div className="p-3">
              <button className="w-full bg-blue-400 text-white p-3 rounded-lg mt-6">
                join
              </button>
            </div>
          </div>
          {/* card */}
        </div>
      </div>
    </div>
  );
}
