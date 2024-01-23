import React, { useState } from 'react'

    const AddSubTestingModal = ({ onClose }) => {
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
    <div>
      
        {subCategories.map((subCategory, index) => (
          <div key={index} className="">
           
            <input
              type="text"
              id={`inputField${index}`}
              name={`inputField${index}`}
              placeholder={`option ${index+1 }`}
              className="mt-1 p-2 border rounded-md w-full"
              onChange={(e) => handleInputChange(index, e)}
            />
      
          </div>
        ))}

        <button className='text-gray-400 p-3 cursor-pointer' onClick={handleAddField}>
          +
        </button>

      </div>
  );
};

export default AddSubTestingModal
