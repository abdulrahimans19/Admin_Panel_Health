import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { telemedicine } from "../../../Redux/Features/NavbarSlice";
import DoctorRequstTable from "../../../components/Tables/telemedicin/DoctorRequstTable";
import blockimg from "../../../assets/images/Vector.png";
import { useNavigate } from "react-router-dom";
import {
  AprovetDoctor,
  BlockOrUnBlockDoctor,
  DoctorRequests,
  GetAllBlockd,
  GetAllDoctors,
} from "../../../API/ApiCall";

export default function Doctor() {
  const dispatch = useDispatch();
  const [requests, setRequests] = useState([]);
  const [approved, setApproved] = useState([]);
  // const [cancelled, setCancelled] = useState([]);
  const [Blocked, setBlocked] = useState([]);
  const [document, setDocument] = useState(0);
  const [document1, setDocument1] = useState(0);
  const [document2, setDocument2] = useState(0);
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    getDoctorRequests();
    getAllDoctors();
    getBlockedDoctors();
    const storedActiveTab = localStorage.getItem("STORAGE_KEY");

    if (storedActiveTab) {
      setActiveTab(Number(storedActiveTab));
    }
    dispatch(telemedicine());
  }, []);

  function getDoctorRequests() {
    DoctorRequests()
      .then((data) => {
        setDocument(data?.data?.data?.total_document);
        setRequests(data?.data?.data?.doctors);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getAllDoctors() {
    GetAllDoctors()
      .then((data) => {
        console.log(data?.data?.data);
        setDocument1(data?.data?.data?.total_document);
        setApproved(data?.data?.data?.doctors);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getBlockedDoctors() {
    GetAllBlockd()
      .then((data) => {
        //console.log(data?.data?.data);
        setDocument2(data?.data?.data?.total_document);
        setBlocked(data?.data?.data?.doctor);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  //console.log(Blocked);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const renderTabContent = () => {
    switch (activeTab) {
      case 1:
        // getDoctorRequests();
        return (
          <DoctorRequstTable
            isRequsted={true}
            status={"requests"}
            data={requests}
            availabe={"Requested"}
            myfunction={getDoctorRequests}
            callBack={AprovetDoctor}
            document={document}
          />
        );

      case 2:
        // getAllDoctors();
        return (
          <DoctorRequstTable
            btImg={blockimg}
            btText={"Block"}
            myfunction={getAllDoctors}
            status={"approved"}
            data={approved}
            document={document1}
            availabe={"available"}
            callBack={BlockOrUnBlockDoctor}
          />
        );

      case 3:
        // getBlockedDoctors();
        return (
          <DoctorRequstTable
            btImg={blockimg}
            btText={"UnBlock"}
            status={"unBlock"}
            availabe={"blocked"}
            document={document2}
            data={Blocked}
            myfunction={getBlockedDoctors}
            callBack={BlockOrUnBlockDoctor}
          />
        );
      // Return null for cases not handled
    }
  };
  return (
    <div className="container mt-5">
      <div className="text-sm font-medium text-center text-gray-500 dark:text-gray-400">
        <ul className="flex overflow-auto ">
          <li className="me-2">
            <a
              className={`inline-block p-4 border-b-2 border-transparent rounded-t-lg cursor-pointer ${
                activeTab === 1
                  ? "text-black border-b-2 border-b-black"
                  : "text-gray-500"
              }`}
              onClick={() => {
                localStorage.setItem("STORAGE_KEY", "1");
                handleTabClick(1);
              }}
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
              onClick={() => {
                localStorage.setItem("STORAGE_KEY", "2");
                handleTabClick(2);
              }}
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
              onClick={() => {
                localStorage.setItem("STORAGE_KEY", "3");
                handleTabClick(3);
              }}
            >
              Blocked
            </a>
          </li>
        </ul>
      </div>
      <div></div>
      {renderTabContent()}
    </div>
  );
}
