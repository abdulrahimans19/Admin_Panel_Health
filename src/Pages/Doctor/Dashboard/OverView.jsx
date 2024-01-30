import React, { useEffect, useState } from "react";
import clock from "../../../assets/images/Vector (1).png";
import date from "../../../assets/images/date(1).png";
import dollar from "../../../assets/images/dollar.png";
import arrowDown from "../../../assets/images/arrowDown.png";
import { Card } from "@material-tailwind/react";
import propic from "../../../assets/images/Ellipse.png";
import rightArrow from "../../../assets/images/rightArrow.png";
import WithdrawModal from "./modal/WithdrawModal";
import SlotModal from "./modal/SlotModal";

export default function OverView() {
  const [showModal, setShowModal] = useState(false);
  const [showSlot, setShowSlot] = useState(false);

  const isShowModal = () => {
    setShowModal(!showModal);
  };
  const isSlotModal = () => {
    setShowSlot(!showSlot);
  };
  return (
    <div className="container ">
      <div className="flex justify-between p-1">
        <div>
          <h1 className="text-xl font-bold">Welcome ,Dr Stephan strange</h1>
          <p className="text-sm mt-5">Have a nice a day at great work</p>
        </div>
        <div>
          <button
            onClick={() => setShowSlot(true)}
            className="mt-5 flex justify-center items-center mr-4 p-2 rounded-full border border-gray-400"
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
        <div className="flex items-center mb-3">
          <h2 className=" fond-bold mr-5">All time</h2>
          <img className="w-3 h-2" src={arrowDown} alt="" />
        </div>
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
              <h3 className="text-white mt-10  font-bold">456</h3>
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
              <h3 className="text-white mt-10  font-bold">AED 14000</h3>
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
              <h3 className="text-white mt-10  font-bold">AED 14000</h3>
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
        <div className="fond-bold">
          <h1>Today Appointments</h1>
        </div>
        <button className="flex items-center ">
          <p className="fond-bold text-sm">View all</p>
          <img
            src={rightArrow}
            className="w-1.5 h-2.5 ml-2 filter invert"
            alt=""
          />
        </button>
      </div>
      {/* AppointmentTable Start */}
      <div className="border-b border-gray-300 mt-2 flex justify-between p-3 pl-5 pr-5">
        <div className="flex items-center">
          <div
            className=" rounded-full bg-black mr-3"
            style={{ width: "60px", height: "60px" }}
          >
            <img
              style={{ width: "60px", height: "60px" }}
              className="rounded-full"
              src={propic}
              alt=""
            />
          </div>
          <div>
            <h1 className="fond-bold mb-2.5">Emerson Torff</h1>
            <p className="text-xs">Duration: 30 min</p>
          </div>
        </div>
        <button
          style={{ backgroundColor: "rgba(51, 112, 91, 1)", width: "70px" }}
          className=" h-8 text-white text-center rounded-lg flex justify-center items-center mr-3"
        >
          <p>join</p>
        </button>
      </div>
      {/* next card */}
      <div className="border-b border-gray-300 mt-2 flex items-center justify-between p-3 pl-5 pr-5">
        <div className="flex items-center">
          <div
            className=" rounded-full bg-black mr-3"
            style={{ width: "60px", height: "60px" }}
          >
            <img
              style={{ width: "60px", height: "60px" }}
              className="rounded-full"
              src={propic}
              alt=""
            />
          </div>
          <div>
            <h1 className="fond-bold mb-2.5">Emerson Torff</h1>
            <p className="text-xs">Duration: 30 min</p>
          </div>
        </div>
        <div style={{ color: "rgba(51, 112, 91, 1)" }}>
          <p className="text-xs">Start at 9:00 AM</p>
        </div>
      </div>
      {/* next card */}
      <div className="border-b border-gray-300 mt-2 flex items-center justify-between p-3 pl-5 pr-5">
        <div className="flex items-center">
          <div
            className=" rounded-full bg-black mr-3"
            style={{ width: "60px", height: "60px" }}
          >
            <img
              style={{ width: "60px", height: "60px" }}
              className="rounded-full"
              src={propic}
              alt=""
            />
          </div>
          <div>
            <h1 className="fond-bold mb-2.5">Emerson Torff</h1>
            <p className="text-xs">Duration: 30 min</p>
          </div>
        </div>
        <div style={{ color: "rgba(51, 112, 91, 1)" }}>
          <p className="text-xs">Start at 9:00 AM</p>
        </div>
      </div>
      {/* next card */}
      <div className="border-b border-gray-300 mt-2 flex items-center justify-between p-3 pl-5 pr-5">
        <div className="flex items-center">
          <div
            className=" rounded-full bg-black mr-3"
            style={{ width: "60px", height: "60px" }}
          >
            <img
              style={{ width: "60px", height: "60px" }}
              className="rounded-full"
              src={propic}
              alt=""
            />
          </div>
          <div>
            <h1 className="fond-bold mb-2.5">Emerson Torff</h1>
            <p className="text-xs">Duration: 30 min</p>
          </div>
        </div>
        <div style={{ color: "rgba(51, 112, 91, 1)" }}>
          <p className="text-xs">Start at 9:00 AM</p>
        </div>
      </div>
      {/* next card */}
      <div className="border-b border-gray-300 mt-2 flex items-center justify-between p-3 pl-5 pr-5">
        <div className="flex items-center">
          <div
            className=" rounded-full bg-black mr-3"
            style={{ width: "60px", height: "60px" }}
          >
            <img
              style={{ width: "60px", height: "60px" }}
              className="rounded-full"
              src={propic}
              alt=""
            />
          </div>
          <div>
            <h1 className="fond-bold mb-2.5">Emerson Torff</h1>
            <p className="text-xs">Duration: 30 min</p>
          </div>
        </div>
        <div style={{ color: "rgba(51, 112, 91, 1)" }}>
          <p className="text-xs">Start at 9:00 AM</p>
        </div>
      </div>
      {/* TableEnd */}
      <SlotModal isSlotModal={isSlotModal} showSlot={showSlot} />
      <WithdrawModal isShowModal={isShowModal} showModal={showModal} />
    </div>
  );
}
