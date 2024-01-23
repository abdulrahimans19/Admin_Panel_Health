// src/Modal.js

import React, { useState } from 'react';

const AddSubCategoryModal = ({ onClose }) => {
  const [subCategories, setSubCategories] = useState([{ selectedOption: '', inputValue: '' }]);

  const handleOptionChange = (e) => {
    const selectedOption = e.target.value;
    setSubCategories([{ selectedOption, inputValue: '' }]);
  };

  const handleInputChange = (index, e) => {
    const updatedSubCategories = [...subCategories];
    updatedSubCategories[index].inputValue = e.target.value;
    setSubCategories(updatedSubCategories);
  };

  const handleAddField = () => {
    setSubCategories([...subCategories, { selectedOption: '', inputValue: '' }]);
  };

  const handleRemoveField = (index) => {
    const updatedSubCategories = [...subCategories];
    updatedSubCategories.splice(index, 1);
    setSubCategories(updatedSubCategories);
  };

  const handleSubmit = () => {
    // Handle the form submission logic here
    console.log('SubCategories:', subCategories);

    // Close the modal
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-black opacity-50 fixed inset-0"></div>
      <div className="bg-white p-8 max-w-md w-full rounded-lg shadow-lg z-50">
        <h2 className="text-2xl font-bold mb-4">Add Subcategory</h2>

        <label htmlFor="dropdown" className="block text-sm font-medium text-gray-700">
          Select category:
        </label>
        <select
          id="dropdown"
          name="dropdown"
          className="mt-1 p-2 border rounded-md w-full"
          onChange={handleOptionChange}
        >
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
        <label  className="block text-sm font-medium text-gray-700 mt-2">
              Sub category:
            </label>
        {subCategories.map((subCategory, index) => (
          <div key={index} className="mb-4">
           
            <input
              type="text"
              id={`inputField${index}`}
              name={`inputField${index}`}
              className="mt-1 p-2 border rounded-md w-full"
              onChange={(e) => handleInputChange(index, e)}
            />
      
          </div>
        ))}

        <div className='text-gray-400 p-3 cursor-pointer' onClick={handleAddField}>
          + add
        </div>

        <div className="flex justify-end">
          <button
            className="bg-green-200 text-green-500 px-4 py-2 rounded-md hover:bg-green-300"
            onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            className="ml-2 text-red-500 bg-red-200  px-4 py-2 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddSubCategoryModal;
