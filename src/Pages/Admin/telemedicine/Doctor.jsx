import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { telemedicine } from "../../../Redux/Features/NavbarSlice";
import DoctorRequstTable from "../../../components/Tables/telemedicin/DoctorRequstTable";
import blockimg from "../../../assets/images/Vector.png";
import { useNavigate } from "react-router-dom";

export default function Doctor() {
  const navigate = useNavigate();
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
        return <DoctorRequstTable isRequsted={true} status={"requests"} />;

      case 2:
        return (
          <DoctorRequstTable
            btImg={blockimg}
            btText={"Block"}
            status={"approved"}
          />
        );
      case 3:
        return <DoctorRequstTable btText={"Canselled"} status={"canselled"} />;
      case 4:
        return (
          <DoctorRequstTable
            btImg={blockimg}
            btText={"UnBlock"}
            status={"unBlock"}
          />
        );

      default:
        return <DoctorRequstTable isRequsted={true} />; // Return null for cases not handled
    }
  };
  return (
    <div className="container">
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
              Requests
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
              Approved
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
              Cancelled
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
              Blocked
            </a>
          </li>
        </ul>
      </div>

      {renderTabContent()}
    </div>
  );
}
