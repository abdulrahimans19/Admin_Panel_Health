import React, { useCallback, useEffect, useState } from "react";
import AddSubTestingModal from "./AddSubtestModal";
import AddImage from "../../../../../assets/images/addImage.png";
import {
  GetHomecareCategoriesApi,
  UploadImageUrl,
  createTests,
  uploadToAws,
} from "../../../../../API/ApiCall";
import { useDropzone } from "react-dropzone";

function LabModal({ callback, setShowModal,getAllTests }) {
  const [addSubTestingModal, setAddSubTestingModal] = useState(false);
  const [addTestModal, setAddTestModal] = useState(false);
  const [load, setload] = useState(0)
  // const [showModal1, setShowModal] = React.useState(false);
  const [fileToUpload, setFileToUpload] = useState(null);
  const [Image, setImage] = React.useState("");
  const [TestName, setTestName] = useState("");
  const [showImage, setShowImage] = React.useState(false);
  const [homeCareCategories, setHomeCareCategory] = useState([]);

  const [samples, setSamples] = useState([]);
  const [sampleInput, setSampleInput] = useState("");
  const [numberofField, setnumberofField] = useState([{ inputValue: "" }]);
  const [subCategories, setSubCategories] = useState([]);
  const [isRecommended, setIsRecommended] = useState(false);

  const handleAddSample = () => {
    if (sampleInput.trim() !== "") {
      console.log("sampleinp", sampleInput);
      console.log("ajdshsadj");
      setSamples((prevSamples) => [...prevSamples, sampleInput.trim()]);
      setSampleInput("");
    }
  };

  const handleInputChange = (e) => {
    setSampleInput(e.target.value);
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

  const getHomecareCategories = () => {
    GetHomecareCategoriesApi().then((data) => {
      setHomeCareCategory(data.data.data.mainCategories);
    });
  };
  useEffect(() => {
    getHomecareCategories();
  }, []);
  const [setsaveTestDat, setSetsaveTestDat] = useState([]);
  const saveTest = () => {

  let tempErrors = {};

    const hasNull = subCategories.includes(null);
console.log();
    hasNull? setErrors({...tempErrors,subtest:" sub test  can  not empty"}):setErrors({...tempErrors,subtest:""})
  
    console.log(TestName);
    console.log(subCategories);
    console.log( tempErrors.secondTest =  TestName !="");
    tempErrors.secondTest =  TestName !=""?"":"add Tests"
    setErrors(tempErrors);

    if(TestName!=""){
      const wholeSubData = {
        name: TestName,
        sub_tests: subCategories,
      };
      setSetsaveTestDat([...setsaveTestDat, wholeSubData]);
      setTestName("");
      setnumberofField([{ inputValue: "" }]);
      setSubCategories([]);
      setAddSubTestingModal(false);
    }
    else{
      return
    }
    
  };

  const [errors, setErrors] = useState({});

const validate=(UserData)=>
{

  let tempErrors = {};
 

console.log(UserData?.categoryName );
console.log(UserData);
  tempErrors.typeSample =  samples[0]?"":"add at least one sample"
  tempErrors.NameOfTest =  UserData?.testName?"":"add name of the  Primary Test"
  tempErrors.secondTest =  setsaveTestDat[0]?"":"add at least one test"
  // tempErrors.sub_category =  !hasNull?"":"add name of the  sub test canot be empty"
  tempErrors.testTime =  UserData?.report_time?"":"add test time"
  tempErrors.rate =  UserData.rate?"":"add offer rate"
  tempErrors.daily_test_limit =  UserData?.daily_test_limit?"":"add test limit"
  tempErrors.showImage =  showImage?"":"add image "
  tempErrors.category =  UserData?.categoryName  != undefined ?"":"add Category"
console.log(tempErrors.category );
  setErrors(tempErrors);

  // Return true if no errors
  return Object.values(tempErrors).every(x => x === "");
}


  const addLabModal = (e) => {
    e.preventDefault();

    
    const form = new FormData(e.target);
    const UserData = Object.fromEntries(form);
    console.log(UserData);
    if (!validate(UserData)) return;




    console.log("image", fileToUpload);
    let publicUrl;
    function uploadImageAndCreateTest() {
      UploadImageUrl().then((data) => {
          const presignedUrl = data.data.presignedUrl;
          const publicUrl = data.data.publicUrl;
  
          uploadToAws(presignedUrl, fileToUpload).then(() => {
              console.log("Image uploaded to AWS");
  
              // Now publicUrl is available here
              console.log("Uploaded image URL:", publicUrl);
            console.log(UserData.categoryName);
              const wholeData = {
                  name: UserData.testName,
                  image: publicUrl,
                  category_id: UserData.categoryName,
                  testing_time: parseInt(UserData.report_time),
                  samples: samples,
                  price: parseInt(UserData.rate),
                  daily_test_limit: parseInt(UserData.daily_test_limit),
                  tests: setsaveTestDat,
                  is_recommended: isRecommended,
              };
  
              console.log("Data to be sent:", wholeData);
  
              createTests(wholeData).then((data) => {
                  console.log("API response after data submission:", data);
                getAllTests()

                  setShowModal(false);
              });
          });
      });
  }
  uploadImageAndCreateTest();
  

  };

  return (
    <div>
      <>
        <div className="fixed inset-0 z-50 overflow-auto">
          <form onSubmit={addLabModal} id="addmodal">
            <div className="flex items-center justify-center min-h-screen ">
              <div class="flex flex-col bg-white rounded-lg shadow-md p-6 ">
                <div className="lg:flex md:flex flex-row gap-3.5">
                  <div
                    {...getRootProps()}
                    className="flex flex-col justify-center items-center border border-dotted border-gray-300 rounded-[15px] h-400"
                  >
                    {!showImage ? (
                      <div>
                        <p>
                          Drag 'n' drop some files here, or click to select
                          files
                        </p>
                        {errors.showImage && <p className="text-red-500 text-xs text-xl font-semibold text-center">{errors.showImage}</p>}

                      </div>
                    ) : (
                      <div
                        sx={{
                          overflow: "hidden",
                          objectFit: "cover",
                          marginTop: 2,
                        }}
                      >
                        Drag 'n' drop some files here, or click to select
                          files
                        <img
                        className="max-w-sm"
                          height={100}
                          src={Image}
                          alt="Your Image"
                          sx={{ width: "100%" }}
                        />
                      </div>
                    )}
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
                            name="categoryName"
                            class="rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 p-1"
                          >
                            <option disabled selected value="">
                              Choose a category
                            </option>

                            {homeCareCategories[0] &&
                              homeCareCategories.map((data) => {
                                return (
                                  <option value={data?._id}>
                                    {data.title}
                                  </option>
                                );
                              })}
                          </select>
                          {errors.category && <p className="text-red-500 text-xs">{errors.category}</p>}

                        </div>
                        <div class="flex flex-col">
                          <label
                            for="type_of_samples"
                            class="text-sm font-medium text-gray-700 mb-2"
                          >
                            Type of samples
                          </label>
                          <div className="flex gap-3">
                            <input
                              type="text"

                              onChange={handleInputChange}
                              value={sampleInput}
                              name="sampleType"
                              id="type_of_samples"
                              class="rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 p-1"
                              placeholder="Ex: Blood test"
                            ></input>

                            <button
                              type="button"
                              className="border-4"
                              onClick={handleAddSample}
                            >
                              +
                            </button>
                          </div>
   {errors.typeSample && <p className="text-red-500 text-xs">{errors.typeSample}</p>}

                          <div className="flex p-4">
                            <ul className="mt- list-disc">
                              {samples.map((sample, index) => (
                                <li key={index}>{sample}</li>
                              ))}
                            </ul>
                          </div>
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
                            name="testName"
                             
                            id="name_of_test"
                            class="rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 p-1"
                            placeholder="Ex: Blood test, Body check..."
                          ></input>
                             {errors.NameOfTest && <p className="text-red-500 text-xs">{errors.NameOfTest}</p>}

                        </div>
                        <div class="p-6">
                          <label
                            for="is_recommended"
                            class="text-sm font-medium text-gray-700 mb-2"
                          >
                            Is Recommended ?
                          </label>
                          <input
                            type="checkbox"
                            id="is_recommended"
                            checked={isRecommended}
                            onChange={(e) => setIsRecommended(e.target.checked)}
                            class="ml-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 mt-2"
                          ></input>
                        </div>
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
                          onChange={(e) => {
                            setTestName(e.target.value);
                          }}
                          value={TestName}
                          name="test_or_subtests"
                          id="tests_subtests"
                          class="rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 p-1"
                          placeholder="Add Test name"
                        ></input>

{errors.secondTest && <p className="text-red-500 text-xs">{errors.secondTest}</p>}

                        <div className="flex gap-x-2.5 ">
                          <div>
                            <button
                              onClick={() => {
                                setAddSubTestingModal(!addSubTestingModal);
                              }}
                              type="button"
                              class="inline-flex mt-1 justify-center rounded bg-blue-400 items-center font-bold px-2 py-1 text-sm text-white hover:text-gray-700"
                            >
                            {addSubTestingModal?"hide subtest":  "Add sub test or View Test"}
                            </button>
                          </div>
                          <div></div>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div>
                          {addSubTestingModal && (
                            <div className="flex">
                              <AddSubTestingModal
                                onClose={setAddSubTestingModal}
                                subCategories={subCategories}
                                setSubCategories={setSubCategories}
                                numberofField={numberofField}
                                setnumberofField={setnumberofField}
                              />
                              <div>
                                {setsaveTestDat.map((data) => {
                                  return (
                                    <div className="p-4 border-2  ">
                                      {data.name}
                                      <div>
                                        {data?.sub_tests?.map((name) => {
                                          return <div className="p-2">{name?.name}</div>;
                                        })}
                                      </div>
                                    </div>
                                  );
                                })}
                                <div className="w-52 bg-red-500"></div>
                              </div>
                            </div>
                          )}
                        </div>

                        
                          {/* {addTestModal &&(
                        <input
                        type="text"
                        name="test_or_subtests"
                        id="tests_subtests"
                        class="rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 p-1"
                        placeholder="Add Test name"
                      ></input>
                      
                      )} */}
                        
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          saveTest();
                        }}
                        className="inline-flex mt-1  mb-3 justify-center rounded bg-blue-400 items-center font-bold px-2 py-1 text-sm text-white hover:text-gray-700"
                      >
                        save test
                      </button>
                      {errors.subtest && <p className="text-red-500 text-xs">{errors.subtest}</p>}

                      <div class="flex flex-row space-x-4">
                        {/* <div class="flex flex-col">
                          <label
                            for="available_date"
                            class="text-sm font-medium text-gray-700 mb-2"
                          >
                            Available time
                          </label>
                          <input
                            type="time"
                            name="available_time"
                            id="available_date"
                            class="rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 p-1"
                          ></input>
                        </div> */}
                        <div class="flex flex-col">
                          <label
                            for="report_time"
                            class="text-sm font-medium text-gray-700 mb-2"
                          >
                            Set report time (in hours)
                          </label>
                          <input
                            type="number"
                             
                            name="report_time"
                            placeholder="Set this time"
                            id="report_time"
                            class="rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 p-1"
                          ></input>
                             {errors.testTime && <p className="text-red-500 text-xs">{errors.testTime}</p>}

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
                           <div>
                           <input
                              placeholder="Set rate"
                              type="number"
                               
                              name="rate"
                              id="rate"
                              class="rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 p-1"
                            ></input>
                               {errors.rate && <p className="text-red-500 text-xs">{errors.rate}</p>}

                           </div>
                          
                            <div>
                            <input
                              type="number"
                              id="rate"
                               
                              name="daily_test_limit"
                              className="rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 p-1"
                              placeholder="Daily test limit"
                            />
                               {errors.daily_test_limit && <p className="text-red-500 text-xs">{errors.daily_test_limit}</p>}

                            </div>
                
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-end p-3">
                        <button
                          className="mr-2 text-red-500 bg-red-200  px-4 py-2 rounded-md"
                          onClick={() => {
                            callback();
                          }}
                        >
                          Cancel
                        </button>
                        <button
                          type="submit"
                          className="bg-green-200 text-green-500 px-6 py-2 rounded-md hover:bg-green-300"
                          // onClick={() => {
                          //   callback();
                          // }}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </>
    </div>
  );
}

export default LabModal;
