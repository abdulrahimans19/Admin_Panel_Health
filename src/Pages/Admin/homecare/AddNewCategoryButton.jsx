import React from 'react'
import buttonImage from "../../../assets/images/element-plus.png";

function AddNewCategoryButton({ text, callback }) {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <div>
      <button
        className="rounded bg-black text-white p-3 items-center flex bg-no-repeat"
        onClick={() => setShowModal(true)}
      >
        <img src={buttonImage} className="w-5 h-5 mr-2 object-contain" alt="" />
        <div className="sm:block">{text}</div>
      </button>
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
                          Type Category Name
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
  );
}

export default AddNewCategoryButton
