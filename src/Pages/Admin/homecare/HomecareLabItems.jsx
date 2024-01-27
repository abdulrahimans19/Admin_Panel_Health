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


export function HomecareLabItems() {
  
  const [showModal, setShowModal] = useState(false);

  const toggleMenu=()=> {
    setShowModal(!showModal)
  };
  
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = React.useState(1);
  useEffect(() => {
    dispatch(homecare());
  }, []);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const renderTabContent = () => {
    switch (activeTab) {
      case 1:
        return <AllTests/>;
      case 2:
        return <Recommended/>;
      case 3:
        return <Disabled/>;
        
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
      
        <LabModal showModal={showModal} callback={toggleMenu}/>
        
      <div className="flex justify-between">
        <div>
          <h2 className="font-bold text-lg">Lab Items</h2>
          {/* <p>2 available items</p> */}
        </div>
        <AddLabItemsButton showModel={showModal}  text={"Add lab items "} callback={toggleMenu} />
        
      </div>
      <div className="flex justify-between mt-2">
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
      <div className="relative">
          <FilterDropDown text={"Filter by category"} callback={filterCallback}/>
        </div>
      </div>
      
      {renderTabContent()}
    </div>
  );
}
