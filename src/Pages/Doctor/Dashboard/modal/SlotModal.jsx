import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import noData from "../../../../assets/images/noData.png";
import "./Slotmodal.css";
import { addAvailableSlot } from "../../../../API/ApiCall";

function SlotModal({ isSlotModal, showSlot, slots, docData, getAvalabeSlots }) {
  const [id, setId] = useState([]);
  const [savedSlots, setSavedSlots] = useState([]);
  useEffect(() => {
    setSavedSlots(docData?.availability);
    console.log("saved slots", savedSlots);
    if (showSlot && slots && slots.length > 0) {
      const initialSelectedSlots = docData?.availability.filter((slotId) => {
        slots.some((slot) => slot._id == slotId);
      });
      // setSavedSlots(initialSelectedSlots);
    }
  }, [showSlot, slots, docData?.availability]);
  const handleSubmit = () => {
    // const availability = [...id];
    // setSavedSlots((prevSelectedSlots)=>{
    //   prevSelectedSlots.includes(slotId)
    //   ? prevSelectedSlots.filter((id)=>id !==slotId)
    //   :[...prevSelectedSlots,slotId]
    // })
    const wholeData = {
      availability: savedSlots,
    };
    console.log(savedSlots, "saved");
    console.log("doc data", docData.availability);
    addAvailableSlot(wholeData)
      .then((data) => {
        console.log("this is working");
        getAvalabeSlots();
        isSlotModal();
      })
      .catch((err) => {
        console.log(err);
        isSlotModal();
      });
    setId([""]);
  };
  const animationVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { y: -150, opacity: 1 },
  };

  const animationTransition = {
    type: "spring",
    damping: 10,
    stiffness: 100,
  };
  const handleSelect = (slotId) => {
    console.log(slotId, "selected id printing");
    setSavedSlots((prevSelectedSlots) => {
      if (prevSelectedSlots?.includes(slotId)) {
        // Remove the slotId from selectedSlots
        return prevSelectedSlots?.filter((id) => id !== slotId);
      } else {
        // Add the slotId to selectedSlots
        return [...prevSelectedSlots, slotId];
      }
    });
    // if (id.includes(Id)) {
    //   setId(id.filter((id) => id !== Id)); // Corrected this line
    // } else {
    //   setId([...id, Id]);
    // }
  };

  return (
    <div>
      <div>
        {showSlot ? (
          <div className="container ">
            <div className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="container flex justify-center">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={animationVariants}
                  transition={animationTransition}
                  style={{
                    position: "absolute",
                    bottom: 0,

                    transform: "translateX(-50%)",

                    padding: "20px",
                    borderRadius: "8px",
                  }}
                  className="relative w-auto my-6 mx-auto max-w-3xl  flex justify-center "
                >
                  {/*content*/}

                  <div className="p-3  shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none rounded-lg">
                    {/* Head */}
                    <div className="relative">
                      <button
                        onClick={() => isSlotModal()}
                        className="absolute right-3"
                      >
                        x
                      </button>
                    </div>
                    <div className="container p-10">
                      <div className="mb-5 ">
                        <h1 className="fond-extrabold">Slot available</h1>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-3 mb-5">
                        {/* <div
                            className="border border-gray-400 rounded-lg items-center flex justify-center "
                            style={{
                              backgroundColor: "rgba(193, 174, 151, 1)",
                            }}
                          >
                            <p className="p-2 text-white text-sm">09:20 PM </p>
                          </div> */}
                        {slots &&
                          slots[0] &&
                          slots.map((data) => {
                            const isSelected = savedSlots.includes(data._id);
                            return (
                              <div
                                onClick={() => handleSelect(data._id)}
                                key={data?._id}
                                className={`${
                                  isSelected ? "selected" : "bg-default-color"
                                } border border-gray-400 rounded-lg cursor-pointer items-center flex justify-center`}
                              >
                                <p key={data?._id} className="p-2 text-sm">
                                  {data?.start_time}
                                </p>
                              </div>
                            );
                          })}
                      </div>
                      {slots && slots.length == 0 ? (
                        <div className="">
                          <div className="flex justify-center items-center text-red-300 text-lg fond-bold mt-10">
                            <img src={noData} alt="" className="w-[50px]" />
                          </div>
                          <div className="flex justify-center items-center text-red-300 text-lg fond-bold ">
                            <h1>No Slots Available!</h1>
                          </div>
                        </div>
                      ) : (
                        ""
                      )}
                      <div className="relative mt-10 p-5">
                        <button
                          onClick={() => {
                            if (slots && slots.length == 0) {
                              isSlotModal();
                            }
                            handleSubmit();
                          }}
                          className="absolute right-3 rounded-lg h-10 w-[100px] text-white text-sm"
                          style={{ backgroundColor: "rgba(36, 168, 250, 1)" }}
                          type="submit"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default SlotModal;
