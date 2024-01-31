import React from "react";

function WithdrawModal({ showModal, isShowModal }) {
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    console.log("Form submitted!");
    // Add your form submission logic here
  };
  return (
    <div>
      <div>
        {showModal ? (
          <div className="container ">
            <div className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="container ">
                <div className="relative w-auto my-6 mx-auto max-w-3xl  flex justify-center ">
                  {/*content*/}

                  <form onSubmit={handleSubmit}>
                    <div className="p-3  shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/* Head */}
                      <div className="flex justify-between p-2 mt-5">
                        <div>
                          <h1 className="font-[30px] fond-bold text-xl">
                            Withdraw Cash
                          </h1>
                        </div>
                        <button onClick={() => isShowModal()}>x</button>
                      </div>
                      <div className="relative mb-10">
                        <p className="absolute right-0 text-sm mt-3">
                          Balance: 14000 AED
                        </p>
                      </div>
                      {/* {body} */}

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-2 mt-3">
                        <div className="">
                          <p className="mb-2">Name</p>
                          <input
                            type="text"
                            className="p-2 outline-none border border-gray-400 rounded-lg w-auto h-10 "
                          />
                        </div>
                        <div className="">
                          <p className="mb-2">Country</p>
                          <select
                            className="w-full p-2 outline-none border border-gray-400 rounded-lg h-10"
                            defaultValue="defaultOptionValue"
                          >
                            <option value="defaultOptionValue" disabled>
                              Select an option
                            </option>
                            <option value="option1">Option 1</option>
                            <option value="option2">Option 2</option>
                          </select>
                        </div>
                      </div>
                      {/* secontinput */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-1 mt-10">
                        <div className="">
                          <p className="mb-2">Swift code</p>
                          <input
                            type="text"
                            className="p-2 outline-none border border-gray-400 rounded-lg w-auto h-10 "
                          />
                        </div>
                        <div className="">
                          <p className="mb-2">Amount to withdraw</p>
                          <input
                            type="text"
                            className="p-2 outline-none border border-gray-400 rounded-lg w-auto h-10 "
                          />
                        </div>
                      </div>
                      {/* third */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-2 mt-10">
                        <div className="">
                          <p className="mb-1">Bank name</p>
                          <input
                            type="text"
                            className="p-2 outline-none border border-gray-400 rounded-lg w-auto h-10 "
                          />
                        </div>
                        <div className="">
                          <p>Account number</p>
                          <input
                            type="text"
                            className="p-2 outline-none border border-gray-400 rounded-lg w-auto h-10 "
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-2 mt-5 p-5">
                        <button
                          onClick={() => {
                            console.log("hiiiiiiiiiiiiii");
                          }}
                          className="rounded-lg h-10 w-[150px] text-white"
                          style={{ backgroundColor: "rgba(36, 168, 250, 1)" }}
                          type="submit"
                        >
                          Request
                        </button>
                        <button
                          className="rounded-lg border border-1 border-blue-300 h-10 w-[150px] text-blue-400"
                          onClick={() => isShowModal()}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default WithdrawModal;
