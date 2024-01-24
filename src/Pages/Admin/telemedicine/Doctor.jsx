import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { telemedicine } from "../../../Redux/Features/NavbarSlice";
import DoctorRequstTable from "../../../components/Tables/telemedicin/DoctorRequstTable";
import blockimg from "../../../assets/images/Vector.png";
import { useNavigate } from "react-router-dom";
import {
  CanclationDoctor,
  DoctorRequests,
  GetAllDoctors,
} from "../../../API/ApiCall";

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
    getAllDoctors();
    const storedActiveTab = localStorage.getItem("STORAGE_KEY");

    if (storedActiveTab) {
      console.log(storedActiveTab, "  %%%%%%%%%%%%%%%");
      setActiveTab(Number(storedActiveTab));
    }
    dispatch(telemedicine());
  }, []);
  console.log(activeTab, " : active tab in ");
  function getDoctorRequests() {
    DoctorRequests().then((data) => {
      setRequests(data?.data?.data?.doctors);
    });
  }

  function getAllDoctors() {
    GetAllDoctors().then((data) => {
      setApproved(data?.data?.data?.doctors);
    });
  }

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const renderTabContent = () => {
    switch (activeTab) {
      case 1:
        console.log("hiiiiiiiiii  1");
        return (
          <DoctorRequstTable
            isRequsted={true}
            status={"requests"}
            data={requests}
            availabe={"Requested"}
            //callBack={CanclationDoctor}
          />
        );

      case 2:
        localStorage.setItem("STORAGE_KEY", activeTab.toString());
        return (
          <DoctorRequstTable
            btImg={blockimg}
            btText={"Block"}
            status={"approved"}
            data={approved}
            availabe={"available"}
          />
        );

      case 3:
        return (
          <DoctorRequstTable
            btImg={blockimg}
            btText={"UnBlock"}
            status={"unBlock"}
            availabe={"blocked"}
          />
        );
      // Return null for cases not handled
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
