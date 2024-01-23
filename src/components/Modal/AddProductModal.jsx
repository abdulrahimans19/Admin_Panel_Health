// Modal.js
import React, { useState } from 'react';

const ProductModal = ({  setAddProductModal }) => {
  const [image, setImage] = useState(null);
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [input3, setInput3] = useState('');

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle form submission logic here
    console.log('Image:', image);
    console.log('Input 1:', input1);
    console.log('Input 2:', input2);
    console.log('Input 3:', input3);

    // Reset form fields
    setImage(null);
    setInput1('');
    setInput2('');
    setInput3('');

    // Close the modal

  };

  return (
    <>
      (
        <div className="fixed inset-0 w -full flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg max-w-md">
           <div className='text-xl p-4 font-semibold'>
            Add Product
           </div>


           <div className='flex gap-4'>

           {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"> */}
<div>

<div class="rounded-md border border-indigo-500 bg-gray-50 p-4 shadow-md w-36">
    <label for="upload" class="flex flex-col items-center gap-2 cursor-pointer">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 fill-white stroke-indigo-500" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <span class="text-gray-600 font-medium">Upload file</span>
    </label>
    <input id="upload" type="file" class="hidden" />
</div>
</div>
<div>

<div>
  Product Name
</div>
<input
              type="text"
             
              className="mt-1 p-2 border rounded-md w-full"
     
            />

<div className='mt-4'>
 Brand:
</div>
<input
              type="text"
             
              className="mt-1 p-2 border rounded-md w-full"
     
            />
<label for="message" class="block mt-4 text-sm font-medium text-gray-900">Description</label>
<textarea id="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your thoughts here..."></textarea>



<div className=''>
<label for="message" class="block  mt-4 text-sm font-medium text-gray-900">Category</label>

<select
          id="dropdown"
          name="dropdown"
          className="mt-1 p-2 border rounded-md w-full"
          // onChange={handleOptionChange}
        >
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>

<label for="message" class="block  mt-4 text-sm font-medium text-gray-900">SubCategory</label>

        <select
          id="dropdown"
          name="dropdown"
          className="mt-1 p-2 border rounded-md w-full"
          // onChange={handleOptionChange}
        >
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </select>
</div>

</div>





           </div>
           <div className="flex justify-end m-5">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
            // onClick={handleSubmit}
          >
            Submit
          </button>
          <button
            className="ml-2 text-gray-500 hover:text-gray-700 px-4 py-2 rounded-md"
            onClick={()=>{
              setAddProductModal(false)



            }}
          >
            Cancel
          </button>
        </div>
          </div>
        </div>
      )
    </>
  );
};

export default ProductModal;
