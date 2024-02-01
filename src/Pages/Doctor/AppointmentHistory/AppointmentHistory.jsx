import React, { useEffect, useState } from "react";
import ViewPatient from "../Dashboard/modal/ViewPatient";
import { getAllApointment } from "../../../API/DoctorApi";
import ReactPaginate from "react-paginate";

export default function AppointmentHistory() {
  const [showModal, setShowModal] = useState(false);
  const [data, setData] = useState([]);
  const [document, setDocument] = useState([]);
  const [patient, setpatient] = useState();
  const [age, setAge] = useState();
  const [duration, setDuration] = useState();
  const [passingdate, setPassingDate] = useState();

  useEffect(() => {
    getApointmentHistory();
  }, []);
  function calculateDuration(startTimeStr, endTimeStr) {
    // Assuming the time format is 'h:mmam/pm'
    // Convert time strings to Date objects
    const startTimeParts = startTimeStr.match(/(\d+):(\d+)([ap]m)/);
    const endTimeParts = endTimeStr.match(/(\d+):(\d+)([ap]m)/);

    if (!startTimeParts || !endTimeParts) {
      return "Invalid time format";
    }
    console.log(patient);
    const startHour = parseInt(startTimeParts[1]);
    const startMinute = parseInt(startTimeParts[2]);
    const startAMPM = startTimeParts[3];
    const endHour = parseInt(endTimeParts[1]);
    const endMinute = parseInt(endTimeParts[2]);
    const endAMPM = endTimeParts[3];

    // Convert to 24-hour format
    const startHour24 = startAMPM === "pm" ? startHour + 12 : startHour;
    const endHour24 = endAMPM === "pm" ? endHour + 12 : endHour;

    const startDate = new Date();
    startDate.setHours(startHour24, startMinute, 0, 0);
    const endDate = new Date();
    endDate.setHours(endHour24, endMinute, 0, 0);

    // Calculate the time difference in milliseconds
    const timeDifferenceMs = endDate - startDate;

    // Calculate hours and minutes
    const hours = Math.floor(timeDifferenceMs / (1000 * 60 * 60));
    const minutes = Math.floor(
      (timeDifferenceMs % (1000 * 60 * 60)) / (1000 * 60)
    );

    // Format the duration
    let duration = "";
    if (hours > 0) {
      duration += `${hours} hour${hours > 1 ? "s" : ""}`;
    }
    if (minutes > 0) {
      if (duration) {
        duration += " ";
      }
      duration += `${minutes} minute${minutes > 1 ? "s" : ""}`;
    }

    return duration.trim();
  }
  function calculateAge(dateOfBirth) {
    const birthDate = new Date(dateOfBirth);
    const currentDate = new Date();

    // Calculate the age based on the year difference
    let age = currentDate.getFullYear() - birthDate.getFullYear();

    // Check if the birthday has occurred this year
    const currentMonth = currentDate.getMonth();
    const birthMonth = birthDate.getMonth();
    const currentDay = currentDate.getDate();
    const birthDay = birthDate.getDate();

    if (
      currentMonth < birthMonth ||
      (currentMonth === birthMonth && currentDay < birthDay)
    ) {
      // Subtract 1 from the age if the birthday hasn't occurred yet this year
      age--;
    }

    return age;
  }

  function getApointmentHistory() {
    getAllApointment(1).then((data) => {
      setData(data?.data?.data?.appointments);

      setDocument(data?.data?.data?.total_document);
    });
  }
  function setDatas(duration, age, data, date) {
    console.log(data, "setdatas  ");
    setDuration(duration);
    setAge(age);
    setpatient(data);
    setPassingDate(date);
    setShowModal(true);
  }

  const handlePageChange = (selectedPage) => {
    getAllApointment(selectedPage).then((data) => {
      setData(data?.data?.data?.appointments);
    });
  };
  var page = Math.floor(document / 10);
  var remainder = document % 10;
  page = page + (remainder > 0 ? 1 : 0);

  return (
    <div>
      <div className="container">
        <div className="pb-3">
          <h1 className="text-xl font-extrabold">Appointment History</h1>
          <p className="text-sm text-gray-400 mt-4">
            These are the all patient you’ve got
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 mb-4 mt-10">
          {/* card */}
          {data &&
            data[0] &&
            data.map((data) => {
              const age = calculateAge(data?.patientId?.date_of_birth);

              const date = new Date(data?.created_at);

              const year = date.getFullYear(); // 2024
              const month = date.getMonth() + 1; // Months are zero-based, so you need to add 1
              const day = date.getDate();
              const duration = calculateDuration(
                data?.slotId?.start_time,
                data?.slotId?.end_time
              );
              const formattedDate = `${year}-${month
                .toString()
                .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
              return (
                <div className="p-3 border  border-blue-300 border-thin rounded-lg">
                  <div className=" w-[60px] h-[60px] rounded-full border border-blue-300 border-thin">
                    <img
                      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      className="w-[60px] h-[60px] rounded-full"
                      alt=""
                    />
                  </div>

                  <div className="ml-3 mt-2">
                    <h1 className=" font-bold">
                      {data?.patientId?.first_name}
                    </h1>
                    <p className="text-gray-400 text-xs mt-3">
                      Duration :{duration}
                    </p>
                  </div>
                  <div className="form pt-5">
                    <div className="flex items-center justify-between pt-3">
                      <p className="text-gray-400 text-sm">Date & Hour</p>
                      <p className="text-sm ml-1">{`${month} ${day}, ${year} ${data?.slotId?.start_time}`}</p>
                    </div>
                    <div className="flex items-center justify-between pt-3">
                      <p className="text-gray-400 text-sm">Age</p>
                      <p className="text-sm">{age}</p>
                    </div>
                    <div className="flex items-center justify-between pt-3">
                      <p className="text-gray-400 text-sm">Gender</p>
                      <p className="text-sm">{data?.patientId?.gender}</p>
                    </div>
                    <div className="flex items-center justify-between pt-3">
                      <p className="text-gray-400 text-sm">Fees</p>
                      <p className="text-sm">{data?.total_price} AED</p>
                    </div>
                  </div>

                  <div className="">
                    <button
                      onClick={() =>
                        setDatas(duration, age, data, formattedDate)
                      }
                      className="w-full bg-green-600 text-white p-3 rounded-lg mt-6"
                    >
                      View detail patient
                    </button>
                  </div>
                </div>
              );
            })}

          {/* card */}
        </div>
        <ViewPatient
          setShowModal={setShowModal}
          data={patient}
          ShowModal={showModal}
          age={age}
          duration={duration}
          date={passingdate}
        />
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
