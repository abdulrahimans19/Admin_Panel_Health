import React, { useEffect, useState } from "react";
import { getCurrentAppoinmentsApi } from "../../API/ApiCall";

export default function AppointmentTable() {
  const [totalPagecount, setTotalPagecount] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [appoinments, setAppoinments] = useState([]);
  
  useEffect(() => {
    getTodayAppoinments();
    console.log("appoinmnens",appoinments);
  }, []);
  const getTodayAppoinments = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    getCurrentAppoinmentsApi(year, month, day).then((data) => {
  
      console.log(data.data.data.total_count);
      const totalPages = Math.ceil(data.data.data.total_count / 10);
      setTotalPagecount(totalPages);
      setAppoinments(data.data.data.bookings);
    });
  };
  return (
    <div>
      <table class="table-auto w-full mt-5 rounded  border-separate border-spacing-y-3">
        <thead class="text-left rounded-lg bg-gray-100 text-gray-500 tracking-wider">
          <tr>
            <th class="p-1">Name</th>
            <th class="p-3">ID</th>
            <th class="p-1">Test Name</th>
          </tr>
        </thead>
        <tbody class="">
          {appoinments[0] && appoinments.map((data)=>{
            return (
              <tr class="bg-card rounded text-black border outline outline-offset-2 outline-1 outline-gray-300  ">
            <td class="p-1">{data.profile_id.first_name}</td>
           
            <td class="p-3">{data.profile_id.user_id}</td>
            <td class="p-1">{data.test_id.name}</td>
          </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  );
}
