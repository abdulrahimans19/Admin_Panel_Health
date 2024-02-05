import React, { useRef, useState } from "react";
import buttonImage from "../../assets/images/element-plus.png";
import AddImage from "../../assets/images/addImage.png";

export default function AddCategoryModal({ showModal, isShowModal, callback }) {
  const fileInputRef = useRef(null);
  const [catImg, setCatImg] = useState();
  const [formData, setFormData] = useState({
    catName: "",
    dscrtion: "",
  });

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];

    if (selectedFile) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setCatImg(reader.result); // set the base64-encoded image data to state
      };

      reader.readAsDataURL(selectedFile);
    }

    fileInputRef.current.value = null;
  };

  function AddCat(e) {
    e.preventDefault();
  }

  return (
    <div>
      {showModal ? (
        <div className="container ">
          <div className="pr-3 pl-3 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="container">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}

                <form onSubmit={AddCat} className="max-w-screen-sm mx-auto">
                  <div className=" rounded-[15px] shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    {/*header*/}

                    <div className=" flex justify-center items-center">
                      {/* leftDive */}
                      <div
                        className="flex justify-center items-center p-5 pt-3 "
                        style={{
                          width: 200,
                        }}
                      >
                        <div className="flex flex-col justify-center items-center border border-dotted border-gray-300 rounded-[15px] h-400">
                          <div>
                            <img
                              src={catImg ? catImg : AddImage}
                              alt=""
                              className="w-30 h-50 mb-2 p-2"
                              onClick={handleImageClick}
                              style={{ cursor: "pointer" }}
                            />
                            <input
                              type="file"
                              accept="image/*"
                              style={{ display: "none" }}
                              ref={fileInputRef}
                              onChange={handleFileChange}
                            />
                          </div>
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
                            required
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                catName: e.target.value,
                              })
                            }
                            type="text"
                            placeholder="Type name"
                            className="rounded-[10px] pl-3 p-1 border border-gray-300 outline-none "
                          />
                        </div>
                        <div className="heding flex flex-col pt-2 pr-3">
                          {/* <h6 className="mb-4 font-bold">Description</h6> */}
                          <p className="text-xs mb-1">Description </p>
                          <textarea
                            className="rounded-[10px] pl-3 p-1 border border-gray-300 outline-none "
                            required
                            onChange={(e) =>
                              setFormData({
                                ...formData,
                                dscrtion: e.target.value,
                              })
                            }
                          />
                        </div>
                        {/*footer*/}
                        <div className=" flex items-center justify-end pt-4 pb-6 pr-5  rounded-b ">
                          <button
                            style={{
                              backgroundColor: "#FF8888",
                              color: "#FF0B0B",
                            }}
                            className="text-xs background-transparent p-2 pl-7 pr-7 outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 rounded"
                            type="button"
                            onClick={() => isShowModal()}
                          >
                            Close
                          </button>
                          <button
                            style={{
                              backgroundColor: "#AAFFCC",
                              color: "#41945D",
                            }}
                            className="text-xs p-2 pl-7 pr-7 rounded shadow hover:shadow-lg outline-none focus:outline-none  ml-1 ease-linear transition-all duration-150"
                            type="submit"
                            onClick={() => {
                              //  callback();
                              //isShowModal();
                            }}
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </div>
      ) : null}
    </div>
  );
}
