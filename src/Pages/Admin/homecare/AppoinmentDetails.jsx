import React, { useCallback, useEffect, useState } from "react";
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
import noDataImage from "../../../assets/images/no_data.png";
import NoDataImage from "../../../components/NoDataImage";
function AppoinmentDetails() {
  const today = new Date();
  const [startDate, setStartDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [appoinments, setAppoinments] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [fileToUpload, setFileToUpload] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [showImage, setShowImage] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPagecount, setTotalPagecount] = useState(0);
  const [day, setDay] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const [year, setYear] = useState(today.getDate());
  const [Image, setImage] = useState("");
  const [fileInputs, setFileInputs] = useState([{ file: null }]);
const [error, seterror] = useState()
  useEffect(() => {
    dispatch(homecare());

    getTodayAppoinments();
    // console.log("currnt", currentPage);
  }, [currentPage]);
  const handleFileChange = (e, index) => {
    const files = e.target.files[0]
    const updatedFileInputs = [...fileInputs];
    updatedFileInputs[index].file = files;
    setFileInputs(updatedFileInputs);
  };
  const deleteFileInput = (index) => {
    if (fileInputs.length > 1) {
      const updatedFileInputs = fileInputs.filter((_, i) => i !== index);
      setFileInputs(updatedFileInputs);
    }
  };

  const addFileInput = () => {
    setFileInputs([...fileInputs, { file: null }]);
  };
  const dispatch = useDispatch();
  const handlePageChange = (selectedPage) => {
    // Handle page change logic here, e.g., fetching data for the new page
    console.log("selectedPage", selectedPage.selected);
    setCurrentPage(selectedPage.selected + 1);
    // console.log("page is",currentPage);
  };
  const getTodayAppoinments = () => {
    getCurrentAppoinmentsApi(year, month, day, currentPage).then((data) => {
      console.log("apppoiii", data);
      // console.log(data.data.data.total_count);
      const totalPages = Math.ceil(data.data.data.total_count / 10);
      setTotalPagecount(totalPages);
      setAppoinments(data.data.data.bookings);
    }).catch((error)=>{
      console.log(error);
    })
  };

  const getTableData = () => {
    getAppoinmentsApi(year, month, day, currentPage).then((data) => {
      const totalPages = Math.ceil(data.data.data.total_count / 10);
      setTotalPagecount(totalPages);
      setAppoinments(data.data.data.bookings);
      console.log("appoinmsansnsnn", appoinments);
    }).catch((error)=>{
      console.log(error);
    })
  };
  useEffect(() => {
    getTableData();
  }, [year, day, month]);
  const handleDateChange = (data) => {
    setStartDate(data);

    setYear(data.getFullYear());
    setMonth(data.getMonth() + 1);
    setDay(data.getDate());
    // console.log("yaaaaa", year, month, day);
    // console.log(`${year}-${month}-${date}`);
  };
  const openModal = (userData) => {
    setSelectedUser(userData); // Set the selected user's data
    console.log("asdad", selectedUser);
    setShowModal(true); // Show the modal
  };
  const onDrop = useCallback((acceptedFiles) => {
    // Update the state to include the newly accepted files
    console.log("on drop");
    const updatedFiles = acceptedFiles.map((file) => ({ file }));
    setFileInputs((prevInputs) => [...prevInputs, ...updatedFiles]);
console.log("files rere",fileInputs);
    // Optionally, if you want to show previews for multiple files:
    const filePreviews = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    // Here, you can set these previews to a state or handle them as needed
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: "image/*",
  });

  const addResult = async () => {
  
    // e.preventDefault(); // Prevent the form from submitting the traditional way
    
    // Assuming 'fileToUpload' is the name attribute of your file input
    // const filesToUpload = form.getAll("fileToUpload");
    console.log("files to upload ",fileToUpload);
    const uploadedUrls = [];
console.log(fileInputs,"fileinput here");
if (fileInputs.some(obj => obj.hasOwnProperty("file") && obj["file"] === null)) {
  console.log("add files");
  seterror("input files")
}
else{
  seterror("")
console.log("else working");
  for (const input of fileInputs) {
    const file = input.file;
    console.log("uolpoiu",file); // Directly accessing the file object
    if(file==null){
      return ;
    }
    try {
      const datas = await UploadImageUrl(); 
      console.log("iuhhhhhhh",datas.data);// Get a presigned URL for each file
      const presignedUrl = datas.data.presignedUrl;
      const publicUrl = datas.data.publicUrl;

      await uploadToAws(presignedUrl, file)
      // .then((data)=>{
      //   console.log("uploadinfdfd",data);
      // }); // Upload the file to AWS
      uploadedUrls.push(publicUrl); // Collect the public URL after successful upload

      console.log("Uploaded image URL:", publicUrl);
    } catch (error) {
      console.error("Error uploading file:", error);
      // Handle any errors here, such as breaking the loop or showing a message
    }
    setFileInputs([{file:null}])
  }

  console.log("All uploaded URLs:", uploadedUrls);
  if (uploadedUrls.length > 0) {
    // After all files are uploaded, you might want to do something with the URLs
    const resultData = {
      booking_id: selectedUser._id,
      result_urls: uploadedUrls, // Store all URLs in resultData
    };

    console.log("Result data with URLs:", resultData);
    // Call your API with the result data
    try {
      await addResultApi(resultData);
      // console.log("Result API response:", data);
      getTodayAppoinments();
      setShowModal(false)
      // Refresh appointments or handle the next steps
    } catch (apiError) {
      console.error("Error calling addResultApi:", apiError);
      // Handle API call error here
    }
  }

}


    

    
  };
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
                selectedDate={startDate}
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
          {appoinments[0] ? (
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
                  {appoinments.map((data) => {
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

                        <td class="px-6 py-4">{data._id}</td>
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
                          {data?.result_url[0] ? (
                            <div class=" p-4 text-green-700 border border-green-700  focus:ring-1 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm py-1 text-center dark:border-green-500 dark:text-green-500 ">
                              Result added
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => {
                                openModal(data);
                              }}
                              class="text-red-700 p-4 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-1 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-8 py-1.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-800"
                            >
                              Result not Added{" "}
                            </button>
                          )}
                          {showModal ? (
                            <>
                              <div className="fixed inset-0 z-50 overflow-auto">
                                <div className="flex items-center justify-center min-h-screen">
                              
                                    <div className="bg-white rounded-lg shadow-lg p-8 w-96 relative">
                                      {/* Close button */}
                                      <div className="absolute top-4 right-4 w-7 h-7 bg-stone-300 bg-opacity-20 rounded-3xl flex items-center justify-center">
                                        <div className="w-5 h-5"></div>
                                      </div>

                                      <div className="flex flex-col gap-4 text-left ">
                                        <KeyValuePairResultModal
                                          label={"Name"}
                                          value={`${
                                            selectedUser?.profile_id?.first_name
                                          } ${
                                            data?.profile_id?.middle_name ==
                                            null
                                              ? data?.profile_id?.middle_name
                                              : " "
                                          } ${data?.profile_id?.last_name}`}
                                        />
                                        <KeyValuePairResultModal
                                          label="ID"
                                          value={`${selectedUser?._id}`}
                                        />
                                        <KeyValuePairResultModal
                                          label="Member"
                                          value="1"
                                        />
                                        <KeyValuePairResultModal
                                          label="Testname"
                                          value={`${selectedUser?.test_id.name}`}
                                        />
                                        <KeyValuePairResultModal
                                          label="Address"
                                          value={`${selectedUser?.address_id?.street_address} ${selectedUser?.address_id?.state} ${selectedUser.address_id.city} ${selectedUser.address_id.zip_code} ph: ${selectedUser.address_id.phone_number}`}
                                        />
                                        <KeyValuePairResultModal
                                          label="Date & Time"
                                          value={`${selectedUser?.created_at}`}
                                        />
                                        <KeyValuePairResultModal
                                          label="Total price"
                                          value={`${selectedUser?.test_id?.price}`}
                                        />
                                        <p>  Add Result</p> 
                                {error && <p className="text-red-500 text-xs">{error}</p>}

                                        <div className="justify-end">
                                          {fileInputs.map((input, index) => (
                                            <div
                                              key={index}
                                              className="flex items-center justify-between mb-2"
                                            >
                                              <input
                                                multiple
                                                className="flex-grow text-xs text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none dark:text-gray-400 dark:bg-gray-700 dark:border-gray-600"
                                                type="file"
                                                onChange={(e) =>
                                                  handleFileChange(e, index)
                                                }
                                              />
                                              {fileInputs.length > 1 && (
                                                <button
                                                  type="button"
                                                  onClick={() =>
                                                    deleteFileInput(index)
                                                  }
                                                  className="ml-2 text-red-500 hover:text-white hover:bg-red-500 border border-red-500 focus:outline-none font-medium rounded-lg text-sm p-1"
                                                  aria-label="Delete file input"
                                                >
                                                  <svg
                                                    class="fill-current text-red-700"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="18"
                                                    height="18"
                                                    viewBox="0 0 18 18"
                                                  >
                                                    <path d="M12.45 11.75L11.25 12.95L9 10.7L6.75 12.95L5.55 11.75L7.8 9.5L5.55 7.25L6.75 6.05L9 8.3L11.25 6.05L12.45 7.25L10.2 9.5L12.45 11.75Z" />
                                                  </svg>
                                                </button>
                                              )}
                                            </div>
                                          ))}

                                          {/* Button to add more file inputs */}
                                          <button
                                            type="button"
                                            onClick={addFileInput}
                                            className="text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white focus:outline-none font-medium rounded-lg text-sm px-4 py-2"
                                          >
                                            +
                                          </button>
                                        </div>
                                        <div
                                         
                                          className="flex justify-end items-center gap-1"
                                        >
                                          <div className="">
                                            <button
                                              onClick={() => {
                                                addResult();
                                              }}
                                              className="text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-1 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-8 py-1.5 text-center me-2 mb-2 dark:border-green-500 dark:text-green-500 dark:hover:text-white dark:hover:bg-green-600 dark:focus:ring-green-800"
                                            >
                                              Done
                                            </button>
                                          </div>
                                          <div className="">
                                            <button
                                              onClick={() =>
                                                setShowModal(false)
                                              }
                                              className="text-green-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-1 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-8 py-1.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-800"
                                            >
                                              Cancel
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                               
                                </div>
                              </div>

                              <div className="opacity-25 fixed inset-0 z-40 bg-slate-700"></div>
                            </>
                          ) : null}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="flex justify-center">

              <NoDataImage text={"No Appoinments For this Date"} />
            </div>
          )}
        </div>
        {appoinments[0] ? (
          <ReactPaginate
            pageCount={totalPagecount} // Replace with the total number of pages
            pageRangeDisplayed={3} // Number of pages to display in the pagination bar
            marginPagesDisplayed={1} // Number of pages to display for margin pages
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            activeClassName={"active"}
            forcePage={currentPage - 1}
          />
        ) : null}
      </div>
    </div>
  );
}

export default AppoinmentDetails;
