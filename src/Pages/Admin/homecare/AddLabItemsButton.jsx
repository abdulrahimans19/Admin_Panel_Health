import React from "react";
import buttonImage from "../../../assets/images/element-plus.png";
import AddImage from "../../../assets/images/addImage.png";
import FilterDropDown from "./FilterDropDown";

function AddLabItemsButton({ text, callback }) {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <div>
      <button
        className="rounded bg-black text-white p-3 items-center flex bg-no-repeat"
        onClick={() => setShowModal(true)}
      >
        <img src={buttonImage} className="w-5 h-5 mr-2 object-contain" alt="" />
        <div className="sm:block">{text}</div>
      </button>
      {showModal && (
        <>
          <div className="fixed inset-0 z-50 overflow-hidden">
            <div className="flex items-center justify-center min-h-screen">
              <div className="bg-white rounded-lg shadow-lg p-8 w-auto relative">
                Create test
                <div className="flex">
                  <div className="flex flex-col justify-center items-center border border-dotted border-gray-300 rounded-[15px] h-400 mr-4">
                    <button>
                      <img
                        src={AddImage}
                        alt=""
                        className="w-20 h-30 mb-2 p-2"
                      />
                    </button>
                    <p className="text-xs text-center p-2">
                      Drag and drop an image here or click to select one
                    </p>
                  </div>

                  <div className="flex flex-col justify-center items-center border border-dotted border-gray-300 rounded-[15px] h-400 mr-4">
                    {/* Content for the second column */}
                    <p>Select category</p>
                    <FilterDropDown/>
                  </div>
                  <div className="flex flex-col justify-center items-center border border-dotted border-gray-300 rounded-[15px] h-400">
                    {/* Content for the third column */}
                    <p>asfasf</p>
                  </div>
                </div>
                <button 
                onClick={()=>{setShowModal(false)}}>
                save
              </button>
              </div>
              
            </div>
          </div>

          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </div>
  );
}

export default AddLabItemsButton;
