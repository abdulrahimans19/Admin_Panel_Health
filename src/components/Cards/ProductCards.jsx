import React from "react";

export default function ProductCard({ data, callback }) {
  return (
    <div className="max-w-sm mx-auto bg-white shadow-lg rounded-md overflow-hidden relative ">
      {/* Image in the center */}
      <img
        className="object-cover object-center w-full h-40"
        src={data?.image}
        alt="Your Image"
      />

      {/* Name below the image */}
      <div className="p-4">
        <p className="text-lg font-semibold text-gray-800">{data?.name}</p>
      </div>

      {/* Pencil icon at the top right corner */}
     
     <div>

        
     </div>
     <div className="top-0 absolute p-2">

     <label class="relative inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" class="sr-only peer"/>
  <div class="w-6 h-3 bg-red-500 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[0px] after:start-[0px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-3 after:w-3 after:transition-all  peer-checked:bg-green-600"></div>
  <span class="ms-3 text-sm font-medium text-gray-900 "></span>
</label>
     </div>
     
      <div
        onClick={() => {
          callback(data);
        }}
        className=" top-0 right-0 p-4 absolute"
      >
        


        <svg
          class="cursor-pointer feather feather-edit"
          fill="none"
          height="24"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          width="24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
        </svg>
      </div>
    </div>
  );
}
