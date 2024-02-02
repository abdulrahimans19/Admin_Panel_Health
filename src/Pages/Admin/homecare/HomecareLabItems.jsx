import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { homecare } from "../../../Redux/Features/NavbarSlice";
import ComunButton from "../../../components/Navbar/ComenButton";

import AddLabItemsButton from "./AddLabItemsButton";
import FilterDropDown from "./FilterDropDown";
import AllTests from "./LabItems/AllTests";
import Recommended from "./LabItems/Recommended";
import Disabled from "./LabItems/Disabled";
import LabModal from "./LabItems/lab_components/LabModal";
import { GetHomecareCategoriesApi, createTests } from "../../../API/ApiCall";
import { setFilter } from "../../../Redux/Features/AdminSlice";

export function HomecareLabItems() {
  const [showLabModal1, setShowLabModal1] = useState(false);
  const [testCategories, setTestCategories] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");
  const toggleMenu = () => {
    console.log("togggl", showLabModal1);
    setShowLabModal1(!showLabModal1);
  };

  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = React.useState(1);
  useEffect(() => {
    dispatch(homecare());
    GetHomecareCategoriesApi().then((data) => {
      setTestCategories(data.data.data.mainCategories);
      // console.log(data.data.data.mainCategories);
    });
  }, []);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const handleEvent = (data) => {
    dispatch(setFilter(data));
  };
  const renderTabContent = () => {
    switch (activeTab) {
      case 1:
        return <AllTests />;
      case 2:
        return <Recommended />;
      case 3:
        return <Disabled />;

      // Add cases for other tabs if needed
      default:
        return null; // Return null for cases not handled
    }
  };
  function addcategory() {
    console.log("this is add category in homecare @@@@@@@");
  }
  const filterCallback = (data) => {
    console.log(data);
  };
  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h2 className="font-bold text-lg">Lab Items</h2>
          {/* <p>2 available items</p> */}
        </div>
      </div>
      <div className=" justify-between mt-2">
        <div className="text-sm font-medium text-center text-gray-500 dark:text-gray-400">
          <ul className="flex -mb-px">
            <li className="me-2">
              <a
                href="#"
                className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg ${
                  activeTab === 1
                    ? "text-black border-b-2 border-b-black"
                    : "text-gray-500"
                }`}
                onClick={() => handleTabClick(1)}
              >
                All Tests
              </a>
            </li>
            <li className="me-2">
              <a
                href="#"
                className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg ${
                  activeTab === 2
                    ? "text-black border-b-2 border-b-black"
                    : "text-gray-500"
                }`}
                onClick={() => handleTabClick(2)}
              >
                Recommended
              </a>
            </li>
            <li className="me-2">
              <a
                href="#"
                className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg ${
                  activeTab === 3
                    ? "text-black border-b-2 border-b-black"
                    : "text-gray-500"
                }`}
                onClick={() => handleTabClick(3)}
              >
                Disabled
              </a>
            </li>
          </ul>
        </div>
        <div className="relative p-2 flex justify-end">
          <div>
            <select
              onChange={(e) => {
                setFilterCategory(e.target.value);

                handleEvent(e.target.value);
              }}
              id="category"
              class="rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 p-2"
            >
              <option disabled selected value="Filter by category">
                Filter Category
              </option>

              {testCategories[0] &&
                testCategories.map((data) => {
                  return <option value={data?._id}>{data.title}</option>;
                })}
            </select>

            {/* <!-- Dropdown menu --> */}
          </div>
          {showLabModal1 && (
            <LabModal callback={toggleMenu} setShowModal={setShowLabModal1} />
          )}
        </div>
      </div>

      {renderTabContent()}
    </div>
  );
}
