import React, { useState, useRef, useEffect } from "react";
import {
  MainDoctorCategories,
  SignupUserdata,
  UploadImageUrl,
  uploadToAws,
} from "../API/ApiCall";
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
  const [isAgreed, setIsAgreed] = useState(false);
  const [docCateogries, setDocCateogries] = useState([]);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name) newErrors.name = "Please enter your name.";
    if (!formData.gender) newErrors.gender = "Please select your gender.";
    if (!formData.country) newErrors.country = "Please add your country.";
    if (!formData.category_id) newErrors.category_id = "Choose your category.";
    if (!formData.experience) newErrors.experience = "Add your experience.";
    if (!formData.certificate)
      newErrors.certificate = "Upload your certificate.";
    if (!formData.consulting_fee)
      newErrors.consulting_fee = "Please enter your consultation fee.";
    if (!formData.description)
      newErrors.description = "Briefly enter about you.";
    if (!selectedImage) newErrors.image = "Please upload an image.";
    setErrors(newErrors);

    return Object.keys(newErrors).length === 0; // Form is valid if there are no errors
  };

  const [profileImagedata, setProfileImage] = useState();
  const handleFileSelect = (e) => {
    const file = e.target.files[0];

    setProfileImage(file);

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
  const handleCheckboxChange = () => {
    setIsAgreed(!isAgreed); // Toggle the state of isAgreed
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      const imageUrl = await uploadImageToAws();

      let profileImage;
      let GetDocumenet;
      await UploadImageUrl().then((data) => {
        uploadToAws(data.data.presignedUrl, profileImagedata).then(
          (data) => {}
        );
        profileImage = data.data.publicUrl;
      });

      await UploadImageUrl().then((data) => {
        uploadToAws(data.data.presignedUrl, formData.certificate).then(
          (data) => {}
        );
        GetDocumenet = data.data.publicUrl;
      });

      if (profileImage && GetDocumenet) {
        const userData = {
          email,
          password,
          name: formData.name,
          description: formData.description,
          gender: formData.gender,
          consulting_fee: parseInt(formData.consulting_fee, 10),
          certificate: GetDocumenet,
          image: profileImage,
          experience: parseInt(formData.experience, 10),
          category_id: formData.category_id,
        };

        const response = await SignupUserdata(userData);

        navigate("/otp", { state: { email } });
      }
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };
  const getDocCategory = async () => {
    try {
      const response = await MainDoctorCategories();

      if (response && response.data && response.data.data) {
        const categories = response.data.data.mainCategories || [];
        setDocCateogries(categories);
      }
    } catch (err) {}
  };

  useEffect(() => {
    getDocCategory();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className="fixed inset-0 flex items-center justify-center overflow-auto md:p-5">
        <div className="w-full md:max-w-[800px] h-full md:max-h-[600px] bg-[#1C3A68] rounded-lg border border-white border-opacity-10 backdrop-blur-[39.60px] relative flex flex-col  lg:flex-row overflow-auto">
          {/* Close Button at the Top Right */}

          <button
            type="button"
            onClick={() => onClose()}
            className="absolute top-0 right-0 m-2 border-2 border-white border-opacity-40 rounded-[10px] p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <div
            className="flex-1 flex flex-col items-center justify-center p-4"
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onPaste={handlePaste}
          >
            {/* Conditionally render the SVG or the selected image */}
            {!selectedImage ? (
              <div className="cursor-pointer" onClick={handleSvgClick}>
                {errors.image && <p className="text-red-500">{errors.image}</p>}

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-24 w-24 md:h-40 md:w-40 fill-white stroke-indigo-500 border-2 border-white border-opacity-40 rounded-[20px] p-4 md:p-8"
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
            ) : (
              <div className="relative w-40 h-40">
                <img
                  src={selectedImage}
                  alt="Selected"
                  className="absolute inset-0 w-full h-full object-cover border-2 border-white border-opacity-40 rounded-[20px]"
                />
              </div>
            )}
            <input
              id="upload"
              type="file"
              className="hidden"
              onChange={handleFileSelect}
              ref={fileInputRef}
            />
          </div>

          {/* Input fields container */}
          <div className="flex-1 justify-center bg-[#1C3A68] text-white p-4 ">
            <div className="flex  justify-center w-full">
              <div className="">
                <div className="">
                  <h2 className="text-xl md:text-2xl font-bold mb-4">
                    Profile Info
                  </h2>
                  <p className="text-gray-300 mb-4 text-sm md:text-lg">
                    Fill in the data for your profile. It will take a couple of
                    minutes.
                  </p>
                </div>
                <div className=" sm:flex gap-5">
                  <div className="">
                    <label className="text-[13px] font-normal font-['Roboto Flex'] ">
                      <div className="label">
                        <span className="label-text">Full Name</span>
                        {errors.name && (
                          <p className="text-red-500">{errors.name}</p>
                        )}
                      </div>
                      <input
                        type="text"
                        placeholder="Enter full name"
                        className="w-full sm:w-[250px] bg-gray-400 rounded-[10px] border-gray border-opacity-10 p-2 px-3 placeholder-white my-2" // Add my-2 to add margin on top and bottom
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />

                      <div className="label"></div>
                    </label>

                    <label className="text-[13px] font-normal font-['Roboto Flex'] ">
                      <div className="label">
                        <span className="label-text">Gender</span>
                        {errors.gender && (
                          <p className="text-red-500">{errors.gender}</p>
                        )}
                      </div>
                      <select
                        className="w-full sm:w-[250px] bg-gray-400 rounded-[10px] border-gray-400 p-2 px-3 my-2"
                        onChange={(e) =>
                          setFormData({ ...formData, gender: e.target.value })
                        }
                        value={formData.gender} // Added to control the selected value
                      >
                        <option value="">Select Gender</option>{" "}
                        {/* Default option */}
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </label>

                    <label className="text-[13px] font-normal font-['Roboto Flex'] ">
                      <div className="label">
                        <span className="label-text">Country</span>
                        {errors.country && (
                          <p className="text-red-500">{errors.country}</p>
                        )}
                      </div>
                      <input
                        type="text"
                        placeholder="Enter your country"
                        className="w-full sm:w-[250px] bg-gray-400 rounded-[10px] border-gray border-opacity-10 p-2 px-3 placeholder-white my-2" // Add my-2 to add margin on top and bottom
                        onChange={(e) =>
                          setFormData({ ...formData, country: e.target.value })
                        }
                      />

                      <div className="label"></div>
                    </label>
                    <label className="text-[13px] font-normal font-['Roboto Flex'] ">
                      <div className="label">
                        <span className="label-text">
                          Professional Category
                        </span>
                        {errors.category_id && (
                          <p className="text-red-500">{errors.category_id}</p>
                        )}
                      </div>
                      <select
                        id="categories"
                        className="w-full sm:w-[250px] bg-gray-400 rounded-[10px] border-gray border-opacity-10 p-2 px-3 placeholder-white my-2"
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            category_id: e.target.value,
                          })
                        }
                        value={formData.category_id}
                      >
                        <option value="">Choose a Category</option>
                        {docCateogries.map((category) => (
                          <option key={category._id} value={category._id}>
                            {category.title}
                          </option>
                        ))}
                      </select>

                      <div className="label"></div>
                    </label>

                    <label className="text-[13px] font-normal font-['Roboto Flex'] ">
                      <div className="label">
                        <span className="label-text">Experience</span>
                        {errors.experience && (
                          <p className="text-red-500">{errors.experience}</p>
                        )}
                      </div>
                      <input
                        type="number"
                        placeholder="Enter your experience"
                        className="w-full sm:w-[250px] bg-gray-400 rounded-[10px] border-gray border-opacity-10 p-2 px-3 placeholder-white my-2" // Add my-2 to add margin on top and bottom
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            experience: e.target.value,
                          })
                        }
                      />

                      <div className="label"></div>
                    </label>
                  </div>
                  <div className="">
                    <label className="text-[13px] font-normal font-['Roboto Flex'] ">
                      <div className="label">
                        <span className="label-text">Upload Certificate</span>
                        {errors.certificate && (
                          <p className="text-red-500">{errors.certificate}</p>
                        )}
                      </div>
                      <input
                        type="file"
                        className="w-full sm:w-[250px] bg-gray-400 rounded-[10px] border-gray border-opacity-10 p-2 px-3 placeholder-white my-2" // Add my-2 to add margin on top and bottom
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            certificate: e.target.files[0],
                          })
                        }
                      />

                      <div className="label"></div>
                    </label>

                    <label className="text-[13px] font-normal font-['Roboto Flex'] ">
                      <div className="label">
                        <span className="label-text">Consultation Fee</span>
                        {errors.consulting_fee && (
                          <p className="text-red-500">
                            {errors.consulting_fee}
                          </p>
                        )}
                      </div>
                      <input
                        type="number"
                        placeholder="Set rate"
                        className="w-full sm:w-[250px] bg-gray-400 rounded-[10px] border-gray border-opacity-10 p-2 px-3 placeholder-white my-2" // Add my-2 to add margin on top and bottom
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            consulting_fee: e.target.value,
                          })
                        }
                      />

                      <div className="label"></div>
                    </label>
                    <label className="text-[13px] font-normal font-['Roboto Flex'] ">
                      <div className="label">
                        <span className="label-text">Description</span>
                        {errors.description && (
                          <p className="text-red-500">{errors.description}</p>
                        )}
                      </div>
                      <textarea
                        placeholder="Tell us about yourself"
                        className="w-full sm:w-[250px] bg-gray-400 rounded-[10px] border-gray border-opacity-10 p-2 px-3 h-[70px] resize-none my-2" // Add my-2 to add margin on top and bottom
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            description: e.target.value,
                          })
                        }
                      />

                      <div className="label"></div>
                    </label>
                  </div>
                  {/* Form fields go here */}
                  {/* Use flex or grid layout with gap for spacing, adjust text and input sizes for responsiveness */}
                </div>
                <div className="flex items-center mb-4 mt-6">
                  <input
                    type="checkbox"
                    id="agreeCheckbox"
                    className="form-checkbox h-5 w-5 text-indigo-600"
                    onChange={handleCheckboxChange} // Attach the onChange handler
                    checked={isAgreed} // Control the checkbox state
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
                    type="submit"
                    className="text-black w-full text-center flex bg-white focus:ring-4 focus:outline-none focus:ring-[#3b5998]/50 font-medium rounded-lg text-sm px-20 py-2.5  justify-center items-center dark:focus:ring-[#3b5998]/55 me-2 mb-2"
                    disabled={!isAgreed} // Disable button based on isAgreed state
                  >
                    Register
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Buttons and agreement section */}

          <div className="flex-1 bg-[#1C3A68] text-white p-4">
            <div className="space-y-4">{/* Upload and other fields */}</div>
            <div className="mt-4">
              {/* Checkbox and Register button */}

              {/* Adjust sizes and margins for responsiveness */}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignupProfile;
