import React from "react";
import { motion } from "framer-motion";
import download from "../../../../assets/images/downloaded.png";
import pdf from "../../../../assets/images/Group (2).png";

function ViewPatient({ ShowModal, setShowModal, data, age, duration, date }) {
  const animationVariants = {
    hidden: { x: 100, opacity: 0 },
    visible: { x: 0, opacity: 1 },
  };
  console.log(data);

  const downloadFile = (filePath, fileName = "Example.jpg") => {
    fetch(filePath)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(new Blob([blob]));

        const link = document.createElement("a");
        link.href = url;
        link.download = fileName;

        document.body.appendChild(link);

        link.click();

        link.parentNode.removeChild(link);
      })
      .catch((error) => {
        console.error("Failed to download the file:", error);
      });
  };

  const animationTransition = {
    damping: 10,
    stiffness: 100,
  };
  return (
    <div>
      <div>
        {ShowModal ? (
          <div>
            <div className=" overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="container  ml-10 right-0 bg-black">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={animationVariants}
                  transition={animationTransition}
                  style={{
                    width: "400px",
                    height: "98%", // Center vertically
                    right: "0%",
                    top: "1%",
                    position: "fixed", // Center horizontally
                    transform: "translate(-50%, -50%)", // Center both horizontally and vertically

                    borderRadius: "8px",
                  }}
                  className="mt-0  w-auto my-6 mx-auto max-w-3xl  flex justify-center "
                >
                  {/*content*/}

                  <div className="p-3  shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/* Head */}
                    <div className="flex  border-b-2 border-black pb-5">
                      <div>
                        <h1 className="fond-extrabold text-xl">
                          Patient Details
                        </h1>
                      </div>
                      <div>
                        <button
                          onClick={() => setShowModal(false)}
                          className="absolute right-3"
                        >
                          x
                        </button>
                      </div>
                    </div>
                    <p className="mt-3 text-sm">PATIENT INFORMATION</p>
                    <div className="container p-3 mt-4">
                      <div className="flex items-center ">
                        <div className="border boder-black w-[90px] h-[90px] rounded-full mr-4">
                          <img
                            src={
                              data?.patientId.profile_image
                                ? data?.patientId.profile_image
                                : "https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                            }
                            className="w-[90px] h-[90px] rounded-full"
                            alt=""
                          />
                        </div>
                        <div>
                          <h1 className="fond-extrabold text-lg ">
                            {data?.patientId?.first_name}
                          </h1>
                          <p className="mt-3 text-gray-400 text-sm">
                            Booking ID :{data._id}
                          </p>
                        </div>
                      </div>
                      <div className="mt-5 ml-3">
                        <p className="text-sm fond-bold text-gray-400 mt-4">
                          Date & Hour
                        </p>
                        <p className="text-sm fond-bold mt-2 ">
                          {date} . {data?.slotId?.start_time}
                        </p>
                        <p className="text-sm fond-bold text-gray-400 mt-5">
                          Duration
                        </p>
                        <p className="text-sm fond-bold mt-3 ">{duration}</p>
                        <p className="text-sm fond-bold text-gray-400 mt-5">
                          Age
                        </p>
                        <p className="text-sm fond-bold mt-2 ">{age}</p>
                        <p className="text-sm fond-bold text-gray-400 mt-5">
                          Gender
                        </p>
                        <p className="text-sm fond-bold mt-2 ">
                          {data?.patientId?.gender}
                        </p>
                        <p className="text-sm fond-bold text-gray-400 mt-5">
                          Problom
                        </p>
                        <p className="text-sm fond-bold mt-2">
                          {data?.description}
                        </p>
                      </div>
                      <div className="flex justify-between items-center border border-gray-300 border-thin p-2 mt-10 rounded-lg">
                        <div className="flex items-center">
                          <img
                            src={pdf}
                            className=" w-5 h-5 boder boder-gray-300"
                          />

                          <p className="text-black text-xs ml-3">
                            download prescription
                          </p>
                        </div>
                        <button
                          onClick={() =>
                            downloadFile(
                              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAY0GcwNBL7sai0QNDz43SxPA1v8tLmkvLealZoQoNupZtWB17",
                              `${data?.patientId?.first_name}_prescription.jpg`
                            )
                          }
                        >
                          <img src={download} className="w-5 h-4.5" alt="" />
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

export default ViewPatient;
