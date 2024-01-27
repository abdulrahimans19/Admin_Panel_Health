import React, { useState, useRef } from "react";

const InputField = ({ label, type, placeholder }) => (
  <label className="text-[13px] font-normal font-['Roboto Flex']">
    <div className="label">
      <span className="label-text">{label}</span>
    </div>
    {type === "select" ? (
      <select className="w-full sm:w-[250px] bg-gray-400 rounded-[10px] border-gray-400 p-2 px-3">
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>
    ) : (
      <input
        type={type}
        placeholder={placeholder}
        className="w-full sm:w-[250px] bg-gray-400 rounded-[10px] border-gray border-opacity-10 p-2 px-3"
      />
    )}
    <div className="label"></div>
  </label>
);

const SignupProfile = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const clipboardData = e.clipboardData || window.clipboardData;
    const file = clipboardData.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const openFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSvgClick = (e) => {
    e.stopPropagation(); // Prevent the click event from reaching the parent container
    openFileInput(); // Trigger the drag-and-drop functionality
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="w-full sm:w-[80%] h-full sm:h-[90%] max-w-[800px] max-h-[600px] bg-[#1C3A68] rounded-lg border border-white border-opacity-10 backdrop-blur-[39.60px] relative flex flex-col sm:flex-row">
        {/* Left Column with Tailwind CSS styles for drag-and-drop */}
        <div
          className="flex-1 flex flex-col items-center justify-center bg-[#1C3A68] text-white"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onPaste={handlePaste}
        >
          <div className="cursor-pointer" onClick={handleSvgClick}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-40 w-40 fill-white stroke-indigo-500 border-2 border-white border-opacity-30 rounded-[5px] p-1"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <input
            id="upload"
            type="file"
            className="hidden"
            onChange={handleFileSelect}
            ref={fileInputRef}
          />
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Selected"
              className="mx-auto mt-4 rounded-full max-w-[150px] max-h-[150px]"
            />
          )}
        </div>

        {/* Second Column with input fields row-wise */}
        <div className="flex-1 mt-8 sm:mt-0 bg-[#1C3A68] text-white">
          <h2 className="text-2xl font-bold mb-4 sm:text-3xl mt-10">
            Profile Info
          </h2>
          <p className="text-gray-300 mb-4 sm:text-lg">
            Fill in the data for your profile. It will take a couple of minutes.
          </p>
          <div className="p-5">
            <InputField label="Full Name" type="text" placeholder="Type here" />
            <InputField label="Gender" type="select" />
            <InputField label="Country" type="text" placeholder="Type here" />
            <InputField label="Country" type="text" placeholder="Type here" />
            <InputField
              label="Country"
              type="text"
              placeholder="Type here"
              isLast={true}
            />
          </div>
        </div>

        {/* Third Column with input fields and buttons */}
        <div className="flex-1 mt-10 p-7 sm:order-1 bg-[#1C3A68] text-white">
          <div className="mt-20">
            <InputField
              label="Professional Category"
              type="text"
              placeholder="Type here"
            />
            <InputField
              label="Experience"
              type="text"
              placeholder="Type here"
            />
            <InputField label="Upload Certificate" type="file" />
            <InputField
              label="Consultation Fee"
              type="text"
              placeholder="Type here"
            />
            <InputField
              label="Description"
              type="text"
              placeholder="Type here"
            />
          </div>
          <div className="flex items-center mb-4 mt-6">
            <input
              type="checkbox"
              id="agreeCheckbox"
              className="form-checkbox h-5 w-5 text-indigo-600"
            />
            <label
              htmlFor="agreeCheckbox"
              className="ml-2 text-gray-300 cursor-pointer"
            >
              I agree with terms of use
            </label>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              onClick={""}
            >
              Back
            </button>
            <button
              type="button"
              class="text-black bg-white  focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-10 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupProfile;
