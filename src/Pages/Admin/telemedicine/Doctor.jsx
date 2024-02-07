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
  MainDoctorCategories,
  blockedfilterCategoryByIdApi,
  filterCategoryByIdApi,
  pendingfilterCategoryByIdApi,
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
  const [isLoding, setIsLoding] = useState(true);
  const [docCateogries, setDocCateogries] = useState([]);
  const [datas, setData] = useState([]);
  const [selectedCategory, setSlect] = useState("");
  const [catId, setCategoryId] = useState("");

  useEffect(() => {
    getDoctorRequests();
    getAllDoctors();
    getBlockedDoctors();
    getDocCategory();
    const storedActiveTab = localStorage.getItem("STORAGE_KEY");

    if (storedActiveTab) {
      setActiveTab(Number(storedActiveTab));
    }
    dispatch(telemedicine());
  }, []);

  const getDocCategory = async () => {
    try {
      const response = await MainDoctorCategories();

      if (response && response.data && response.data.data) {
        const categories = response.data.data.mainCategories || [];
        setDocCateogries(categories);
      }
    } catch (err) {}
  };

  function getDoctorRequests() {
    DoctorRequests()
      .then((data) => {
        setDocument(data?.data?.data?.total_document);
        setRequests(data?.data?.data?.doctors);
        setIsLoding(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoding(false);
      });
  }

  function getAllDoctors() {
    GetAllDoctors()
      .then((data) => {
        console.log(data?.data?.data);
        setDocument1(data?.data?.data?.total_document);
        setApproved(data?.data?.data?.doctors);
        setIsLoding(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoding(false);
      });
  }

  function getBlockedDoctors() {
    GetAllBlockd()
      .then((data) => {
        //console.log(data?.data?.data);
        setDocument2(data?.data?.data?.total_document);
        setBlocked(data?.data?.data?.doctor);
        console.log(data?.data?.data?.doctor);
        setIsLoding(false);
      })
      .catch((err) => {
        console.log(err);

        setIsLoding(false);
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
            isLoding={isLoding}
            setLOding={setIsLoding}
            setData={setData}
            datas={datas}
            catId={catId}
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
            isLoding={isLoding}
            setLOding={setIsLoding}
            setData={setData}
            datas={datas}
            catId={catId}
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
            isLoding={isLoding}
            setLOding={setIsLoding}
            setData={setData}
            datas={datas}
            catId={catId}
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
                getDoctorRequests();
                setData([]);
                handleTabClick(1);
                setSlect("");
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
                getAllDoctors();
                setData([]);
                handleTabClick(2);
                setSlect("");
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
                getBlockedDoctors();
                setData([]);
                handleTabClick(3);
                setSlect("");
              }}
            >
              Blocked
            </a>
          </li>
        </ul>
      </div>

      <div></div>
      <div className="flex justify-end mt-2">
        <select
          id="categories"
          className="w-full sm:w-[250px] bg-blue-100 rounded-[10px] border-gray border-opacity-10 p-2 px-3 placeholder-white my-2"
          onChange={(e) => {
            const categoryTitle = e.target.options[e.target.selectedIndex].text;
            setSlect(categoryTitle);
            setCategoryId(e.target.value);
            filterCategoryByIdApi(e.target.value).then((data) => {
              setDocument1(data?.data?.total_document);
              setApproved(data?.data?.doctors);
            });
            blockedfilterCategoryByIdApi(e.target.value).then((data) => {
              console.log(data?.data?.doctor, "blocked");
              setDocument2(data?.data?.total_document);
              setBlocked(data?.data?.doctor);
            });
            pendingfilterCategoryByIdApi(e.target.value)
              .then((data) => {
                setDocument(data?.data?.total_document);
                setRequests(data?.data?.doctor);
              })
              .catch((err) => {
                console.log(err);
                setIsLoding(false);
              });
          }}
          value={selectedCategory}
        >
          <option value="" disabled selected>
            Choose a Category
          </option>
          {docCateogries.map((category) => (
            <option key={category._id} value={category._id}>
              {category.title}
            </option>
          ))}
        </select>
      </div>
      {renderTabContent()}
    </div>
  );
}
