import React, { useState } from "react";
import Promodal from "../../../Pages/Admin/telemedicine/profilemodal/Promodal";
import ReactPaginate from "react-paginate";
import {
  GetDoctorWithdrawalRequsts,
  GetDrAprovedWithdrawalRequsts,
} from "../../../API/ApiCall";

function WithdrawalTable({
  data,
  document,
  availabe,
  callBack,
  btText,
  setData,
}) {
  const [showModal, setShowModal] = useState(false);
  const [user, setUser] = useState();
  const [withdrawID, setWithdrawID] = useState();
  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handlePageChange = (selectedPage) => {
    if (btText === "Approved") {
      GetDrAprovedWithdrawalRequsts(selectedPage.selected + 1).then((data) => {
        setData(data?.data?.data?.doctors);
      });
    } else {
      GetDoctorWithdrawalRequsts(selectedPage.selected + 1).then((data) => {
        setData(data?.data?.data?.doctors);
      });
    }
  };
  var page = Math.floor(document / 10);
  var remainder = document % 10;
  page = page + (remainder > 0 ? 1 : 0);
  console.log(page, "       page num");
  return (
    <div className="container">
      <Promodal
        showModal={showModal}
        toggleModal={toggleModal}
        user={user}
        callback={callBack}
        status={"aprove"}
        id={withdrawID}
      />
      <h1 className="font-bold mt-3 text-lg">Doctor</h1>
      <p className="text-gray-500 text-xs">
        {document} doctors {availabe}
      </p>
      <table class="table-auto w-full mt-5 rounded mt-2">
        {/* //tracking-wider */}
        <thead class="text-center rounded-lg  text-gray-500  text-xs">
          <tr>
            <th class="p-1">ID</th>
            <th class="p-1">Date/time</th>
            <th class="p-1">Profile</th>
            <th class="p-1 text-xs">Name</th>
            <th class="p-1 text-xs">Country</th>
            <th class="p-1">Bank</th>
            <th class="p-1">Account Number</th>
            <th class="p-1">Swift Code</th>
            <th class="p-1">Balance</th>
            <th class="p-1">Request Amount</th>

            <th class="p-1">Status</th>
          </tr>
        </thead>
        <tbody class="text-xs text-center">
          {data &&
            data[0] &&
            data.map((data) => {
              return (
                <tr class="bg-card rounded text-black text-xs text-center ">
                  <td class="p-1">{data._id}</td>
                  {
                    <td class="p-1">
                      {" "}
                      {data.created_at &&
                        new Date(data.created_at).toLocaleString()}
                    </td>
                  }
                  <td class="p-1 flex justify-center items-center">
                    <img
                      src={data?.doctor_id?.image}
                      alt=""
                      className="w-10 h-10"
                    />
                  </td>
                  <td class="p-1">{data.name}</td>
                  <td class="p-1">{data.country}</td>
                  <td class="p-1">{data.bank_name}</td>
                  <td class="p-1">{data.account_number}</td>
                  <td class="p-1">{data.swift_code}</td>
                  <td class="p-1">{data?.doctor_id?.wallet}</td>
                  <td class="p-1">{data.amount}</td>

                  <td class="p-1">
                    {btText === "Approved" ? (
                      <p
                        style={{
                          backgroundColor: "#AAFFCC",
                          color: "#41945D",
                        }}
                        className="text-xs p-1 pl-3 pr-3 ml-0.5 mt-1 rounded  outline-none focus:outline-none  mb-1 ease-linear transition-all duration-150"
                      >
                        {btText}
                      </p>
                    ) : (
                      <button
                        style={{
                          backgroundColor: "#AAFFCC",
                          color: "#41945D",
                        }}
                        className="text-xs p-1 pl-3 pr-3 ml-0.5 mt-1 rounded shadow hover:shadow-lg outline-none focus:outline-none  mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => {
                          setUser(data?.doctor_id);
                          setWithdrawID(data?._id);
                          setShowModal(true);
                        }}
                      >
                        {btText}
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
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

export default WithdrawalTable;
