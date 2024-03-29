import React, { useEffect, useState } from "react";
import { getCurrentAppoinmentsApi } from "../../API/ApiCall";
import NoDataImage from "../NoDataImage";

export default function AppointmentTable() {
  const [totalPagecount, setTotalPagecount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [appoinments, setAppoinments] = useState([]);

  useEffect(() => {
    getTodayAppoinments();
  }, []);
  const getTodayAppoinments = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    getCurrentAppoinmentsApi(year, month, day).then((data) => {
      const totalPages = Math.ceil(data.data.data.total_count / 10);
      setTotalPagecount(totalPages);
      setAppoinments(data.data.data.bookings);
    });
  };
  return (
    <div>
      {appoinments && appoinments.length > 0 ? (
        <table class="table-auto w-full mt-5 rounded border-separate border-spacing-y-3">
          <thead class="text-left rounded-lg bg-gray-100 text-gray-500 tracking-wider">
            <tr>
              <th class="p-1">Name</th>
              <th class="p-3">ID</th>
              <th class="p-1">Test Name</th>
            </tr>
          </thead>
          <tbody class="">
            {appoinments.map((data) => (
              <tr class="bg-card rounded text-black border outline outline-offset-2 outline-1 outline-gray-300">
                <td class="p-1">
                  {data.profile_id?.first_name || "No Data Available"}
                </td>
                <td class="p-3">
                  {data.profile_id?.user_id || "No Data Available"}
                </td>
                <td class="p-1">{data.test_id?.name || "No Data Available"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div class="text-black mt-5 p-3 rounded bg-card border outline outline-offset-2 outline-1 outline-gray-300">
          No Data Available
        </div>
      )}
    </div>
  );
}
