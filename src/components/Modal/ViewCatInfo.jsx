import React, { useEffect, useRef, useState } from "react";
import { PencilIcon, CheckIcon } from "@heroicons/react/solid";
import { updatesubcat } from "../../API/ApiCall";
const CatInfoModal = ({
  setViewCatInfoModal,
  catInfo,
  subCatData,
  viewCatInfo,
}) => {
  const modalClasses = "fixed inset-0 flex items-center  justify-center";
  const modalContentClasses = "bg-white p-4 rounded-lg flex";
  // console.log(catInfo, "===== lifnawiervf");
  const [editItemId, setEditItemId] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [whoolevalue, setWhoolevalue] = useState();
  // Handler to enable editing mode
  const handleEdit = (id, title, data) => {
    setEditItemId(id);
    setInputValue(title);
    setWhoolevalue(data);
  };

  // Handler to save the edited value
  const handleSave = (id) => {
    const wholedata = {
      category_id: whoolevalue._id,
      title: inputValue,
      main_category_id: whoolevalue.main_category_id,
    };

    updatesubcat(wholedata)
      .then((data) => {
        setEditItemId(null);
        setWhoolevalue(null);
        console.log(viewCatInfo);
        viewCatInfo(catInfo);
      })
      .catch((err) => {
        console.log(err);
        setEditItemId(null);
        setWhoolevalue(null);
      });

    console.log(`Saving ${inputValue} for item ${id}`);
    console.log(whoolevalue);
    // Here you should update the actual data, for example, by lifting state up or using a state management library
    setEditItemId(null);
    setWhoolevalue(null);
  };

  const inputRef = useRef(null);

  // Effect to focus on the input field when it's shown
  useEffect(() => {
    if (editItemId !== null) {
      inputRef.current?.focus();
    }
  }, [editItemId]);
  useEffect(() => {}, []);

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
                                src={catInfo?.image}
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
                        <h6 className="mb-4 text-xl font-bold">Overview</h6>
                        <p className="text-xs mb-1">Category Name</p>
                        <p className="text-xl font-bold">{catInfo?.title}</p>
                        <p className="text-xs mb-1 mt-4 ">Sub categories</p>
                        {!subCatData || !subCatData[0] ? (
                          <p className="p-3 border border-1 rounded-md mb-4">
                            No Subcategories Available
                          </p>
                        ) : (
                          <div>
                            {subCatData?.map((data, index) => {
                              const isEditing = editItemId === index; // Check if this item is being edited
                              return (
                                <div
                                  key={index}
                                  className="p-3 border border-1 rounded-md mb-4 flex items-center justify-between"
                                >
                                  {isEditing ? (
                                    <input
                                      ref={inputRef}
                                      type="text"
                                      value={inputValue}
                                      onChange={(e) =>
                                        setInputValue(e.target.value)
                                      }
                                      className="flex-1"
                                    />
                                  ) : (
                                    <span>{data?.title}</span>
                                  )}
                                  {isEditing ? (
                                    <div
                                    className="ml-1 cursor-pointer"
                                    onClick={() => handleSave(index)}>
                                      <svg
                                        width="24px"
                                        height="24px"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path
                                          d="M7.76471 4H5C4.44771 4 4 4.44772 4 5V16.5376C4 16.8309 4.12882 17.1095 4.35235 17.2995L8.42581 20.7619C8.60661 20.9156 8.83617 21 9.07346 21H19C19.5523 21 20 20.5523 20 20V5C20 4.44772 19.5523 4 19 4H16.2353M7.76471 4V9C7.76471 9.55228 8.21242 10 8.76471 10H15.2353C15.7876 10 16.2353 9.55228 16.2353 9V4M7.76471 4H16.2353"
                                          stroke="#000000"
                                          stroke-width="2"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                        />
                                        <path
                                          d="M9 21V16C9 15.4477 9.44772 15 10 15H14C14.5523 15 15 15.4477 15 16V21"
                                          stroke="#000000"
                                          stroke-width="2"
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                        />
                                      </svg>
                                    </div>
                                  ) : (
                                    // <CheckIcon className="h-5 w-5 cursor-pointer"  />
                                    <div
                                      onClick={() =>
                                        handleEdit(index, data?.title, data)
                                      }
                                    >
                                      <svg
                                        class="cursor-pointer feather feather-edit"
                                        fill="none"
                                        height="24"
                                        stroke="currentColor"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        viewBox="0 0 24 24"
                                        width="24"
                                        xmlns="http://www.w3.org/2000/svg"
                                      >
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                                      </svg>
                                    </div>
                                    // <PencilIcon className="h-5 w-5 cursor-pointer"  />
                                  )}
                                </div>
                              );
                            })}
                          </div>
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
