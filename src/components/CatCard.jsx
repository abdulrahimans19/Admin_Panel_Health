import React from "react";

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
          className={`object-fill object-center w-full  ${
            isHomecareCategory ? "object-center w-20 h-24" : "h-40"
          }`}
          src={data?.image}
          alt="Your Image"
        />
      </div>

      {/* Name below the image */}
      <div className={`${isHomecareCategory ? "" : "p-4"}`}>
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
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-screen-md ">
                {/*content*/}
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full  bg-white outline-none focus:outline-none">
                  {/*header*/}
                  <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                    
                    <button
                      className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                  
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    <div className="flex">
                      {/* Left box with 70% width */}
                      <div className="w-3/5 pr-5">
                        <img
                          className="w-28 h-28"
                          src="https://via.placeholder.com/110x110"
                        />
                      </div>
                      {/* Right box with 30% width */}
                      <div className="w-2/5">
                        {/* Heading */}
                        <h2 className="text-lg font-semibold mb-3">
                          Category
                        </h2>
                        {/* "Type Category Name" text */}
                        <p className="text-blueGray-500 mb-2">
                          Edit Category Name
                        </p>
                        {/* Input field */}
                        <input
                          type="text"
                          placeholder="Enter category name"
                          className="w-full sm:w-30 p-3.5 bg-white rounded-lg border border-blue-100"
                        />
                      </div>
                    </div>
                  </div>
                  {/*footer*/}
                  <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        )}
      </div>
    </div>
  );
}
