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
                        <h6 className="mb-4 text-xl font-bold">overview</h6>
                        <p className="text-xs mb-1">category Name</p>
                        <p className="text-xl font-bold">{catInfo?.title}</p>
                        <p className="text-xs mb-1 mt-4 ">sub categories</p>
                        {!subCatData || !subCatData[0] ? (
                          <p className="p-3 border border-1 rounded-md mb-4">
                            No subcategory available
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
                                    <div onClick={() => handleSave(index)}>
                                      save
                                    </div>
                                  ) : (
                                    // <CheckIcon className="h-5 w-5 cursor-pointer"  />
                                    <div
                                      onClick={() =>
                                        handleEdit(index, data?.title, data)
                                      }
                                    >
                                      edit
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
