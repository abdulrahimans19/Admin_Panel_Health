import { useState } from "react";
import download from "../../../../assets/images/downloadimg.png";
import axios from "axios";
export default function ({
  status,
  showModal,
  toggleModal,
  callback,
  user,
  btImg,
  btText,
  id,
  myfunction,
  isFunction,
  selectpage,
  getWithdrawalRequsts,
  isCancel,
  isSet,
}) {
  const [showMoreText, setShowMoreText] = useState(false);

  function isURL(str) {
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;
    return urlPattern.test(str);
  }

  const downloadImage = async (filePath, fileName = "Example.jpg") => {
    try {
      console.log(filePath);
      const response = await axios({
        url: filePath, // Your file URL
        method: "GET",
        responseType: "blob", // Important
      });

      // Create a URL for the blob
      const fileURL = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = fileURL;
      link.setAttribute("download", "CustomFileName.jpg"); // Any custom file name
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading the file", error);
    }
  };

  // Extract text until the position of "i"
  const extractedText = user?.description?.substring(0, 50);

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
                      <img
                        src={user?.image}
                        alt=""
                        className="w-40 h-50 mb-2 p-2"
                      />
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
                          <td className="text-xs ">
                            {" "}
                            {user?.category_id?.title}
                          </td>
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
                            onClick={
                              () => {
                                downloadImage(
                                  user.certificate,
                                  "certificate.jpg"
                                );
                              }
                              //user?.certificate
                            }
                          >
                            <img src={download} alt="" className="w-3 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                    {/*footer*/}
                    <div className=" flex items-center justify-end pt-4 pb-6 pr-5  rounded-b ">
                      {(status === "requests" || status === "aprove") && (
                        <>
                          <button
                            style={{
                              backgroundColor: "#FF8888",
                              color: "#FF0B0B",
                            }}
                            className="text-xs background-transparent p-1 pl-5 pr-5 outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 rounded"
                            type="button"
                            onClick={async () => {
                              toggleModal();
                            }}
                          >
                            Cancel
                          </button>
                          <button
                            style={{
                              backgroundColor: "#AAFFCC",
                              color: "#41945D",
                            }}
                            className="text-xs p-1 pl-5 pr-5 rounded shadow hover:shadow-lg outline-none focus:outline-none  mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={async () => {
                              callback(id ? id : user?._id);
                              status === "aprove" && getWithdrawalRequsts();

                              myfunction();

                              isSet === "true" && isFunction();

                              toggleModal();
                            }}
                          >
                            {status === "aprove"
                              ? "Accept"
                              : isCancel
                              ? "Reject ?"
                              : "Save"}
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
                            onClick={async () => {
                              const test = await callback(user?._id);
                              console.log(test, "this my testing");
                              myfunction();
                              isSet && isFunction();
                              toggleModal();
                            }}
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
