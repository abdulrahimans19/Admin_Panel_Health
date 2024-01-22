import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { telemedicine } from "../../../Redux/Features/NavbarSlice";
import CatCard from "../../../components/CatCard";
import lungsimg from "../../../assets/images/3d-fluency-lungs.png";
import heartimg from "../../../assets/images/heart.png";
import ComunButton from "../../../components/Navbar/ComenButton";

export default function TeleMedicine() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(telemedicine());
  }, []);

  const abc = { name: "Pulmonology", image: lungsimg };
  const ab = { name: "Hepatology", image: heartimg };

  const [showModal, setShowModal] = useState(false);

  function editCat() {
    setShowModal(true);
  }
  function addCategory() {
    console.log("Add category in telimedicin");
  }

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h2
            className="font-bold text-lg"
            style={{ fontWeight: 500, fontSize: "32px" }}
          >
            Categories
          </h2>
          <p>2 available categories</p>
        </div>
        <ComunButton text={"Add new categories"} callback={addCategory} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4 mt-6">
        <CatCard data={ab} callback={editCat} />
        <CatCard data={abc} callback={editCat} />
        <CatCard data={abc} callback={editCat} />
        <CatCard data={abc} callback={editCat} />
        <CatCard data={abc} callback={editCat} />
      </div>
      {showModal ? (
        <>
          <div className="p-10 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="rounded-[15px] shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}

                <div className="flex justify-center items-center">
                  {/* leftDive */}
                  <div
                    className="flex justify-center items-center p-5 pt-3 "
                    style={{
                      width: 200,
                    }}
                  >
                    <div className="flex flex-col justify-center items-center border border-dotted border-gray-300 rounded-[15px] h-400">
                      <button>
                        <img src="" alt="" className="w-20 h-30 mb-2 p-2" />
                      </button>
                      <p className=" text-xs text-center  p-2 ">
                        Drag and drop an image here or click to select one
                      </p>
                    </div>
                  </div>
                  {/* rightDiv */}
                  <div
                    className="p-3 pt-5  rounded-lg"
                    style={{
                      width: "300px",
                    }}
                  >
                    <div className="heding flex flex-col pt-5 pr-3">
                      <h6 className="mb-4 font-bold">Category</h6>
                      <p className="text-xs mb-1">Type Category name </p>
                      <input
                        type="text"
                        placeholder="Type name"
                        className="rounded-[10px] pl-3 p-1 border border-gray-300 outline-none "
                      />
                    </div>
                    {/*footer*/}
                    <div className=" flex items-center justify-end pt-4 pb-6 pr-5  rounded-b ">
                      <button
                        style={{ backgroundColor: "#FF8888", color: "#FF0B0B" }}
                        className="text-xs background-transparent p-2 pl-7 pr-7 outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 rounded"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Close
                      </button>
                      <button
                        style={{ backgroundColor: "#AAFFCC", color: "#41945D" }}
                        className="text-xs p-2 pl-7 pr-7 rounded shadow hover:shadow-lg outline-none focus:outline-none  mb-1 ease-linear transition-all duration-150"
                        type="button"
                        onClick={() => setShowModal(false)}
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </div>
  );
}
