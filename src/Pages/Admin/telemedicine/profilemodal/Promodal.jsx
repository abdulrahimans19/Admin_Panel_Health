import { useState } from "react";
import proImg from "../../../../assets/images/boy.png";
import pdffileImg from "../../../../assets/images/bxs_file-pdf.png";
import download from "../../../../assets/images/downloadimg.png";
import { AprovetDoctor } from "../../../../API/ApiCall";

export default function ({
  status,
  showModal,
  toggleModal,
  callback,
  data,
  user,
  btImg,
  btText,
}) {
  const [showMoreText, setShowMoreText] = useState(false);

  const downloadImage = (imageUrl, fileName) => {
    // Create a link element
    const link = document.createElement("a");

    // Set the href attribute to the image URL
    link.href = imageUrl;

    // Set the download attribute to specify the file name
    link.download = fileName;

    // Append the link to the document
    document.body.appendChild(link);

    // Trigger a click event on the link to initiate the download
    link.click();

    // Remove the link from the document
    document.body.removeChild(link);
  };

  let hrtext = "i am so happy now you so happy the if you set";

  // Find the position of "i"

  // Extract text until the position of "i"
  const extractedText = user?.description.substring(0, 50);

  return (
    <div>
      {showModal ? (
        <div className="container">
          <div className="pr-3 pl-3 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl ">
              {/*content*/}

              <div className=" rounded-[15px] shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <button
                  className="absolute top-4 right-4 h-5 w-5 rounded-full bg-gray-200 flex items-center justify-center"
                  onClick={() => toggleModal()}
                >
                  <span className="text-black text-xs">X</span>
                </button>

                <div className=" flex ">
                  {/* leftDive */}
                  <div
                    className="p-4"
                    style={{
                      width: 150,
                    }}
                  >
                    <h1 className="mb-3">Profile</h1>
                    <div className="rounded-lg">
                      <img src={proImg} alt="" className="w-20 h-30 mb-2 p-2" />
                    </div>
                  </div>
                  {/* rightDiv */}
                  <div
                    className="p-3 pt-5  rounded-lg"
                    style={{
                      width: "300px",
                    }}
                  >
                    <div className="heding flex flex-col pt-5 pr-3">
                      <table>
                        <tr>
                          <td className="text-xs text-gray-400 w-20">Name :</td>
                          <td className="text-xs "> {user?.name}</td>
                        </tr>
                        <tr>
                          <td className="text-xs text-gray-400 w-20">
                            Gender :
                          </td>
                          <td className="text-xs "> {user?.gender}</td>
                        </tr>
                        <tr>
                          <td className="text-xs text-gray-400 w-20">Mail :</td>
                          <td className="text-xs "> {user?.email}</td>
                        </tr>
                        <tr>
                          <td className="text-xs text-gray-400 w-20">
                            Category :
                          </td>
                          <td className="text-xs "> {user?.category_id}</td>
                        </tr>

                        <tr>
                          <td className="text-xs text-gray-400 w-20">
                            Experience :
                          </td>
                          <td className="text-xs ">{user?.experience}</td>
                        </tr>
                        <tr>
                          <td className="text-xs text-gray-400 w-20">
                            About me :
                          </td>
                        </tr>
                      </table>
                      <p className="text-xs mt-1 mb-3">
                        {setShowMoreText ? user.description : extractedText}...
                        <a
                          onClick={() => setShowMoreText(!showMoreText)}
                          className="underline text-blue-500 cursor-pointer"
                        >
                          {showMoreText ? " Hide" : "More"}
                        </a>
                      </p>
                      <h6 className="text-xs">Certificate</h6>
                      <div className="flex justify-between border border-gray-300 w-200 rounded-lg p-1 pr-4 pl-4 mt-2">
                        <div className="flex items-center">
                          <img
                            src={user.certificate}
                            alt=""
                            className="w-6 h-6"
                          />
                          <p className="text-xs">certificate</p>
                        </div>
                        <div className="flex items-center">
                          <button
                            onClick={() =>
                              downloadImage(user.certificate, "certificate.png")
                            }
                          >
                            <img src={download} alt="" className="w-3 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    {/*footer*/}
                    <div className=" flex items-center justify-end pt-4 pb-6 pr-5  rounded-b ">
                      {status === "requests" && (
                        <>
                          <button
                            style={{
                              backgroundColor: "#FF8888",
                              color: "#FF0B0B",
                            }}
                            className="text-xs background-transparent p-1 pl-5 pr-5 outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 rounded"
                            type="button"
                            onClick={() => toggleModal()}
                          >
                            Close
                          </button>
                          <button
                            style={{
                              backgroundColor: "#AAFFCC",
                              color: "#41945D",
                            }}
                            className="text-xs p-1 pl-5 pr-5 rounded shadow hover:shadow-lg outline-none focus:outline-none  mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={async () => {
                              console.log(user?._id + "     ###############");
                              const aprove = await AprovetDoctor(user?._id);
                              console.log("@@@@@@@@@@");
                              console.log(aprove);
                              console.log("@@@@@@@@@@@@@ aprove");
                              toggleModal();
                            }}
                          >
                            Save
                          </button>
                        </>
                      )}
                      {(status === "approved" ||
                        status === "canselled" ||
                        status === "unBlock") && (
                        <>
                          <button
                            style={{
                              backgroundColor: "#FF8888",
                              color: "#FF0B0B",
                            }}
                            className="text-xs background-transparent p-1 pl-3 pr-3 mt-1 outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 rounded"
                            type="button"
                            onClick={() => toggleModal()}
                          >
                            <div className="flex items-center">
                              {btImg ? (
                                <img
                                  src={btImg}
                                  alt=""
                                  className="w-3 h-3 mr-1"
                                />
                              ) : (
                                ""
                              )}
                              {btText}
                            </div>
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
      ) : null}
    </div>
  );
}
