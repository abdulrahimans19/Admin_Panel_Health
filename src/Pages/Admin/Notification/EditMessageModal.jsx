import React from "react";

function EditMessageModal({setEditMessageModal}) {

    
  return (
    <div>
      {/* <!-- Modal backdrop --> */}
      <div
        class="z-50 absolute inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
        id="my-modal"
      ></div>

      {/* <!-- Modal --> */}
      <div class="relative z-50 top-20 mx-auto p-5 border shadow-lg rounded-md max-w-md bg-white">
        {/* <!-- Modal header --> */}
        <div class="flex justify-between items-center pb-3">
          <p class="text-2xl font-bold">Send this notification?</p>
          <div
          onClick={()=>{
            setEditMessageModal(false)
          }}
           class="modal-close cursor-pointer z-50">
            <svg
              class="fill-current text-black"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
            >
              <path d="M12.45 11.75L11.25 12.95L9 10.7L6.75 12.95L5.55 11.75L7.8 9.5L5.55 7.25L6.75 6.05L9 8.3L11.25 6.05L12.45 7.25L10.2 9.5L12.45 11.75Z" />
            </svg>
          </div>
        </div>

        {/* <!-- Modal body --> */}
        <div class="mb-4">
          <p>
            You can edit or confirm the action to send this notification to all
            users
          </p>
        </div>

        {/* <!-- Modal footer --> */}
        <div class="flex justify-end pt-2">
          <button 
          onClick={()=>{setEditMessageModal(false)}} class="px-4 bg-transparent p-3 rounded-lg text-blue-500 hover:bg-gray-100 hover:text-blue-400 mr-2">
            Edit
          </button>
          <button
          onClick={()=>{setEditMessageModal(false)}} 
          class="px-4 bg-blue-500 p-3 rounded-lg text-white hover:bg-blue-400">
            Confirm
          </button>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </div>
  );
}

export default EditMessageModal;
