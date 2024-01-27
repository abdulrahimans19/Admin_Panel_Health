import React from "react";

const CatInfoModal = ({ setViewCatInfoModal, catInfo, subCatData }) => {
  const modalClasses = "fixed inset-0 flex items-center  justify-center";
  const modalContentClasses = "bg-white p-4 rounded-lg flex";
  console.log(subCatData, "lifnawiervf");
  return (
    <div>
      <div className="container">
        <div className="pr-3 pl-3 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
          <div className="container">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}

              <div className=" rounded-[15px] shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}

                <form action="">
                  <div className=" flex justify-center items-center">
                    {/* leftDive */}
                    <div
                      className="flex justify-center items-center p-5 pt-3 "
                      style={{
                        width: 200,
                      }}
                    >
                      <div class="flex w-full items-center justify-center bg-grey-lighter">
                        <label class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
                          <div>
                            <div
                              sx={{
                                overflow: "hidden",
                                objectFit: "cover",
                                marginTop: 2,
                              }}
                            >
                              <img
                                height={100}
                                src={catInfo.image}
                                alt="Your Image"
                                sx={{ width: "100%" }}
                              />
                            </div>
                          </div>
                        </label>
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
                        <h6 className="mb-4 text-xl font-bold">overview</h6>
                        <p className="text-xs mb-1">category Name</p>
                        <p className="text-xl font-bold">{catInfo.title}</p>

                        <p className="text-xs mb-1 mt-4 ">sub categories</p>

                        {!subCatData[0] ? (
                          <p className="p-3 border border-1 rounded-md mb-4">
                            No subcategory available
                          </p>
                        ) : (
                          subCatData?.map((data) => {
                            return (
                              <p className="p-3 border border-1 rounded-md mb-4">
                                {data?.title}
                              </p>
                            );
                          })
                        )}
                      </div>
                      {/*footer*/}
                      <div className=" flex items-center justify-end pt-4 pb-6 pr-5  rounded-b ">
                        <button
                          style={{
                            backgroundColor: "#FF8888",
                            color: "#FF0B0B",
                          }}
                          className="text-xs background-transparent p-2 pl-7 pr-7 outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 rounded"
                          type="button"
                          onClick={() => {
                            setViewCatInfoModal(false);
                          }}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </div>
    </div>
  );
};

export default CatInfoModal;
