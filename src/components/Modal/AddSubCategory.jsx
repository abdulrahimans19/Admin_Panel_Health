// src/Modal.js

import React, { useState } from "react";
import { createSubCategory } from "../../API/ApiCall";

const AddSubCategoryModal = ({ onClose, displayData }) => {
  const [subCategories, setSubCategories] = useState();
  const [subCatName, setSubCatName] = useState("");
  const handleOptionChange = (e) => {
    const selectedOption = e.target.value;
    setSubCategories(selectedOption);
  };
  const [errors, setErrors] = useState({});
  
  const validate = () => {
    let tempErrors = {};
    tempErrors.subCategories = subCategories ? "" : "Main category is required";
    tempErrors.subCatName = subCatName ? "" : "Subcategory name is required";
    setErrors(tempErrors);

    return Object.values(tempErrors).every(x => x === "");
  };
  const handleSubmit = () => {
    // Handle the form submission logic here
    console.log(subCatName);
    console.log("SubCategories:", subCategories);
    console.log();
    if (!validate()) return;
    // Close the modal
    const wholedata = {
      title: subCatName,
      main_category_id: subCategories,
    };
    createSubCategory(wholedata)
      .then((data) => {
        onClose();
      })
      .catch((err) => {
        console.log(err);
        onClose();
        
      });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-black opacity-50 fixed inset-0"></div>
      <div className="bg-white p-8 max-w-md w-full rounded-lg shadow-lg z-50">
        <h2 className="text-2xl font-bold mb-4">Add Subcategory</h2>

        <label
          htmlFor="dropdown"
          className="block text-sm font-medium text-gray-700"
        >
          Select category:
        </label>
        <select
          id="dropdown"
          name="dropdown"
          className="mt-1 p-2 border rounded-md w-full"
          onChange={handleOptionChange}
        >
           <option selected  disabled>select Category</option>
          {displayData.map((data) => {
            return <option value={data._id}>{data.title}</option>;
          })}
        </select>
        {errors.subCategories && <p className="text-red-500 text-xs">{errors.subCategories}</p>}
        
        <label className="block text-sm font-medium text-gray-700 mt-2">
          Sub category:
        </label>
        {/* {subCategories.map((subCategory, index) => (
          <div key={index} className="mb-4">
           
            <input
              type="text"
              id={`inputField${index}`}
              name={`inputField${index}`}
              className="mt-1 p-2 border rounded-md w-full"
              onChange={(e) => handleInputChange(index, e)}
            />
      
          </div>
        ))} */}
        <input
          type="text"
          name="subcat"
          onChange={(e) => {
            setSubCatName(e.target.value);
          }}
          className="mt-1 p-2 border rounded-md w-full"
          // onChange={(e) => handleInputChange(index, e)}
        />
 {errors.subCatName && <p className="text-red-500 text-xs">{errors.subCatName}</p>}

        <div className="flex justify-end mt-3">
          <button
            className="bg-green-200 text-green-500 px-4 py-2 rounded-md hover:bg-green-300"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            className="ml-2 text-red-500 bg-red-200  px-4 py-2 rounded-md"
            onClick={() => {
              onClose();
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSubCategoryModal;
