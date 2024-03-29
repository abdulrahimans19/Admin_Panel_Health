import React, { useEffect, useState } from "react";
import searchimg from "../../../assets/images/searchimg1.png";

import NoDataImage from "../../../components/NoDataImage";

import Promodal from "../../../Pages/Admin/telemedicine/profilemodal/Promodal";
import {
  AprovetDoctor,
  CanclationDoctor,
  DoctorRequests,
  GetAllBlockd,
  GetAllDoctors,
  GetSearchAllDoctors,
  blockedfilterCategoryByIdApi,
  filterCategoryByIdApi,
  pendingfilterCategoryByIdApi,
} from "../../../API/ApiCall";
import ReactPaginate from "react-paginate";

export default function DoctorRequstTable({
  isRequsted,
  btText,
  data,
  callBack,
  availabe,
  btImg,
  status,
  document,
  myfunction,
  isLoding,
  setLOding,
  datas,
  setData,
  catId,
}) {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState();
  console.log(data, " this is my checking");
  const [isCancel, setIsCancel] = useState(false);
  const [showNoCategories, setShowNoCategories] = useState(false);

  const [currentPage, setCurrentPage] = useState(0);
  useEffect(() => {
    const delay = setTimeout(() => {
      setShowNoCategories(true);
    }, 3000);

    return () => clearTimeout(delay);
  });

  const handlePageChange = (selectedPage) => {
    if (status === "approved") {
      filterCategoryByIdApi(selectedPage.selected + 1, catId)
        .then((data) => {
          setData(data?.data?.data?.doctors);
          setLOding(false);
        })
        .catch((err) => {
          console.log(err);
          setLOding(false);
        });
      if (status === "requests") {
        pendingfilterCategoryByIdApi(selectedPage.selected + 1, catId)
          .then((data) => {
            setData(data?.data?.data?.doctors);

            setLOding(false);
          })
          .catch((err) => {
            console.log(err);
            setLOding(false);
          });
      }
      if (status === "unBlock") {
        blockedfilterCategoryByIdApi(selectedPage.selected + 1, catId)
          .then((data) => {
            setData(data?.data?.data?.doctors);

            setLOding(false);
          })
          .catch((err) => {
            setLOding(false);
          });
      }
    }
  };
  const reFresh = () => {
    console.log("in reFresh");
    if (status === "approved") {
      console.log("in reFresh 1");
      filterCategoryByIdApi()
        .then((data) => {
          setData(data?.data?.data?.doctors);
          setLOding(false);
        })
        .catch((err) => {
          console.log(err);
          setLOding(false);
        });
      if (status === "requests") {
        console.log("in reFresh 2");
        pendingfilterCategoryByIdApi()
          .then((data) => {
            setData();
            setLOding(false);
          })
          .catch((err) => {
            console.log(err);
            setLOding(false);
          });
      }
      if (status === "unBlock") {
        console.log("in reFresh 3");
        blockedfilterCategoryByIdApi()
          .then((data) => {
            setData(data?.data?.data?.doctors);
            setLOding(false);
          })
          .catch((err) => {
            setLOding(false);
          });
      }
    }
  };
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const [search, setSearch] = useState();
  function searchHandler(e) {
    e.preventDefault();
    GetSearchAllDoctors(search)
      .then((data) => {
        setData(data?.data?.data?.doctors);
        setLOding(false);
      })
      .catch((err) => {
        console.log(err);
        setLOding(false);
      });
  }
  var page = Math.floor(document / 10);
  var remainder = document % 10;
  page = page + (remainder > 0 ? 1 : 0);
  //

  return (
    <div className="container">
      <Promodal
        showModal={showModal}
        toggleModal={toggleModal}
        user={user}
        status={status}
        btImg={btImg}
        btText={btText}
        callback={callBack}
        isSet={true}
        isFunction={myfunction}
        myfunction={reFresh}
        isCancel={isCancel}
        // selectpage={}
      />
      {/* searchHandler */}
      <div className="sm:flex justify-between items-center w-full">
        <div>
          {" "}
          <h1 className="font-bold mt-5 text-lg">Doctor</h1>
          <p className="text-gray-500 mt-3 text-xs">
            {document} doctors {availabe}
          </p>
        </div>
        {/* {status === "approved" && (
          <form onSubmit={searchHandler}>
            <div className="flex p-0 border brder-gray-300 items-center justify-center mr-2">
              <input
                type="text"
                name="search"
                id=""
                onChange={(e) => setSearch(e.target.value)}
                className=" h-  sm:w-full w-8 border-none bg-none outline-none p-1"
              />
              <button type="submit">
                <img src={searchimg} alt="" className=" bg-gray-200 h-8 p-1" />
              </button>
            </div>
          </form>
        )} */}
      </div>
      <div className="overflow-x-auto ">
        {isLoding ? (
          <div>Loding....</div>
        ) : (datas && datas.length > 0) || (data && data.length > 0) ? (
          <table class="table  w-full mt-10 rounded ">
            {/* //tracking-wider */}
            <thead class="text-center rounded-lg  text-gray-500  text-xs">
              <tr>
                <th class="p-1">ID</th>
                <th class="p-1">Profile</th>
                <th class="p-1 text-xs">Name</th>
                <th class="p-1">Category</th>
                <th class="p-1">Email</th>
                <th class="p-1">Experience</th>
                <th class="p-1">Date Added</th>
                <th class="p-1">Status</th>
              </tr>
            </thead>
            <tbody class="text-xs text-center">
              {datas && datas[0]
                ? datas.map((data) => {
                    return (
                      <tr class="bg-card rounded text-black text-xs text-center ">
                        <td class="p-1">{data._id}</td>
                        <td class="p-1 flex justify-center items-center">
                          <img src={data.image} alt="" className="w-10 h-10" />
                        </td>
                        <td class="p-1">{data.name}</td>
                        <td class="p-1">{data.category_id.title}</td>
                        <td class="p-1">{data.email}</td>
                        <td class="p-1">{data.experience}</td>
                        <td class="p-1">{data.created_at}</td>
                        {isRequsted ? (
                          <td class="p-1">
                            <button
                              onClick={() => {
                                setUser(data);
                                callBack = CanclationDoctor;
                                setShowModal(true);
                              }}
                              style={{
                                backgroundColor: "#FF8888",
                                color: "#FF0B0B",
                              }}
                              className="text-xs background-transparent mr-1 p-1 pl-3 pr-3 mb-1 outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 rounded"
                              type="button"
                            >
                              Cancel
                            </button>
                            <button
                              style={{
                                backgroundColor: "#AAFFCC",
                                color: "#41945D",
                              }}
                              className="text-xs p-1 pl-3 pr-3 ml-0.5 mt-1 rounded shadow hover:shadow-lg outline-none focus:outline-none  mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => {
                                setUser(data);
                                console.log(data, "this is user");
                                console.log(data, "this is user");
                                setShowModal(true);
                              }}
                            >
                              Accept
                            </button>
                          </td>
                        ) : (
                          <td className="p-1">
                            <button
                              style={{
                                backgroundColor: "#FF8888",
                                color: "#FF0B0B",
                              }}
                              className="text-xs background-transparent p-1 pl-3 pr-3 mt-1 outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 rounded"
                              type="button"
                              onClick={() => {
                                setUser(data);
                                console.log(user, "this is user");
                                setShowModal(true);
                              }}
                            >
                              <div className="flex items-center pr-1">
                                {btImg ? (
                                  <img
                                    src={btImg}
                                    alt=""
                                    className="w-3 h-3 mr-1"
                                  />
                                ) : (
                                  ""
                                )}
                                {btText}
                              </div>
                            </button>
                          </td>
                        )}
                      </tr>
                    );
                  })
                : data &&
                  data[0] &&
                  data.map((data) => {
                    return (
                      <tr class="bg-card rounded text-black text-xs text-center ">
                        <td class="p-1">{data?._id}</td>
                        <td class="p-1 flex justify-center items-center">
                          <img src={data?.image} alt="" className="w-10 h-10" />
                        </td>
                        <td class="p-1">{data?.name}</td>
                        <td class="p-1">{data.category_id.title}</td>
                        <td class="p-1">{data?.email}</td>
                        <td class="p-1">{data?.experience}</td>
                        <td class="p-1">{data?.created_at}</td>
                        {isRequsted ? (
                          <td class="p-1">
                            <button
                              onClick={() => {
                                setUser(data);
                                setIsCancel(true);
                                setShowModal(true);
                              }}
                              style={{
                                backgroundColor: "#FF8888",
                                color: "#FF0B0B",
                              }}
                              className="text-xs background-transparent mr-1 p-1 pl-3 pr-3 mb-1 outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 rounded"
                              type="button"
                            >
                              Cancel
                            </button>
                            <button
                              style={{
                                backgroundColor: "#AAFFCC",
                                color: "#41945D",
                              }}
                              className="text-xs p-1 pl-3 pr-3 ml-0.5 mt-1 rounded shadow hover:shadow-lg outline-none focus:outline-none  mb-1 ease-linear transition-all duration-150"
                              type="button"
                              onClick={() => {
                                setUser(data);
                                console.log(data, "this is user");
                                setShowModal(true);
                              }}
                            >
                              Accept
                            </button>
                          </td>
                        ) : (
                          <td className="p-1">
                            <button
                              style={{
                                backgroundColor: "#FF8888",
                                color: "#FF0B0B",
                              }}
                              className="text-xs background-transparent p-1 pl-3 pr-3 mt-1 outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 rounded"
                              type="button"
                              onClick={() => {
                                setUser(data);
                                console.log(data, "this is user");
                                setShowModal(true);
                              }}
                            >
                              <div className="flex items-center pr-1">
                                {btImg ? (
                                  <img
                                    src={btImg}
                                    alt=""
                                    className="w-3 h-3 mr-1"
                                  />
                                ) : (
                                  ""
                                )}
                                {btText}
                              </div>
                            </button>
                          </td>
                        )}
                      </tr>
                    );
                  })}
            </tbody>
          </table>
        ) : (
          showNoCategories && <NoDataImage text={"no data available"} />
        )}
      </div>

      {page > 1 && (
        <ReactPaginate
          pageCount={page} // Replace with the total number of pages
          pageRangeDisplayed={3} // Number of pages to display in the pagination bar
          marginPagesDisplayed={1} // Number of pages to display for margin pages
          onPageChange={handlePageChange}
          containerClassName={"pagination"}
          activeClassName={"active"}
        />
      )}
    </div>
  );
}
