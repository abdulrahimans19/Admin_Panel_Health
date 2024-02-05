import React from "react";
import { motion } from "framer-motion";
import download from "../../../../assets/images/downloaded.png";
import pdf from "../../../../assets/images/Group (2).png";
import { UploadImageUrl, uploadToAws } from "../../../../API/ApiCall";
import { addPrescription } from "../../../../API/DoctorApi";

function ViewPatient({
  getApointmentHistory,
  ShowModal,
  setShowModal,
  data,
  age,
  duration,
  date,
  prescription,
}) {
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

  const confirmPrescription = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const UserData = Object.fromEntries(form);
    console.log("swiugfbwsifvr", UserData.image);

    let wholeData
    const data_id=data?._id
    UploadImageUrl().then((data) => {
      wholeData = {
        appoinment_id: data_id,
        prescription_url: data.data.publicUrl,
      };
      console.log(wholeData,'psejfg0wsjg');
      uploadToAws(data.data.presignedUrl, UserData.image).then((data) => {
        console.log(data, "uploaded");

        addPrescription(wholeData).then((data) => {
          getApointmentHistory()
          setShowModal(false)
        });
      });
      console.log(data);
    });
console.log(wholeData,"hol;edata");

  };

  return (
    <div className="">
      <div>
        {ShowModal ? (
          <div>
            <div className=" overflow-x-hidden  overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="container  ml-10 right-0 bg-black">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={animationVariants}
                  transition={animationTransition}
                  style={{
                    // width: "400px",
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
                    <div className="flex  border-b-2 border-black pb-2">
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
                    <p className="mt-1 text-sm">PATIENT INFORMATION</p>
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
                            Booking ID : {data._id}
                          </p>
                        </div>
                      </div>
                      <div className="mt-5 ml-3">
                        <p className="text-sm fond-bold text-gray-400 mt-3">
                          Date & Hour
                        </p>
                        <p className="text-sm fond-bold mt-2 ">
                          {date} . {data?.slotId?.start_time}
                        </p>
                        <p className="text-sm fond-bold text-gray-400 mt-3">
                          Duration
                        </p>
                        <p className="text-sm fond-bold mt-3 ">{duration}</p>
                        <p className="text-sm fond-bold text-gray-400 mt-3">
                          Age
                        </p>
                        <p className="text-sm fond-bold mt-2 ">{age}</p>
                        <p className="text-sm fond-bold text-gray-400 mt-3">
                          Gender
                        </p>
                        <p className="text-sm fond-bold mt-2 ">
                          {data?.patientId?.gender}
                        </p>
                        <p className="text-sm fond-bold text-gray-400 mt-3">
                          Problom
                        </p>
                        <p className="text-sm fond-bold mt-2">
                          {data?.description}
                        </p>
                      </div>
                      {prescription && (
                        <form onSubmit={confirmPrescription} action="">
                          <div className="flex justify-center ">
                            <div>
                              <label
                                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                for="file_input"
                              >
                                Upload file
                              </label>

                              <input
                                name="image"
                                class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
                                id="file_input"
                                type="file"
                              />

                              
                              <button
                                class="bg-green-500 mt-2 text-white active:bg-green-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1  ease-linear transition-all duration-150"
                                type="submit"
                              >
                                upload
                              </button>
                            </div>
                          </div>
                        </form>
                      )}
                      {data.image ? (
                        <div className="flex justify-between items-center border border-gray-300 border-thin p-2 mt-5 rounded-lg">
                          <div className="flex items-center">
                            <img
                              src={pdf}
                              className=" w-5 h-5 boder boder-gray-300"
                            />

                            <p className="text-black text-xs ml-3">
                              download Image
                            </p>
                          </div>

                          <button
                            onClick={() =>
                              downloadFile(
                                data?.image,
                                `${data?.patientId?.first_name}.jpg`
                              )
                            }
                          >
                            <img src={download} className="w-5 h-4.5" alt="" />
                          </button>
                        </div>
                      ) : null}
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
