import React, { useCallback, useEffect } from "react";
import FilterDropDown from "./FilterDropDown";
import ResultModal from "./LabItems/lab_components/ResultModal";
import KeyValuePairResultModal from "./LabItems/lab_components/KeyValuePairResultModal";
import AddImage from "../../../assets/images/addImage.png";
import DatePicker from "react-datepicker";
import DateInput from "./appoinments/DateInput";
import { useDropzone } from "react-dropzone";
import {
  UploadImageUrl,
  addResultApi,
  getAppoinmentsApi,
  getCurrentAppoinmentsApi,
  uploadToAws,
} from "../../../API/ApiCall";
import ReactPaginate from "react-paginate";
import { homecare } from "../../../Redux/Features/NavbarSlice";
import { useDispatch } from "react-redux";

function AppoinmentDetails() {
  const [showModal, setShowModal] = React.useState(false);
  const [appoinments, setAppoinments] = React.useState([]);
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [fileToUpload, setFileToUpload] = React.useState(null);
  const [showImage, setShowImage] = React.useState(false);

  const [Image, setImage] = React.useState("");
  useEffect(() => {
    getTodayAppoinments();
    // console.log(appoinments);
  }, []);
  const [totalPagecount, setTotalPagecount] = React.useState(0);
  const [currentPage, setCurrentPage] = React.useState(0);
  const dispatch = useDispatch();
  const handlePageChange = (selectedPage) => {
    // Handle page change logic here, e.g., fetching data for the new page
    setCurrentPage(selectedPage.selected);
  };
  const getTodayAppoinments = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    getCurrentAppoinmentsApi(year, month, day).then((data) => {
      console.log("apppoiii", data);
      console.log(data.data.data.total_count);
      const totalPages = Math.ceil(data.data.data.total_count / 10);
      setTotalPagecount(totalPages);
      setAppoinments(data.data.data.bookings);
    });
  };
  const handleDateChange = (data) => {
    console.log(data);
    let year = data.getFullYear();
    let month = data.getMonth() + 1;
    let date = data.getDate();
    console.log(`${year}-${month}-${date}`);
    getAppoinmentsApi(year, month, date).then((data) => {
      const totalPages = Math.ceil(data.data.data.total_count / 10);
      setTotalPagecount(totalPages);
      setAppoinments(data.data.data.bookings);
    });
  };
  const openModal = (userData) => {
    setSelectedUser(userData); // Set the selected user's data
    console.log("asdad", selectedUser);
    setShowModal(true); // Show the modal
  };
  const onDrop = useCallback((acceptedFiles) => {
    setFileToUpload(acceptedFiles[0]);
    setShowImage(true);

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    console.log(reader);
    reader.readAsDataURL(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: "image/*",
  });

  
  const addResult=(e)=>{
    
    const form = new FormData(e.target);
    const UserData = Object.fromEntries(form);
    console.log("image is",fileToUpload);
    UploadImageUrl().then((datas) => {
      const presignedUrl = datas.data.presignedUrl;
      const publicUrl = datas.data.publicUrl;
  
      uploadToAws(presignedUrl, fileToUpload).then(() => {
        console.log("Image uploaded to AWS");
        // Now publicUrl is available here
        console.log("Uploaded image URL:", publicUrl);
        console.log("book",selectedUser?._id);
        const resultData={
      
          booking_id:selectedUser._id,
          result_url:publicUrl
      
      }
      addResultApi(resultData).then((data)=>{
        console.log(data.data);
      })
      });
    });
   

      
    
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
                label="Filter by date"
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
                {appoinments[0] &&
                  appoinments.map((data) => {
                    return (
                      <tr class="bg-white border-bdark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-200">
                        <th
                          scope="row"
                          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black"
                        >
                          {data.profile_id.first_name}
                          {data.profile_id.middle_name == null
                            ? data.profile_id.middle_name
                            : " "}{" "}
                          {data.profile_id.last_name}
                          {/* {data.middle_name} { data.last_name} */}
                        </th>
                       
                        <td class="px-6 py-4">{data.profile_id.user_id}</td>
                        <td class="px-6 py-4">{data.test_id.name}</td>
                        <td class="px-6 py-4">
                          {data.address_id.street_address}{" "}
                          {data.address_id.state} {data.address_id.city}{" "}
                          {data.address_id.zip_code} ph:{" "}
                          {data.address_id.phone_number}
                        </td>
                        <td class="px-6 py-4">{data.created_at}</td>
                        <td class="px-6 py-4">${data.test_id.price}</td>
                        <td class="px-6 py-4 text-right">
                          <button
                            type="button"
                            onClick={() => {
                              openModal(data);
                            }}
                            class="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-1 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-8 py-1.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                          >
                            Accepted{" "}
                          </button>
                          {showModal ? (
                            <>
                              <div className="fixed inset-0 z-50 overflow-hidden">
                                <div className="flex items-center justify-center min-h-screen">
                                  <form onSubmit={addResult}>
                                  <div className="bg-white rounded-lg shadow-lg p-8 w-96 relative">
                                    {/* Close button */}
                                    <div className="absolute top-4 right-4 w-7 h-7 bg-stone-300 bg-opacity-20 rounded-3xl flex items-center justify-center">
                                      <div className="w-5 h-5"></div>
                                    </div>

                                   
                                    <div className="flex flex-col gap-4 text-left ">
                                      <KeyValuePairResultModal
                                        label={"Name"}
                                        value={`${
                                          selectedUser.profile_id.first_name
                                        } ${
                                          data.profile_id.middle_name == null
                                            ? data.profile_id.middle_name
                                            : " "
                                        } ${data.profile_id.last_name}`}
                                      />
                                      <KeyValuePairResultModal
                                        label="ID"
                                        value={`${selectedUser.profile_id.user_id}`}
                                      />
                                      <KeyValuePairResultModal
                                        label="Member"
                                        value="1"
                                      />
                                      <KeyValuePairResultModal
                                        label="Testname"
                                        value={`${selectedUser.test_id.name}`}
                                      />
                                      <KeyValuePairResultModal
                                        label="Address"
                                        value={`${selectedUser.address_id.street_address} ${selectedUser.address_id.state} ${selectedUser.address_id.city} ${selectedUser.address_id.zip_code} ph: ${selectedUser.address_id.phone_number}`}
                                      />
                                      <KeyValuePairResultModal
                                        label="Date & Time"
                                        value={`${selectedUser.created_at}`}
                                      />
                                      <KeyValuePairResultModal
                                        label="Total price"
                                        value={`${selectedUser.test_id.price}`}
                                      />
                                      Add Result
                                      <div>
                                        <div
                                          {...getRootProps()}
                                          className="flex flex-col justify-center items-center border border-dotted border-gray-300 rounded-[15px] h-400"
                                        >
                                          <button>
                                            <div
                                              sx={{
                                                overflow: "hidden",
                                                objectFit: "cover",
                                                marginTop: 2,
                                              }}
                                            >
                                              <img
                                                height={100}
                                                src={Image}
                                                alt="Your Image"
                                                sx={{ width: "100%" }}
                                              />
                                            </div>
                                          </button>
                                          <p className=" text-xs text-center  p-2 ">
                                            Drag and drop an image here or click
                                            to select one
                                          </p>
                                        </div>
                                      </div>
                                      <div
                                        onClick={() => setShowModal(false)}
                                        className="flex items-center gap-3.5"
                                      >
                                        <div className="grow shrink basis-0 h-12 px-3.5 py-4 bg-emerald-200 rounded-lg justify-center items-center gap-2.5">
                                          <button
                                          onClick={()=>{
                                            addResult(selectedUser._id)
                                          }}
                                          className="flex text-center text-green-600 text-base font-normal font-['Roboto Flex'] text-sm">
                                            Done
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  </form>
                                </div>
                              </div>

                              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                            </>
                          ) : null}
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ReactPaginate
        pageCount={totalPagecount} // Replace with the total number of pages
        pageRangeDisplayed={3} // Number of pages to display in the pagination bar
        marginPagesDisplayed={1} // Number of pages to display for margin pages
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>
  );
}

export default AppoinmentDetails;
