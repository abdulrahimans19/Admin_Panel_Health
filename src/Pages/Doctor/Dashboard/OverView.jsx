import React, { useEffect, useState } from "react";
import clock from "../../../assets/images/Vector (1).png";
import date from "../../../assets/images/date(1).png";
import dollar from "../../../assets/images/dollar.png";
import noDAta from "../../../assets/images/noData.png";
import { Card } from "@material-tailwind/react";
import downArrow from "../../../assets/images/arrowDown.png";
import rightArrow from "../../../assets/images/rightArrow.png";
import WithdrawModal from "./modal/WithdrawModal";
import SlotModal from "./modal/SlotModal";
import {
  getApointments,
  getAvailableSlot,
  getDoctorProfileAndWallet,
  getTodayApointments,
} from "../../../API/ApiCall";
import ReactPaginate from "react-paginate";

export default function OverView() {
  const [showModal, setShowModal] = useState(false);
  const [showSlot, setShowSlot] = useState(false);
  const [Profile, setProfile] = useState();
  const [totalApointments, setTotalApointment] = useState();
  const [availableSlots, setAvailableslots] = useState([]);
  const [todayApintments, setApointments] = useState([]);
  const [currentime, setCurrenTime] = useState();
  const [document, setDocument] = useState();

  useEffect(() => {
    getDoctor();
    getToatalApointments();
    getAvalabeSlots();
    getTodayApointment();
    setInterval(time, 60000);
    // setInterval(sameTime, 60000);
  }, []);

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

  function getDoctor() {
    getDoctorProfileAndWallet()
      .then((data) => {
        setProfile(data?.data?.data);
      })
      .catch((err) => console.log(err));
  }
  function getToatalApointments() {
    getApointments()
      .then((data) => {
        setTotalApointment(data?.data?.data);
      })
      .then((err) => console.log(err));
  }
  function getTodayApointment() {
    getTodayApointments()
      .then((data) => {
        setApointments(data?.data?.data?.appointments);
        setDocument(data?.data?.data?.total_document);
      })
      .then((err) => console.log(err));
  }
  function getAvalabeSlots() {
    getAvailableSlot()
      .then((data) => {
        setAvailableslots(data.data.data);
      })
      .catch((err) => console.log(err));
  }
  const isShowModal = () => {
    setShowModal(!showModal);
  };
  const isSlotModal = () => {
    setShowSlot(!showSlot);
  };
  const handlePageChange = (selectedPage) => {
    getTodayApointments(selectedPage.selected + 1)
      .then((data) => {
        setApointments(data?.data?.data?.appointments);
      })
      .then((err) => console.log(err));
  };
  var page = Math.floor(document / 10);
  var remainder = document % 10;
  page = page + (remainder > 0 ? 1 : 0);
  return (
    <div className="container ">
      <div className="flex justify-between p-1">
        <div>
          <h1 className="text-xl font-bold">
            Welcome , {Profile && Profile?.name}
          </h1>
          <p className="text-sm mt-5">Have a nice a day at great work</p>
        </div>
        <div>
          <button
            onClick={() => setShowSlot(true)}
            className="mt-5 flex justify-center items-center  p-2 rounded-full border border-gray-400"
          >
            <img className="h-5 w-5 mr-1" src={clock} alt="" />
            <span>Add available slot</span>
          </button>
        </div>
      </div>
      {/* Card */}
      <div className="mt-7">
        {/* <select className="outline-none  mt-7 mb-3">
          <option value="someOption" selected>
            All time
          </option>
          <option value="otherOption">Other option</option>
        </select> */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          <Card
            className=" p-5"
            style={{
              backgroundColor: "rgba(122, 110, 254, 1)",
            }}
          >
            <div className="flex justify-between">
              <div className="h-8 w-8 bg-white rounded-full flex justify-center items-center p-2">
                <img src={date} alt="" />
              </div>
              <p className="text-white">+8.12%</p>
            </div>
            <div>
              <h3 className="text-white mt-10  font-bold">
                {totalApointments?.totalAppointments}
              </h3>
              <h1 className="text-white mt-6">Total Appointments</h1>
            </div>
          </Card>

          <Card
            className=" p-5"
            style={{
              backgroundColor: "rgba(31, 138, 247, 1)",
            }}
          >
            <div className="flex justify-between">
              <div className="h-8 w-8 bg-white rounded-full flex justify-center items-center p-2">
                <img src={dollar} alt="" />
              </div>
              <p className="text-white">+8.12%</p>
            </div>
            <div>
              <h3 className="text-white mt-10  font-bold">
                AED {totalApointments?.totalIncome}
              </h3>
              <h1 className="text-white mt-6">Total Income</h1>
            </div>
          </Card>

          <Card
            className=" p-5"
            style={{
              backgroundColor: "rgba(250, 177, 36, 1)",
            }}
          >
            <div className="flex justify-between">
              <div className="h-8 w-8 bg-white rounded-full flex justify-center items-center p-2">
                <img src={dollar} alt="" />
              </div>
              <p className="text-white">+8.12%</p>
            </div>
            <div>
              <h3 className="text-white mt-10  font-bold">
                AED {Profile?.wallet}
              </h3>
              <button
                className="flex mt-6 items-center"
                onClick={() => setShowModal(true)}
              >
                <h1 className="text-white  mr-5">Withdraw Cash</h1>
                <img src={rightArrow} className="w-2 h-3" alt="" />
              </button>
            </div>
          </Card>
        </div>
      </div>
      {/* card end */}
      {/* Appointment */}
      <div className="flex justify-between items-center mr-5 p-4 mt-4">
        <div>
          <h1 className="fond-bold">Today Appointments</h1>
        </div>
      </div>
      {/* AppointmentTable Start */}
      {todayApintments && todayApintments[0] ? (
        todayApintments.map((data) => {
          const formattedTime1 = convertTo24HourFormat(currentime);

          const formattedTime2 = convertTo24HourFormat(
            data?.slotId?.start_time
          );

          return (
            <div className="border-b border-gray-300 mt-2 flex justify-between p-1 justify-center items-center pl-5 pr-5">
              <div className="flex items-center justify-center">
                <div
                  className=" rounded-full mr-3"
                  style={{ width: "60px", height: "60px" }}
                >
                  <img
                    style={{ width: "60px", height: "60px" }}
                    className="rounded-full"
                    src={
                      data?.patientId?.profile_image
                        ? data?.patientId?.profile_image
                        : "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    }
                    alt=""
                  />
                </div>
                <div>
                  <h1 className="fond-bold mb-2.5">
                    {data?.patientId?.first_name}
                  </h1>
                  <p className="text-xs text-gray-400">Duration: 30 min</p>
                </div>
              </div>
              {formattedTime1 &&
              formattedTime2 &&
              formattedTime1 === formattedTime2 ? (
                <button
                  style={{
                    backgroundColor: "rgba(51, 112, 91, 1)",
                    width: "70px",
                  }}
                  className=" h-8 text-white text-center rounded-lg flex justify-center items-center mr-3"
                >
                  <p>join</p>
                </button>
              ) : (
                <p>{data?.slotId?.start_time}</p>
              )}
            </div>
          );
        })
      ) : (
        <div className="">
          <div className="flex justify-center items-center text-red-300 text-lg fond-bold mt-10">
            <img src={noDAta} alt="" className="w-[50px]" />
          </div>
          <div className="flex justify-center items-center text-red-300 text-lg fond-bold ">
            <h1>No data found!</h1>
          </div>
        </div>
      )}
      {/* next card */}
      {/* TableEnd */}
      <SlotModal
        isSlotModal={isSlotModal}
        showSlot={showSlot}
        slots={availableSlots}
      />
      <WithdrawModal
        isShowModal={isShowModal}
        showModal={showModal}
        profile={Profile}
      />{" "}
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
