import React, { useState } from 'react'
import { useDispatch } from 'react-redux';

    const AddSubTestingModal = ({ onClose,setSubCategories,subCategories,setnumberofField,numberofField}) => {

  
      
  const disptach=useDispatch()
        const handleOptionChange = (e) => {
          const selectedOption = e.target.value;
          setSubCategories([...subCategories,{ name:selectedOption }]);
        };
      
        const handleInputChange = (index, e) => {
          const updatedSubCategories = [...subCategories];
          updatedSubCategories[index] ={ name:e.target.value};
          setSubCategories(updatedSubCategories);
          console.log(subCategories);
        };
      
        const handleAddField = () => {
          
          setnumberofField([...numberofField, {  inputValue: '' }]);
        };
      
        const handleRemoveField = (index) => {
          // console.log("index to delete",index);
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
      
        {numberofField.map((subCategory, index) => (
          <div key={index} className="flex">
           
            
            <div>
            <input
              type="text"
              id={`inputField${index}`}
              name={`inputField${index}`}
              placeholder={`option ${index+1 }`}
              className="mt-1 p-1 border rounded-md w-full"
              onChange={(e) => handleInputChange(index, e)}
            />
            </div>
            <div>
              <button
              className='p-2'
              // onClick={handleRemoveField(index)}
              >x</button>
            </div>
            
      
          </div>
        ))}

        <button type='button' className='text-blue-600 p-3 cursor-pointer' onClick={handleAddField}>
          +
        </button>

      </div>
  );
};

export default AddSubTestingModal
