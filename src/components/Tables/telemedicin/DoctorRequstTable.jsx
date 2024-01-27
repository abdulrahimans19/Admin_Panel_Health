import React, { useEffect, useState } from "react";

import Promodal from "../../../Pages/Admin/telemedicine/profilemodal/Promodal";
import { GetAllDoctors } from "../../../API/ApiCall";

export default function DoctorRequstTable({
  isRequsted,
  btText,
  data,
  callBack,
  availabe,
  btImg,
  status,
  document,
}) {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState();
  const [datas, setData] = useState([]);
  const [pagenum, setPagenum] = useState(1);

  const getPageDatas = () => {
    if (status === "approved") {
      GetAllDoctors(pagenum).then((data) => {
        setData(data?.data?.data?.doctors);
      });
    }
  };
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  let page = document / 10;
  console.log(page, "       page num");

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
      />
      <h1 className="font-bold mt-3 text-lg">Doctor</h1>
      <p className="text-gray-500 text-xs">
        {document} doctors {availabe}
      </p>

      <table class="table-auto w-full mt-5 rounded ">
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
                            setUser(data._id);
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
      {page > 1 ? (
        <div className="mt-5">
          <nav aria-label="flex justify-center">
            <ul className="list-style-none flex justify-center">
              <li>
                <a
                  className="relative block rounded bg-transparent px-5 py-3 text-lg text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                  href="#!"
                  onClick={() => {
                    if (pagenum > 1) {
                      setPagenum(pagenum - 1);
                      getPageDatas();
                    }
                  }}
                >
                  Previous
                </a>
              </li>
              {Array.from({ length: page }, (_, index) => (
                <li key={index}>
                  <a
                    className={`relative block rounded bg-transparent px-5 py-3 text-lg text-neutral-600 transition-all duration-300 ${
                      index + 1 == pagenum ? "bg-neutral-500" : ""
                    }   dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white`}
                    href="#!"
                    onClick={() => {
                      setPagenum(index + 1);

                      getPageDatas();
                    }}
                  >
                    {index + 1}
                  </a>
                </li>
              ))}

              <li>
                <a
                  className="relative block rounded bg-transparent px-5 py-3 text-lg text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white"
                  href="#!"
                  onClick={() => {
                    if (pagenum < page) {
                      setPagenum(pagenum + 1);
                      getPageDatas();
                    }
                  }}
                >
                  Next
                </a>
              </li>
            </ul>
          </nav>
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
