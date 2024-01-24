import React from 'react'
import AddSubTestingModal from './AddSubtestModal';
import AddImage from "../../../../../assets/images/addImage.png";

function LabModal({showModal,callback}) {
  const [addSubTestingModal, setAddSubTestingModal] = React.useState(false);
  const [showModal1, setShowModal] = React.useState(false);
  return (
    <div>
      {showModal && (
        <>
          <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="flex items-center justify-center min-h-screen ">
              <div class="flex flex-col bg-white rounded-lg shadow-md p-6 ">
                <div className="flex flex-row gap-3.5">
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
                  <div>
                  <div className="mr-4">
                    <h2 class="text-xl mb-4">Create test</h2>
                    <div class="flex flex-row space-x-4">
                      <div class="flex flex-col">
                        <label
                          for="category"
                          class="text-sm font-medium text-gray-700 mb-2"
                        >
                          Select category
                        </label>
                        <select
                          id="category"
                          class="rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 p-2"
                        >
                          <option value="">Choose a category</option>
                          <option value="cough_blood">Cough Blood</option>
                          <option value="body_check">Body Check</option>
                        </select>
                      </div>
                      <div class="flex flex-col">
                        <label
                          for="type_of_samples"
                          class="text-sm font-medium text-gray-700 mb-2"
                        >
                          Type of samples
                        </label>
                        <input
                          type="text"
                          id="type_of_samples"
                          class="rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 p-2"
                          placeholder="Ex: Blood test"
                        ></input>
                      </div>
                    </div>
                    <div class="flex flex-row space-x-4">
                      <div class="flex flex-col">
                        <label
                          for="name_of_test"
                          class="text-sm font-medium text-gray-700 mb-2"
                        >
                          Name of Test
                        </label>
                        <input
                          type="text"
                          id="name_of_test"
                          class="rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 p-2"
                          placeholder="Ex: Blood test, Body check..."
                        ></input>
                      </div>
                      <div class="flex flex-col">
                        <label
                          for="tests_subtests"
                          class="text-sm font-medium text-gray-700 mb-2"
                        >
                          Tests/Subtests
                        </label>
                        <input
                          type="text"
                          id="tests_subtests"
                          class="rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 p-2"
                          placeholder="Add Test name"
                        ></input>
                        <button
                          onClick={() => {
                            setAddSubTestingModal(true);
                          }}
                          type="button"
                          class="inline-flex items-center px-2 py-1 text-sm font-medium text-gray-500 hover:text-gray-700"
                        >
                          Add sub test
                        </button>
                      </div>
                    </div>
                    <div>
                      {addSubTestingModal && (
                        <AddSubTestingModal onClose={setAddSubTestingModal} />
                      )}
                    </div>
                    <div class="flex flex-row space-x-4">
                      <div class="flex flex-col">
                        <label
                          for="available_date"
                          class="text-sm font-medium text-gray-700 mb-2"
                        >
                          Available date
                        </label>
                        <input
                          type="date"
                          id="available_date"
                          class="rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 p-2"
                        ></input>
                      </div>
                      <div class="flex flex-col">
                        <label
                          for="report_time"
                          class="text-sm font-medium text-gray-700 mb-2"
                        >
                          Set report time (in hours)
                        </label>
                        <input
                          type="number"
                          placeholder="Set this time"
                          id="report_time"
                          class="rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 p-2"
                        ></input>
                      </div>
                    </div>
                    <div class="flex flex-col space-x-4">
                      <div class="flex flex-col">
                        <label
                          for="rate"
                          class="text-sm font-medium text-gray-700 mb-2"
                        >
                          Rate & offer rate
                        </label>
                        <div class="flex flex-row space-x-2">
                          <input
                            placeholder="Set rate"
                            type="number"
                            id="rate"
                            class="rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 p-2"
                          ></input>
                          <input
                            type="number"
                            id="rate"
                            className="rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 p-2"
                            placeholder="set offer rate"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-end p-3">
                      
                      <button
                        className="mr-2 text-red-500 bg-red-200  px-4 py-2 rounded-md"
                        onClick={() => callback()}
                      >
                        Cancel
                      </button>
                      <button
                        className="bg-green-200 text-green-500 px-6 py-2 rounded-md hover:bg-green-300"
                        onClick={() => callback()}

                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
                  </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </div>
  )
}

export default LabModal
