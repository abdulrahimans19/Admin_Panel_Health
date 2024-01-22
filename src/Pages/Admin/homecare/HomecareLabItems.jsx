import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { homecare } from "../../../Redux/Features/NavbarSlice";
import ComunButton from "../../../components/Navbar/ComenButton";
import AddLabItemsButton from "./AddLabItemsButton";
import FilterDropDown from "./FilterDropDown";


export function HomecareLabItems() {
  
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
        return ;
        
      // Add cases for other tabs if needed
      default:
        return null; // Return null for cases not handled
    }
  };
  function addcategory() {
    console.log("this is add category in homecare @@@@@@@");
  }
  const editCat = (data) => {
    console.log(data);
  };
  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h2 className="font-bold text-lg">Categories</h2>
          <p>2 available categories</p>
        </div>
        <AddLabItemsButton text={"Add lab items "} callback={addcategory} />
      </div>
      <div className="flex justify-between">
      <div className="text-sm font-medium text-center text-gray-500 dark:text-gray-400">
        <ul className="flex flex-wrap -mb-px">
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
          <FilterDropDown/>
        </div>
      </div>
      
      {renderTabContent()}
    </div>
  );
}
