import React from "react";

export default function CatCard({ data, callback }) {
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
