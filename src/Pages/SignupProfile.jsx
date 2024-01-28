import React, { useState, useRef } from "react";
import { SignupUserdata } from "../API/ApiCall";
import { useNavigate } from "react-router-dom";

const SignupProfile = ({ email, password, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
    country: "",
    description: "",
    consulting_fee: "",
    certificate: null,
    category_id: "",
    experience: "",
    image: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const fileInputRef = useRef(null);

  const navigate = useNavigate();

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
    e.stopPropagation();
    openFileInput();
  };

  const uploadImageToAws = async () => {
    // Placeholder for actual implementation (e.g., upload to AWS)
    // For now, just return a random string as the image URL
    return Math.random().toString(36).substring(7);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const imageUrl = await uploadImageToAws();

      const userData = {
        email,
        password,
        name: formData.name,
        description: formData.description,
        gender: formData.gender,
        consulting_fee: 888,
        certificate:
          "https://marketplace.canva.com/EAFNlUJs5g4/2/0/1600w/canva-white-simple-certificate-of-appreciation-Fcz7KkZ5YaU.jpg",
        category_id: "658156b7f418ada4a7a8f7ff",
        image:
          "https://www.citizenshospitals.com/static/uploads/130789a4-764e-4ee3-88fe-68f9278452d6-1692966652977.png",
        experience: 5,
        // Add other form fields here
      };

      console.log("Data to be sent:", userData);

      const response = await SignupUserdata(userData);
      console.log("User registered successfully:", response.data);
      navigate("/otp");
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="fixed inset-0 flex items-center justify-center overflow-hidden">
        <div className="w-full sm:w-[80%] h-full sm:h-[90%] max-w-[800px] max-h-[600px] bg-[#1C3A68] rounded-lg border border-white border-opacity-10 backdrop-blur-[39.60px] relative flex flex-col sm:flex-row overflow-hidden">
          {/* Left Column with Tailwind CSS styles for drag-and-drop */}
          <div
            className="flex-1 flex flex-col items-center mt-[180px]  text-white"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onPaste={handlePaste}
          >
            <div className="cursor-pointer" onClick={handleSvgClick}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-40 w-40 fill-white stroke-indigo-500 border-2 border-white border-opacity-40 rounded-[20px] p-8"
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
                className="mx-auto  rounded-full max-w-[150px] max-h-[150px]"
              />
            )}
          </div>
          {/* Second Column with input fields row-wise */}
          <div className="flex-1  sm:mt-0 bg-[#1C3A68] text-white">
            <h2 className="text-2xl font-bold mb-4 sm:text-3xl mt-7">
              Profile Info
            </h2>
            <p className="text-gray-300 mb-4 sm:text-lg">
              Fill in the data for your profile. It will take a couple of
              minutes.
            </p>
            <div className="p-5">
              <label className="text-[13px] font-normal font-['Roboto Flex'] ">
                <div className="label">
                  <span className="label-text">Full Name</span>
                </div>
                <input
                  type="text"
                  placeholder="Enter full name"
                  className="w-full sm:w-[250px] bg-gray-400 rounded-[10px] border-gray border-opacity-10 p-2 px-3 placeholder-white"
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <div className="label"></div>
              </label>

              <label className="text-[13px] font-normal font-['Roboto Flex'] ">
                <div className="label">
                  <span className="label-text">Gender</span>
                </div>
                <select
                  type="text"
                  className="w-full sm:w-[250px] bg-gray-400 rounded-[10px] border-gray-400 p-2 px-3"
                  onChange={(e) =>
                    setFormData({ ...formData, gender: e.target.value })
                  }
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
                <div className="label"></div>
              </label>

              <label className="text-[13px] font-normal font-['Roboto Flex'] ">
                <div className="label">
                  <span className="label-text">Country</span>
                </div>
                <input
                  type="text"
                  placeholder="Enter your country"
                  className="w-full sm:w-[250px] bg-gray-400 rounded-[10px] border-gray border-opacity-10 p-2 px-3 placeholder-white"
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                />
                <div className="label"></div>
              </label>
              <label className="text-[13px] font-normal font-['Roboto Flex'] ">
                <div className="label">
                  <span className="label-text">Country</span>
                </div>
                <input
                  type="text"
                  placeholder="Enter your country"
                  className="w-full sm:w-[250px] bg-gray-400 rounded-[10px] border-gray border-opacity-10 p-2 px-3 placeholder-white"
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                />
                <div className="label"></div>
              </label>
              <label className="text-[13px] font-normal font-['Roboto Flex'] ">
                <div className="label">
                  <span className="label-text">Country</span>
                </div>
                <input
                  type="text"
                  placeholder="Enter your country"
                  className="w-full sm:w-[250px] bg-gray-400 rounded-[10px] border-gray border-opacity-10 p-2 px-3 placeholder-white"
                  onChange={(e) =>
                    setFormData({ ...formData, country: e.target.value })
                  }
                />
                <div className="label"></div>
              </label>
            </div>
          </div>

          {/* Third Column with input fields and buttons */}
          <div className="flex-1 mt-[50px] p-7 sm:order-1 bg-[#1C3A68] text-white">
            <div className="mt-20">
              <label className="text-[13px] font-normal font-['Roboto Flex'] ">
                <div className="label">
                  <span className="label-text">Professional Category</span>
                </div>
                <input
                  type="text"
                  placeholder="Enter your profession"
                  className="w-full sm:w-[250px] bg-gray-400 rounded-[10px] border-gray border-opacity-10 p-2 px-3 placeholder-white"
                  onChange={(e) =>
                    setFormData({ ...formData, profession: e.target.value })
                  }
                />
                <div className="label"></div>
              </label>

              <label className="text-[13px] font-normal font-['Roboto Flex'] ">
                <div className="label">
                  <span className="label-text">Experience</span>
                </div>
                <input
                  type="number"
                  placeholder="Enter your experience"
                  className="w-full sm:w-[250px] bg-gray-400 rounded-[10px] border-gray border-opacity-10 p-2 px-3 placeholder-white"
                  onChange={(e) =>
                    setFormData({ ...formData, experience: e.target.value })
                  }
                />
                <div className="label"></div>
              </label>

              <label className="text-[13px] font-normal font-['Roboto Flex'] ">
                <div className="label">
                  <span className="label-text">Upload Certificate</span>
                </div>
                <input
                  type="file"
                  className="w-full sm:w-[250px] bg-gray-400 rounded-[10px] border-gray border-opacity-10 p-2 px-3 placeholder-white"
                  onChange={(e) =>
                    setFormData({ ...formData, certificate: e.target.files[0] })
                  }
                />
                <div className="label"></div>
              </label>

              <label className="text-[13px] font-normal font-['Roboto Flex'] ">
                <div className="label">
                  <span className="label-text">Consultation Fee</span>
                </div>
                <input
                  type="number"
                  placeholder="Set rate"
                  className="w-full sm:w-[250px] bg-gray-400 rounded-[10px] border-gray border-opacity-10 p-2 px-3 placeholder-white"
                  onChange={(e) =>
                    setFormData({ ...formData, consulting_fee: e.target.value })
                  }
                />
                <div className="label"></div>
              </label>
              <label className="text-[13px] font-normal font-['Roboto Flex'] ">
                <div className="label">
                  <span className="label-text">Description</span>
                </div>
                <textarea
                  placeholder="Tell us about yourself"
                  className="w-full sm:w-[250px] bg-gray-400 rounded-[10px] border-gray border-opacity-10 p-2 px-3 h-[70px] resize-none "
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
                <div className="label"></div>
              </label>
            </div>
            <div className="flex items-center mb-4 mt-6">
              <input
                type="checkbox"
                id="agreeCheckbox"
                className="form-checkbox h-5 w-5 text-indigo-600"
              />
              <label
                htmlFor="agreeCheckbox"
                className="ml-1 text-gray-300 cursor-pointer"
              >
                I agree with terms of use
              </label>
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                onClick={() => onClose()}
              >
                Back
              </button>
              <button
                type="submit"
                className="text-black bg-white  focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-10 py-2.5 text-center inline-flex items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2"
              >
                Register
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignupProfile;
