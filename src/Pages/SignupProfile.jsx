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
  const [isAgreed, setIsAgreed] = useState(false);

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
  const handleCheckboxChange = () => {
    setIsAgreed(!isAgreed); // Toggle the state of isAgreed
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
        consulting_fee: parseInt(formData.consulting_fee, 10),
        certificate:
          "https://marketplace.canva.com/EAFNlUJs5g4/2/0/1600w/canva-white-simple-certificate-of-appreciation-Fcz7KkZ5YaU.jpg",
        category_id: "658156b7f418ada4a7a8f7ff",
        image:
          "https://www.citizenshospitals.com/static/uploads/130789a4-764e-4ee3-88fe-68f9278452d6-1692966652977.png",
        experience: parseInt(formData.experience, 10),
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
     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Profile Info</h3>
          <div className="mt-2 px-7 py-3">
            <p className="text-sm text-gray-500">Fill in the data for your profile. It will take a couple of minutes.</p>
            <form className="mt-8 space-y-6">
              <input type="text" name="full-name" className="w-full p-2 border border-gray-300 rounded mt-1" placeholder="Enter full name" />
              <select name="gender" className="w-full p-2 border border-gray-300 rounded mt-1">
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <input type="text" name="country" className="w-full p-2 border border-gray-300 rounded mt-1" placeholder="Enter your country" />
              <input type="text" name="profession" className="w-full p-2 border border-gray-300 rounded mt-1" placeholder="Enter your profession" />
              <input type="text" name="experience" className="w-full p-2 border border-gray-300 rounded mt-1" placeholder="Enter your experience" />
              <input type="file" name="certificate" className="w-full p-2 border border-gray-300 rounded mt-1" />
              <input type="text" name="consultation-fee" className="w-full p-2 border border-gray-300 rounded mt-1" placeholder="Set rate" />
              <textarea name="description" className="w-full p-2 border border-gray-300 rounded mt-1" placeholder="Description"></textarea>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input id="terms" name="terms" type="checkbox" className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded" />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-medium text-gray-700">I agree with terms of use</label>
                </div>
              </div>
              <button type="submit" className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Register
              </button>
            </form>
          </div>
        </div>
        <div className="items-center px-4 py-3">
          <button id="ok-btn" onClick={onClose} className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300">
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignupProfile;
