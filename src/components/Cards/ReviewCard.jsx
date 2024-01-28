import React from 'react'

export default function ReviewCard({data,callback,viewCatInfo}) {
  return (
    <div className="w-44  mx-auto bg-white shadow-lg rounded-md overflow-hidden relative  ">

    <div 
    onClick={()=>
    {
      viewCatInfo(data)
    }}
    className="flex  justify-center p-3">
      <img
        className="object-cover object-center p-4  max-h-40 "
        src={data?.image}
        alt="Your Image"
      />
    </div>

    {/* Name below the image */}
    <div className="p-4">
      <p className="text-lg  font-semibold text-gray-800">
        {data?.name} 
      </p>
    </div>

    {/* Pencil icon at the top right corner */}

    <div></div>
    {/* <div className="top-0 absolute p-2">

   <label class="relative inline-flex items-center cursor-pointer">
<input type="checkbox" value="" class="sr-only peer"/>
<div class="w-6 h-3 bg-red-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[0px] after:start-[0px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all  peer-checked:bg-green-600"></div>
<span class="ms-3 text-sm font-medium text-gray-900 "></span>
</label>
   </div> */}

    <div
      onClick={() => {
        // isShowModal();
        callback(data);
      }}
      className=" top-0 right-0 p-4 absolute"
    >
       <div>
                  <span className="text-yellow-500 text-3xl ">
                    {"\u2605".repeat(1)}
                  </span>
              <span className='text-xl'>{data.averageRating}</span>
                </div>



    </div>
  </div>
  )
}
