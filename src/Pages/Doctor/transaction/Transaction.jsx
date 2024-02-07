import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { getMyWithdrawelHisoty } from "../../../API/DoctorApi";
import noData from "../../../assets/images/noData.png";
import NoDataImage from "../../../components/NoDataImage";

export default function DocTransaction() {
  const [data, setdata] = useState([]);
  const [document, setDocument] = useState();
  const [showNoDAta, setShowNoCategories] = useState(false);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    getHistory();
    const delay = setTimeout(() => {
      setShowNoCategories(true);
    }, 2000);
  }, []);

  function getHistory() {
    getMyWithdrawelHisoty()
      .then((data) => {
        setDocument(data.data.data?.total_document);
        setdata(data?.data?.data?.withdrawals);
        setLoading(false);
      })
      .catch((err) => console.log(err));
    setLoading(false);
  }
  const handlePageChange = (selectedPage) => {
    getMyWithdrawelHisoty(selectedPage.selected + 1)
      .then((data) => {
        setdata(data?.data?.data?.withdrawals);
      })
      .then((err) => console.log(err));
  };
  var page = Math.floor(document / 10);
  var remainder = document % 10;
  page = page + (remainder > 0 ? 1 : 0);
  return (
    <div className="container">
      <h1 className="font-bold mt-3 text-lg">Transaction History</h1>
      <p className="text-gray-500 text-xs mt-3">
        All history of your transactions
      </p>
      <div className="overflow-x-auto ">
        {isLoading ? (
          <div>loding....</div>
        ) : data && data.length > 0 ? (
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
              {data.map((data) => {
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
                      <p
                        className={`text-xs p-1 pl-3 pr-3 ml-0.5 mt-1 rounded ${
                          data?.is_accepted == true
                            ? "text-green-400"
                            : "text-red-300"
                        }  outline-none focus:outline-none  mb-1 ease-linear transition-all duration-150`}
                      >
                        {data?.is_accepted == true ? "Success" : "Pending"}
                      </p>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          showNoDAta && (
            <div className="mt-10 flex justify-center w-full">
              <NoDataImage text={"No Data Available"} />
            </div>
          )
        )}
      </div>

      {/*  */}

      {page > 1 && (
        <div className="mt-5">
          <ReactPaginate
            pageCount={page} // Replace with the total number of pages
            pageRangeDisplayed={3} // Number of pages to display in the pagination bar
            marginPagesDisplayed={1} // Number of pages to display for margin pages
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            activeClassName={"active"}
          />
        </div>
      )}
    </div>
  );
}
