import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { telemedicine } from "../../../Redux/Features/NavbarSlice";
import DoctorRequstTable from "../../../components/Tables/telemedicin/DoctorRequstTable";

export default function Doctor() {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    dispatch(telemedicine());
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const renderTabContent = () => {
    switch (activeTab) {
      case 1:
        return <DoctorRequstTable />;
      // Add cases for other tabs if needed
      default:
        return null; // Return null for cases not handled
    }
  };
  return (
    <div>
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
              Profile
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
              Dashboard
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
              Settings
            </a>
          </li>
          <li className="me-2">
            <a
              href="#"
              className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg ${
                activeTab === 4
                  ? "text-black border-b-2 border-b-black"
                  : "text-gray-500"
              }`}
              onClick={() => handleTabClick(4)}
            >
              Contacts
            </a>
          </li>
        </ul>
      </div>
      {renderTabContent()}
    </div>
  );
}
