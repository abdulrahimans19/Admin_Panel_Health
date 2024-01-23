import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { telemedicine } from "../../../Redux/Features/NavbarSlice";
import DoctorRequstTable from "../../../components/Tables/telemedicin/DoctorRequstTable";
import blockimg from "../../../assets/images/Vector.png";
import { useNavigate } from "react-router-dom";
import { DoctorRequests } from "../../../API/ApiCall";

export default function Doctor() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [requests, setRequests] = useState([]);
  const [approved, setApproved] = useState([]);
  const [cancelled, setCancelled] = useState([]);
  const [Blocked, setBlocked] = useState([]);
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    getDoctorRequests();
    dispatch(telemedicine());
  }, []);

  function getDoctorRequests() {
    DoctorRequests().then((data) => {
      setRequests(data?.data?.data?.doctors);
    });
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const renderTabContent = () => {
    switch (activeTab) {
      case 1:
        return (
          <DoctorRequstTable
            isRequsted={true}
            status={"requests"}
            data={requests}
          />
        );

      case 2:
        return (
          <DoctorRequstTable
            btImg={blockimg}
            btText={"Block"}
            status={"approved"}
          />
        );

      case 3:
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
    <div className="container mt-5">
      <div className="text-sm font-medium text-center text-gray-500 dark:text-gray-400">
        <ul className="flex ">
          <li className="me-2">
            <a
              className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg cursor-pointer ${
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
              className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg cursor-pointer ${
                activeTab === 2
                  ? "text-black border-b-2 border-b-black"
                  : "text-gray-500"
              }`}
              onClick={() => handleTabClick(2)}
            >
              Approved
            </a>
          </li>
          {/* <li className="me-2">
            <a
              className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg cursor-pointer ${
                activeTab === 3
                  ? "text-black border-b-2 border-b-black"
                  : "text-gray-500"
              }`}
              onClick={() => handleTabClick(3)}
            >
              Cancelled
            </a>
          </li> */}
          <li className="me-2">
            <a
              className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg cursor-pointer ${
                activeTab === 3
                  ? "text-black border-b-2 border-b-black"
                  : "text-gray-500"
              }`}
              onClick={() => handleTabClick(3)}
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
