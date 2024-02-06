import React, { useCallback, useEffect, useState } from "react";
import AddSubTestingModal from "./AddSubtestModal";
import AddImage from "../../../../../assets/images/addImage.png";
import { useDropzone } from "react-dropzone";
import {
  GetHomecareCategoriesApi,
  UploadImageUrl,
  editTests,
  uploadToAws,
} from "../../../../../API/ApiCall";
function EditLabModal({ valdata, callback, setEditShowModal1, getAllTests }) {
  const [addSubTestingModal, setAddSubTestingModal] = useState(false);
  const [addTestModal, setAddTestModal] = useState(false);
  const [sampleModal, setSampleModal] = useState(false);
  const [subTestModal, setSubTestModal] = useState(false);
  // const [showModal1, setShowModal] = React.useState(false);
  const [fileToUpload, setFileToUpload] = useState(null);
  const [Image, setImage] = React.useState("");
  const [TestName, setTestName] = useState("");
  const [showImage, setShowImage] = React.useState(false);
  const [homeCareCategories, setHomeCareCategory] = useState([]);

  const [samples, setSamples] = useState([valdata.samples]);
  const [newSamples, setNewSamples] = useState([]);

  const [sampleInput, setSampleInput] = useState("");
  const [numberofField, setnumberofField] = useState([{ inputValue: "" }]);
  const [subCategories, setSubCategories] = useState([]);
  const [isRecommended, setIsRecommended] = useState();
  const [forModalTestData, setForModalTestData] = useState([]);
  const [forModalSampleData, setForModalSampleData] = useState([]);
  const [editTestSubata, setEditTestSubata] = useState([]);
  const [indexvalue, setindex] = useState(0);
  const [onloadSamples, setOnloadSamples] = useState([]);
  const [isEditImage, setisEditImage] = useState(true);
  const handleAddSample = () => {
    if (sampleInput.trim() !== "") {
      console.log("sampleinp", sampleInput);
      console.log("ajdshsadj");
      setSamples((prevSamples) => [...prevSamples, sampleInput.trim()]);
      setSampleInput("");
    }
  };
  useEffect(() => {
    setSamples(valdata.samples);
    // setOnloadSamples();
    setIsRecommended(valdata.is_recommended);
  }, []);
  const handleInputChange = (e) => {
    setSampleInput(e.target.value);
  };

  const onDrop = useCallback((acceptedFiles) => {
    setFileToUpload(acceptedFiles[0]);
    setShowImage(true);
    setisEditImage(false);
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    // console.log(reader);
    reader.readAsDataURL(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: "image/*",
  });
  const [incomingCat, setIncomingCat] = useState();
  const getHomecareCategories = () => {
    GetHomecareCategoriesApi()
      .then((data) => {
        console.log("hitu", data.data.data.mainCategories);
        console.log(valdata._id);
        const foundObject = data.data.data.mainCategories.find(
          (item) => item._id === valdata.category_id
        );
        setIncomingCat(foundObject);

        console.log(foundObject, "this data");
        setHomeCareCategory(data.data.data.mainCategories);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    console.log("fitting", valdata);
    getHomecareCategories();
  }, []);
  const [setsaveTestDat, setSetsaveTestDat] = useState(valdata.tests);
  const saveTest = () => {
    let tempErrors = {};
    console.log(TestName);
    console.log(subCategories);
    tempErrors.secondTest = TestName != "" ? "" : "add Tests";
    setErrors(tempErrors);

    if (TestName != "") {
      const wholeSubData = {
        name: TestName,
        sub_tests: subCategories,
      };
      setSetsaveTestDat([...setsaveTestDat, wholeSubData]);
      setTestName("");
      setnumberofField([{ inputValue: "" }]);
      setSubCategories([]);
      setAddSubTestingModal(false);
    } else {
      return;
    }
  };
  const forEditTest = () => {
    setForModalTestData(setsaveTestDat);
    console.log("aszfsfaf", forModalTestData);
  };

  const [errors, setErrors] = useState({});

  const validate = (UserData) => {
    console.log();
    let tempErrors = {};

    console.log(UserData?.categoryName);
    console.log(UserData);
    tempErrors.typeSample = samples[0] ? "" : "add at least one sample";
    tempErrors.NameOfTest = UserData?.testName
      ? ""
      : "add name of the  Primary Test";
    tempErrors.secondTest = setsaveTestDat[0] ? "" : "add at least one test";
    // tempErrors.sub_category =  !hasNull?"":"add name of the  sub test canot be empty"
    tempErrors.testTime = UserData?.report_time ? "" : "add test time";
    tempErrors.rate = UserData.rate ? "" : "add offer rate";
    tempErrors.daily_test_limit = UserData?.daily_test_limit
      ? ""
      : "add test limit";
    tempErrors.showImage = showImage != isEditImage ? "" : "add image ";
    tempErrors.category =
      UserData?.categoryName != undefined ? "" : "add Category";
    console.log(tempErrors, "errors");
    console.log(tempErrors.category);
    setErrors(tempErrors);

    // Return true if no errors
    return Object.values(tempErrors).every((x) => x === "");
  };

  const editLabModal = (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const UserData = Object.fromEntries(form);
    if (!validate(UserData)) return;
    console.log("userta", UserData, setsaveTestDat);
    console.log("image", fileToUpload);
    let publicUrl;

    if (!isEditImage) {
      if (fileToUpload) {
        UploadImageUrl()
          .then((datas) => {
            const presignedUrl = datas.data.presignedUrl;
            const publicUrl = datas.data.publicUrl;

            uploadToAws(presignedUrl, fileToUpload)
              .then(() => {
                console.log("Image uploaded to AWS");
                // Now publicUrl is available here
                console.log("Uploaded image URL:", publicUrl);
                const joinedSamples = samples.join(",");
                const wholeData = {
                  test_id: valdata._id,
                  name: UserData.testName,
                  image: publicUrl,
                  category_id: UserData.categoryName,
                  testing_time: parseInt(UserData.report_time),
                  samples: joinedSamples.split(","),
                  price: parseInt(UserData.rate),
                  daily_test_limit: parseInt(UserData.daily_test_limit),
                  tests: setsaveTestDat,
                  is_recommended: isRecommended,
                };

                console.log("Data to be sent:", wholeData);
                editTests(wholeData)
                  .then((data) => {
                    getAllTests();
                    setEditShowModal1(false);
                  })
                  .catch((err) => {
                    getAllTests();
                    setEditShowModal1(false);
                  });
              })
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      const joinedSamples = samples.join(",");
      const wholeData = {
        test_id: valdata._id,
        name: UserData.testName,
        image: valdata.image,
        category_id: UserData.categoryName,
        testing_time: parseInt(UserData.report_time),
        samples: joinedSamples.split(","),
        price: parseInt(UserData.rate),
        daily_test_limit: parseInt(UserData.daily_test_limit),
        tests: setsaveTestDat,
        is_recommended: isRecommended,
      };
      editTests(wholeData)
        .then((data) => {
          console.log("API response after data submission:", data);
          getAllTests();
          setEditShowModal1(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const testModalFunction = (e) => {
    e.preventDefault();
    setSubTestModal(false);
    const form = new FormData(e.target);
    const UserData = Object.fromEntries(form);
    console.log("usderdad", UserData);

    const firstKey = Object.keys(UserData)[0];
    const firstValue = UserData[firstKey];

    const remainingKeyValuePairs = Object.keys(UserData)
      .slice(1) // Skip the first key
      .map((key) => ({ ["name"]: UserData[key] }));
    console.log("hai", remainingKeyValuePairs);
    const allData = {
      name: firstValue,
      sub_tests: remainingKeyValuePairs,
    };

    setSetsaveTestDat((prevArray) => {
      const newArray = [...prevArray];
      console.log(newArray, "orihgoesirg");
      newArray[indexvalue] = allData;
      return newArray;
    });
  };
  const sampleModalFunction = (e) => {
    e.preventDefault();
    setSampleModal(false);
    const form = new FormData(e.target);
    const UserData = Object.fromEntries(form);
    const getSampleArray = Object.values(UserData);

    setSamples(getSampleArray);
  };

  return (
    <div>
      <>
        {subTestModal && (
          <div className="fixed z-50 inset-0 overflow-auto">
            <div className="flex z-50  items-center justify-center min-h-screen">
              <div className="bg-white  z-50  rounded-lg shadow-md p-6">
                <form onSubmit={testModalFunction} id="form">
                  <div className="grid">
                    <div>
                      <input
                        type="text"
                        name="testName"
                        className="mt-2 p-2 border rounded-md bg-gray-400"
                        defaultValue={forModalTestData.name}
                      />
                    </div>
                    <div>
                      {forModalTestData.sub_tests &&
                        forModalTestData.sub_tests.map((subTest, index) => (
                          <input
                            key={index}
                            type="text"
                            name={`testSubName${index}`}
                            placeholder={`Subtest ${index + 1}`}
                            className="mt-2 p-2 border rounded-md"
                            defaultValue={subTest.name}
                          />
                        ))}
                    </div>

                    <div className=" pt-2">
                      <div className="flex justify-between">
                        <div className="">
                          <button
                            onClick={() => setSubTestModal(false)}
                            className="bg-red-500 text-white px-4 py-2 rounded-md"
                          >
                            Close
                          </button>
                        </div>
                        <div>
                          <button
                            type="submit"
                            className="bg-green-500 text-white px-4 py-2 rounded-md"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>

                {/* Second Input Field */}
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-20 bg-black"></div>
          </div>
        )}
        {sampleModal && (
          <div className="fixed z-50 inset-0 overflow-auto">
            <div className="flex z-50  items-center justify-center min-h-screen">
              <div className="bg-white  z-50  rounded-lg shadow-md p-6">
                <form onSubmit={sampleModalFunction} id="form">
                  <div className="">
                    <div className="flex flex-col">
                      {samples[0] &&
                        samples.map((subTest, index) => (
                          <input
                            key={index}
                            type="text"
                            name={`samples${index}`}
                            // value={subTest}
                            placeholder={`Subtest ${index + 1}`}
                            className="mt-2 p-1 border rounded-md"
                            defaultValue={subTest}
                          />
                        ))}
                    </div>

                    <div className=" pt-2">
                      <div className="flex justify-between">
                        <div className="">
                          <button
                            onClick={() => setSampleModal(false)}
                            className="bg-red-500 text-white px-4 py-2 rounded-md"
                          >
                            Close
                          </button>
                        </div>
                        <div>
                          <button
                            type="submit"
                            className="bg-green-500 text-white px-4 py-2 rounded-md"
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>

                {/* Second Input Field */}
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-20 bg-black"></div>
          </div>
        )}

        <div>
          <div className="absolute inset-0 z-30  overflow-auto top-16 ">
            <form className="p-4" onSubmit={editLabModal} id="addmodal">
              <div className="flex items-center justify-center">
                <div className="flex flex-col bg-white rounded-lg shadow-md  sm:p-6 max-w-full sm:max-w-7xl mx-2">
                  <h2 class="text-xl mb-4 text-center p-3">update test</h2>

                  <div className="md:flex p-1 gap-3.5">
                    <div
                      {...getRootProps()}
                      className="flex flex-col w-52 mt-24 md:mt-0 h-16 justify-center items-center border border-dotted border-gray-300 rounded-[15px] "
                      // onClick={(e) => e.stopPropagation}
                    >
                      <input {...getInputProps()} />

                      {!showImage && (
                        <img
                          className="cover"
                          height={80}
                          src={valdata.image}
                          alt="Your Image"
                          sx={{ width: "80%" }}
                        />
                      )}

                      {!showImage ? (
                        <div className="h-16">
                          <p>
                            Drag 'n' drop some files here, or click to select
                            files
                          </p>
                        </div>
                      ) : (
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
                      )}
                    </div>

                    <div className="mt-10 md:mt-0">
                      <div className="mr-4 ">
                        <div class="md:flex flex-row space-x-4">
                          <div class="flex flex-col ">
                            <label
                              for="category"
                              class="text-sm font-medium mt-10 md:mt-0 text-gray-700 mb-2"
                            >
                              Select category
                            </label>
                            <select
                              id="category"
                              name="categoryName"
                              class="rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 p-1"
                            >
                              <option value={incomingCat?._id} selected>
                                {incomingCat?.title}
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
                            {errors.category && (
                              <p className="text-red-500 text-xs">
                                {errors.category}
                              </p>
                            )}
                          </div>
                          <div class="flex flex-col ">
                            <label
                              for="type_of_samples"
                              class="text-sm font-medium text-gray-700 mt-3 md:mt-0 mb-2"
                            >
                              Type of samples
                            </label>
                            <div className="flex align-baseline justify-start gap-3">
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
                                onClick={handleAddSample}
                                class="bg-pink-500  sm:mt-0   text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1  ease-linear transition-all duration-150"
                                type="button"
                              >
                                +
                              </button>
                            </div>
                            <div
                              onClick={() => {
                                setForModalSampleData(samples);
                                console.log("ssssss", forModalSampleData);
                                setSampleModal(true);
                              }}
                              className="flex"
                            >


                              <ul className="mt-2 list-disc p-3">
                                {samples.map((sample, index) => (
                                  <li key={index}>{sample}</li>
                                ))}
                              </ul>

<div className="flex justify-end items-baseline p-4 w-full">
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
        >
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>

</div>
                              
                            </div>
                            {errors.typeSample && (
                              <p className="text-red-500 text-xs">
                                {errors.typeSample}
                              </p>
                            )}
                          </div>
                        </div>
                        <div class="md:flex flex-row space-x-4">
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
                              defaultValue={valdata.name}
                              id="name_of_test"
                              class="rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 p-1"
                              placeholder="Ex: Blood test, Body check..."
                            ></input>
                            {errors.NameOfTest && (
                              <p className="text-red-500 text-xs">
                                {errors.NameOfTest}
                              </p>
                            )}
                          </div>
                          <div class="p-4">
                            <label
                              for="is_recommended"
                              class="text-sm font-medium text-gray-700 mb-2"
                            >
                              Is Recommended?
                            </label>
                            <input
                              type="checkbox"
                              id="is_recommended"
                              checked={isRecommended}
                              onChange={(e) =>
                                setIsRecommended(e.target.checked)
                              }
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
                            value={TestName}
                            onChange={(e) => {
                              setTestName(e.target.value);
                            }}
                            name="test_or_subtests"
                            id="tests_subtests"
                            class="rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 p-1"
                            placeholder="Add Test name"
                          ></input>
                          {errors.secondTest && (
                            <p className="text-red-500 text-xs">
                              {errors.secondTest}
                            </p>
                          )}

                          <div className="flex gap-x-2.5 ">
                            <div>
                              <button
                                onClick={() => {
                                  setAddSubTestingModal(true);
                                }}
                                type="button"
                                class="inline-flex mt-1 justify-center rounded bg-blue-400 items-center font-bold px-2 py-1 text-sm text-white hover:text-gray-700"
                              >
                                view sub test
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
                                  {setsaveTestDat.map((data, index) => {
                                    return (
                                      <div
                                        onClick={() => {
                                          // console.log("daataa",data);
                                          setSubTestModal(true);
                                          setindex(index);
                                          setForModalTestData(data);
                                          // forEditTest();
                                        }}
                                        className="p-4 m-2 border-2"
                                      >
                                        <div className="flex justify-between gap-4">
                                        <div className="font-semibold ">
                                          test Name
                                        </div>
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
        >
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
                                        </div>
                                        
                                        <div className=" text-center list-disc border-dotted border-2 rounded-sm p-2">
                                          {data.name}
                                        </div>

                                        <div className="font-semibold">
                                          sub test
                                        </div>
                                        <div>
                                          {/* {data?.sub_tests?.map((name) => {
                                            return <div>{name?.name}</div>;
                                          })} */}
                                          <ul className=" list-disc p-2">
                                            {data?.sub_tests?.map(
                                              (sample, index) => {
                                                return (
                                                  <li key={index}>
                                                    {sample?.name}
                                                  </li>
                                                );
                                              }
                                            )}
                                          </ul>
                                        </div>
                                      </div>
                                    );
                                  })}
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
                        {errors.subtest && (
                          <p className="text-red-500 text-xs">
                            {errors.subtest}
                          </p>
                        )}

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
                              defaultValue={valdata.testing_time}
                              name="report_time"
                              placeholder="Set this time"
                              id="report_time"
                              class="rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 p-1"
                            ></input>
                            {errors.testTime && (
                              <p className="text-red-500 text-xs">
                                {errors.testTime}
                              </p>
                            )}
                          </div>
                        </div>
                        <div class=" sm:flex  space-x-4">
                          <div class="flex flex-col">
                            <label
                              for="rate"
                              class="text-sm font-medium text-gray-700 mt-2"
                            >
                              Rate & offer rate
                            </label>
                            <input
                              placeholder="Set rate"
                              type="number"
                              defaultValue={valdata.price}
                              name="rate"
                              id="rate"
                              class="rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 p-1"
                            ></input>
                            {errors.rate && (
                              <p className="text-red-500 text-xs">
                                {errors.rate}
                              </p>
                            )}
                          </div>

                          <div class="flex flex-col">
                            <label
                              for="rate"
                              class="text-sm font-medium text-gray-700 mt-2"
                            >
                              daily text limit
                            </label>
                            <input
                              type="number"
                              id="rate"
                              defaultValue={valdata.daily_test_limit}
                              name="daily_test_limit"
                              className="rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 p-1"
                              placeholder="Daily test limit"
                            />
                            {errors.daily_test_limit && (
                              <p className="text-red-500 text-xs">
                                {errors.daily_test_limit}
                              </p>
                            )}
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

          <div className="opacity-25 fixed inset-0 z-20 bg-black"></div>
        </div>
      </>
    </div>
  );
}

export default EditLabModal;
