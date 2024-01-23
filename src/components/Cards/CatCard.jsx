import React from "react";
import AddImage from "../../assets/images/addImage.png";

export default function CatCard({ data, callback, isHomecareCategory }) {
  const [showModal, setShowModal] = React.useState(false);

  const cardHeight = isHomecareCategory ? 260 : 240;
  return (
    <div
      className={`max-w-sm mx-auto bg-white shadow-lg rounded-md overflow-hidden relative ${
        isHomecareCategory
          ? "p-8 bg-gray-100" // Adjust padding and background for Homecare
          : "p-4"
      }`}
      style={{ height: cardHeight }}
    >
      {/* Image in the center */}
      <div className="flex items-center justify-center h-full">
        <img
          className={"object-contain object-center"}
          src={data?.image}
          alt="Your Image"
        />
      </div>

      {/* Name below the image */}
      <div className={`"p-4"}`}>
        <p className="text-lg font-semibold text-gray-800">{data?.name}</p>
      </div>

      {/* Pencil icon at the top right corner */}
      <div
        onClick={() => {
          callback(data);
        }}
        className=" top-0 right-0 p-4 absolute"
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
          onClick={() => setShowModal(true)}
        >
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
        {showModal && (
          <div className="container">
          <div className="pr-3 pl-3 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}

                <div className=" rounded-[15px] shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  {/*header*/}

                  <div className=" flex justify-center items-center">
                    {/* leftDive */}
                    <div
                      className="flex justify-center items-center p-5 pt-3 "
                      style={{
                        width: 200,
                      }}
                    >
                      <div className="flex flex-col justify-center items-center border border-dotted border-gray-300 rounded-[15px] h-400">
                        <button>
                          <img
                            src={AddImage}
                            alt=""
                            className="w-20 h-30 mb-2 p-2"
                          />
                        </button>
                        <p className=" text-xs text-center  p-2 ">
                          Drag and drop an image here or click to select one
                        </p>
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
                        <h6 className="mb-4 font-bold">Category</h6>
                        <p className="text-xs mb-1">Type Category name </p>
                        <input
                          type="text"
                          placeholder="Type name"
                          className="rounded-[10px] pl-3 p-1 border border-gray-300 outline-none "
                        />
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
                          onClick={() => setShowModal(false)}
                        >
                          Close
                        </button>
                        <button
                          style={{
                            backgroundColor: "#AAFFCC",
                            color: "#41945D",
                          }}
                          className="text-xs p-2 pl-7 pr-7 rounded shadow hover:shadow-lg outline-none focus:outline-none  mb-1 ease-linear transition-all duration-150"
                          type="button"
                          onClick={() => {
                            callback();
                            setShowModal(false);
                          }}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
        )}
      </div>
    </div>
  );
}
