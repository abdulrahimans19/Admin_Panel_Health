import React, { useEffect, useState } from "react";
import downArrow from "../../../assets/images/arrowDown.png";
import calender from "../../../assets/images/solar_calendar-outline.png";
import { getTodayApointments } from "../../../API/ApiCall";
import { getApointmentByDate } from "../../../API/DoctorApi";
import ReactDatePicker from "react-datepicker";
import { motion, useAnimationControls } from "framer-motion";

import "react-datepicker/dist/react-datepicker.css";

import ViewPatient from "../Dashboard/modal/ViewPatient";
import VideoModal from "../Dashboard/modal/VideoModal";
import ReactPaginate from "react-paginate";

export default function Appointments() {
  const [currentime, setCurrenTime] = useState();
  const [todayApintments, setApointments] = useState([]);
  const [openCalender, setOpenCalender] = useState(null);
  const [day, setDay] = useState();
  const [date, setDate] = useState(null);
  const [showModal, setShowMadal] = useState(false);
  const [getDate, setGetDAte] = useState();
  const [document, setDocument] = useState();
  const [formatedDate, setFormatedDate] = useState();

  useEffect(() => {
    getTodayApointment();
    setInterval(time, 60000);
  }, []);
  const list = {
    visible: { opacity: 50, scale: 1 },
    hidden: { opacity: 0, scale: 0 },
  };
  function convertTo24HourFormat(timeString) {
    const match = timeString?.match(/(\d+):(\d+)\s?([ap]m)/i);

    if (match) {
      let hour = parseInt(match[1], 10);
      const minute = parseInt(match[2], 10);
      const ampm = match[3].toLowerCase();

      if (ampm === "pm" && hour !== 12) {
        hour += 12;
      } else if (ampm === "am" && hour === 12) {
        hour = 0;
      }

      return `${hour}:${minute}`;
    }

    return null; // Invalid time format
  }

  function time() {
    var d = new Date();
    var minutes = d.getMinutes();
    var hours = d.getHours();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    // setHour(hours);
    // setminut(minutes);
    // setIsPm(ampm.toLocaleLowerCase());
    setCurrenTime(strTime);
  }

  function getTodayApointment() {
    getTodayApointments(1).then((data) => {
      setApointments(data?.data?.data?.appointments);
      setDocument(data?.data?.data?.total_document);
    });
  }
  function handleDateSelect(date) {
    setDate(date);
    //setOpenCalendar(false);

    const formattedDate = `${
      date.getMonth() + 1
    }/${date.getDate()}/${date.getFullYear()}`;

    getApointmentByDate(formattedDate).then((data) => {
      setGetDAte(formattedDate);
      setDay("");
      setDate("");
      setApointments(data?.data?.data?.appointments);
    });
    setOpenCalender(false);
  }
  function selectedDate(stringdate) {
    setDay(stringdate);
    // Prevent the default form submission behavior

    const date = stringdate;
    const currentDate = new Date();
    let targetDate;

    if (date === "Tomorrow") {
      targetDate = new Date(currentDate);
      targetDate.setDate(currentDate.getDate() + 1);
    } else if (date === "Yesterday") {
      targetDate = new Date(currentDate);
      targetDate.setDate(currentDate.getDate() - 1);
    } else {
      targetDate = currentDate;
    }

    const formattedDate = `${
      targetDate.getMonth() + 1
    }/${targetDate.getDate()}/${targetDate.getFullYear()}`;
    setFormatedDate(formatedDate);
    getApointmentByDate(formattedDate).then((data) => {
      console.log("is it page");

      setApointments(data?.data?.data?.appointments);
    });
  }
  const isSlectedDate = () => {
    setOpenCalender(!openCalender);
  };

  const handlePageChange = (selectedPage) => {
    if (formatedDate) {
      getApointmentByDate(formatedDate, selectedPage).then((data) => {
        setApointments(data?.data?.data?.appointments);
        setDocument(data?.data?.data?.total_document);
      });
    }
    // getAllApointment(selectedPage).then((data) => {
    //   setData(data?.data?.data?.appointments);
    // });
  };
  var page = Math.floor(document / 10);
  var remainder = document % 10;
  page = page + (remainder > 0 ? 1 : 0);

  return (
    <div>
      <div className="container p-3">
        <div className="flex justify-between">
          <div>
            <h1 className="text-xl font-extrabold mb-3">
              See what you got here!!
            </h1>
            <p className="text-gray-500 text-sm">
              There are new appointments awaits you
            </p>
          </div>
          <div className="flex justify-center items-center ">
            <select
              className="border border-blue-300 border-thin 
            p-1 pt-3 pb-3 rounded-full flex  justify-center items-center outline-none "
              onChange={(e) => selectedDate(e.target.value)}
            >
              <option value="Today">Today</option>
              <option value="Tomorrow">Tomorrow</option>
              <option value="Yesterday">Yesterday</option>
            </select>
            <div>
              <div
                onClick={() => isSlectedDate()}
                className="ml-3 p-2 h-[50px] w-[50px] justify-center items-center flex rounded-full border border-blue-300 border-thin "
              >
                <img src={calender} className="" alt="" />
              </div>
              {openCalender && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={list}
                  className="z-50 fixed my-4 absolute mt-1 mr-10 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
                  id="dropdown-user"
                >
                  <ReactDatePicker
                    className="bg-gray-300 outline-none w-[100px]"
                    selected={date}
                    onChange={handleDateSelect}
                    dateFormat="dd/MM/yyyy" // Define your desired date format
                  />
                </motion.div>
              )}
            </div>
          </div>
        </div>
        <div></div>
        {/* {Head} */}
        <div>
          <h1 className="text-xl text-blue-400 text-extrabold mt-10 mb-3">
            {day ? day : getDate ? getDate : "Today"}
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-5 mb-4 mt-6">
          {todayApintments &&
            todayApintments[0] &&
            todayApintments.map((data) => {
              const formattedTime1 = convertTo24HourFormat("10:00am");

              const formattedTime2 = convertTo24HourFormat(
                data?.slotId?.start_time
              );

              return (
                <div className="p-3 border  border-blue-300 border-thin rounded-lg">
                  <div className=" flex  items-center ">
                    <div className=" w-[100px] h-[100px] rounded-full border border-blue-300 border-thin">
                      <img
                        src={
                          data?.patientId?.profile_image
                            ? data?.patientId?.profile_image
                            : "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                        }
                        className="w-[100px] h-[100px] rounded-full"
                        alt=""
                      />
                    </div>
                    <div className="ml-3">
                      <h1 className=" font-bold">
                        {data?.patientId?.first_name}
                      </h1>
                      <p className="text-gray-400 text-xs mt-4">
                        Duration: 30 min
                      </p>
                    </div>
                  </div>
                  <div className="text-center text-sm text-gray-400 mt-5">
                    <p>Problem: {data?.description}</p>
                  </div>
                  <div className="p-3">
                    <button
                      onClick={() => setShowMadal(true)}
                      className={`${
                        formattedTime1 === formattedTime2
                          ? "bg-green-900"
                          : "bg-green-200"
                      } w-full  text-white p-3 rounded-lg mt-6`}
                    >
                      join now
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
        {/* <VideoModal showModal={showModal} setShowMadal={setShowMadal} /> */}
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
