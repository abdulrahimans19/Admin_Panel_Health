import React from "react";
import FilterDropDown from "./FilterDropDown";
import ResultModal from "./LabItems/lab_components/ResultModal";
import KeyValuePairResultModal from "./LabItems/lab_components/KeyValuePairResultModal";
import AddImage from "../../../assets/images/addImage.png";
import DatePicker from "react-datepicker";
import DateInput from "./appoinments/DateInput";

function AppoinmentDetails() {
  const [showModal, setShowModal] = React.useState(false);
  const handleDateChange=()=>{
    console.log("edit date");
  }
  return (
    <div>
      <div className="flex justify-between">
        <div></div>
        <div>
          <div>
            <div class="relative max-w-sm">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                </svg>
              </div>
            <DateInput
            label="filter by date"
            className="border text-gray-900 w-[118px] h-12 px-3 py-2.5 justify-start items-center gap-2 flex rounded-lg"
            onChange={handleDateChange}
            />
            
            </div>

            {/* <!-- Dropdown menu --> */}
          </div>
        </div>
      </div>
      <div>
        <div>
          <div class="flex items-center relative overflow-x-auto shadow-md sm:rounded-lg my-4">
            <table class="w-full text-sm text-center rtl:text-right text-gray-500 dark:text-gray-400 border-separate border-spacing-y-4">
              <thead class="text-xs text-gray-700 uppercase dark:bg-gray-200 text-neutral-950">
                <tr>
                  <th scope="col" class="px-6 py-3">
                    Name
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Member
                  </th>
                  <th scope="col" class="px-6 py-3">
                    ID
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Test name
                  </th>

                  <th scope="col" class="px-6 py-3">
                    Address{" "}
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Date Added
                  </th>
                  <th scope="col" class="px-6 py-3">
                    Total price
                  </th>
                  <th scope="col" class="px-6 py-3">
                    status
                  </th>
                </tr>
              </thead>
              <tbody className="text-neutral-950">
                <tr class="group bg-white border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-200 transition-colors">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 dark:text-black"
                  >
                    Apple MacBook Pro 17
                  </th>
                  <td class="px-6 py-4">Silver</td>
                  <td class="px-6 py-4">Silver</td>
                  <td class="px-6 py-4">Silver</td>
                  <td class="px-6 py-4">Silver</td>
                  <td class="px-6 py-4">Laptop</td>
                  <td class="px-6 py-4">$2999</td>
                  <td class="px-6 py-4 text-right">
                    <button
                      type="button"
                      onClick={() => setShowModal(true)}
                      class=" text-green-700 hover:text-black border border-green-700 hover:bg-green-800 focus:ring-1 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-8 py-1.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                    >
                      Accepted
                    </button>
                  </td>
                </tr>
                <tr class="bg-white border-bdark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-200">
                  <th
                    scope="row"
                    class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                  >
                    Apple MacBook Pro 17"
                  </th>
                  <td class="px-6 py-4">Silver</td>
                  <td class="px-6 py-4">Silver</td>
                  <td class="px-6 py-4">Silver</td>
                  <td class="px-6 py-4">Silver</td>
                  <td class="px-6 py-4">Laptop</td>
                  <td class="px-6 py-4">$2999</td>
                  <td class="px-6 py-4 text-right">
                    <button
                      type="button"
                      class="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-1 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-8 py-1.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                    >
                      Accepted{" "}
                    </button>
                    {showModal ? (
                      <>
                        <div className="fixed inset-0 z-50 overflow-hidden">
                          <div className="flex items-center justify-center min-h-screen">
                            <div className="bg-white rounded-lg shadow-lg p-8 w-96 relative">
                              {/* Close button */}
                              <div className="absolute top-4 right-4 w-7 h-7 bg-stone-300 bg-opacity-20 rounded-3xl flex items-center justify-center">
                                <div className="w-5 h-5"></div>
                              </div>

                              {/* Content */}
                              <div className="flex flex-col gap-4 text-left ">
                                <KeyValuePairResultModal
                                  label="Name"
                                  value="Joel"
                                />
                                <KeyValuePairResultModal
                                  label="ID"
                                  value="65461"
                                />
                                <KeyValuePairResultModal
                                  label="Member"
                                  value="1"
                                />
                                <KeyValuePairResultModal
                                  label="Testname"
                                  value="Comprehensive full body check up with vitamin"
                                />
                                <KeyValuePairResultModal
                                  label="Address"
                                  value="18 Al Murwah Street, Ajman Al rigga, Green corner , 703, 7 Mobile number: +971 502407809"
                                />
                                <KeyValuePairResultModal
                                  label="Date & Time"
                                  value="4:00 PM Dec 15, 2023"
                                />
                                <KeyValuePairResultModal
                                  label="Total price"
                                  value="AED 100"
                                />
                                Add Result
                                <div>
                                  <div className="flex flex-col justify-center items-center border border-dotted border-gray-300 rounded-[15px] h-400">
                                    <button>
                                      <img
                                        src={AddImage}
                                        alt=""
                                        className="w-20 h-30 mb-2 p-2"
                                      />
                                    </button>
                                    <p className=" text-xs text-center  p-2 ">
                                      Drag and drop an image here or click to
                                      select one
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-centergap-3.5">
                                  <div className="grow shrink basis-0 h-12 px-3.5 py-4 bg-emerald-200 rounded-lg justify-center items-center gap-2.5">
                                    <button
                                      onClick={() => setShowModal(false)}
                                      className=" text-center text-green-600 text-base font-normal font-['Roboto Flex'] text-sm"
                                    >
                                      Done
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                      </>
                    ) : null}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppoinmentDetails;
