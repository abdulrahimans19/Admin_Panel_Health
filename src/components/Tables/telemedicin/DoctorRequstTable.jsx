import React, { useState } from "react";
import propic from "../../../assets/images/boy.png";
import Promodal from "../../../Pages/Admin/telemedicine/profilemodal/Promodal";

export default function DoctorRequstTable({
  isRequsted,
  btText,
  callBack,
  btImg,
  status,
}) {
  const [showModal, setShowModal] = useState(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  console.log(status + "@@@@@@@ table");
  return (
    <div className="">
      <Promodal
        showModal={showModal}
        toggleModal={toggleModal}
        status={status}
        btImg={btImg}
        btText={btText}
      />
      <h1 className="font-bold mt-3 text-lg">Doctor</h1>
      <p className="text-gray-500 text-xs">2 doctors Requested</p>

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
          <tr class="bg-card rounded text-black text-xs text-center ">
            <td class="p-1">60001</td>
            <td class="p-1 flex justify-center items-center">
              <img src={propic} alt="" className="w-7 h-8" />
            </td>
            <td class="p-1">joel</td>
            <td class="p-1">Hepatology</td>
            <td class="p-1">123@gmail.com</td>
            <td class="p-1">10 year</td>
            <td class="p-1">20/10/2023</td>
            {isRequsted ? (
              <td class="p-1">
                <button
                  style={{ backgroundColor: "#FF8888", color: "#FF0B0B" }}
                  className="text-xs background-transparent mr-1 p-1 pl-3 pr-3 mb-1 outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 rounded"
                  type="button"
                >
                  Cancel
                </button>
                <button
                  style={{ backgroundColor: "#AAFFCC", color: "#41945D" }}
                  className="text-xs p-1 pl-3 pr-3 ml-0.5 mt-1 rounded shadow hover:shadow-lg outline-none focus:outline-none  mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(true)}
                >
                  Accept
                </button>
              </td>
            ) : (
              <button
                style={{ backgroundColor: "#FF8888", color: "#FF0B0B" }}
                className="text-xs background-transparent p-1 pl-3 pr-3 mt-1 outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 rounded"
                type="button"
                onClick={() => setShowModal(true)}
              >
                <div className="flex items-center">
                  {btImg ? (
                    <img src={btImg} alt="" className="w-3 h-3 mr-1" />
                  ) : (
                    ""
                  )}
                  {btText}
                </div>
              </button>
            )}
          </tr>
          <tr class="bg-card rounded text-black   ">
            <td class="p-1">60001</td>
            <td class="p-1 flex justify-center items-center">
              <img src={propic} alt="" className="w-6 h-8" />
            </td>
            <td class="p-1">joel</td>
            <td class="p-1">Hepatology</td>
            <td class="p-1">123@gmail.com</td>
            <td class="p-1">10 year</td>
            <td class="p-1">20/10/2023</td>
            {isRequsted ? (
              <td class="p-1">
                <button
                  style={{ backgroundColor: "#FF8888", color: "#FF0B0B" }}
                  className="text-xs background-transparent mr-1 p-1 pl-3 pr-3 mb-1 outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 rounded"
                  type="button"
                >
                  Cancel
                </button>
                <button
                  style={{ backgroundColor: "#AAFFCC", color: "#41945D" }}
                  className="text-xs p-1 pl-3 pr-3 ml-0.5 mt-1 rounded shadow hover:shadow-lg outline-none focus:outline-none  mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => setShowModal(true)}
                >
                  Accept
                </button>
              </td>
            ) : (
              <button
                style={{ backgroundColor: "#FF8888", color: "#FF0B0B" }}
                className="text-xs background-transparent p-1 pl-3 pr-3 mt-1 outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 rounded"
                type="button"
                onClick={() => setShowModal(true)}
              >
                <div className="flex items-center">
                  {btImg ? (
                    <img src={btImg} alt="" className="w-3 h-3 mr-1" />
                  ) : (
                    ""
                  )}
                  {btText}
                </div>
              </button>
            )}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
