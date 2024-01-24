import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UpadateCate, UploadImageUrl, addCategory, uploadToAws } from "../../API/ApiCall";
export default function AddCategory({
  setShowModal,
  dataToUpload,
  incomingType,
  GetPharmacyCat,
  catFunction
}) {
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [showImage, setShowImage] = React.useState(false);
  const [Image, setImage] = React.useState("");
  const [fileToUpload, setFileToUpload] = useState(null);

  const [editImage, seteditImage] = useState(true);
  const onDrop = useCallback((acceptedFiles) => {
    seteditImage(false);
    console.log(acceptedFiles[0]);
    setFileToUpload(acceptedFiles[0]);
    setShowImage(true);

    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    console.log(reader);
    reader.readAsDataURL(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: "image/*",
  });

  const SubmitCat = (e) => {
    console.log(dataToUpload,'testig');
    // console.log(Image);
    e.preventDefault();
    let imageUrl;

    if (editImage) {
      imageUrl = dataToUpload.image;
console.log("updateimage working ");
console.log(dataToUpload);
      const WholeData = {
        category_id:dataToUpload._id,
        title: categoryName,
        description: description,
        image: imageUrl,
      };
      console.log(WholeData);

      catFunction(WholeData)
        .then((data) => {
          GetPharmacyCat();

          setShowModal(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      if (Image) {





        console.log("this working wretryyhj");
        UploadImageUrl().then((data) => {
          console.log(data.data);

          uploadToAws(data.data.presignedUrl, fileToUpload).then((data) => {
            console.log(data, "uploaded");
          });
          imageUrl = data.data.publicUrl;
          let WholeData
          console.log(data);
if(dataToUpload){
  WholeData = {
    category_id:dataToUpload._id,
    title: categoryName,
    description: description,
    image: imageUrl,
  };
}
else{
  WholeData = {
    title: categoryName,
    description: description,
    image: imageUrl,
  }; 
}

      
          console.log(WholeData);

          catFunction(WholeData)
            .then((data) => {
              GetPharmacyCat();

              setShowModal(false);
            })
            .catch((err) => {
              console.log(err);
            });
          console.log(imageUrl, "public url");
        });
      }
    }
  };

  useEffect(() => {
    console.log(dataToUpload);
    if (dataToUpload) {
      setImage(dataToUpload.image);
      setCategoryName(dataToUpload.title);
      setShowImage(true);
      setDescription(dataToUpload.description);
    }
  }, []);
  return (
    <div>
      <div className="container">
        <div className="pr-3 pl-3 justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
          <div className="container">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}

              <div className=" rounded-[15px] shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}

                <form onSubmit={SubmitCat} action="">
                  <div className=" flex justify-center items-center">
                    {/* leftDive */}
                    <div
                      className="flex justify-center items-center p-5 pt-3 "
                      style={{
                        width: 200,
                      }}
                    >
                      <div class="flex w-full items-center justify-center bg-grey-lighter">
                        <label class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
                          <div {...getRootProps()}>
                            <input name="image" {...getInputProps()} />

                            {!showImage ? (
                              <div>
                                <svg
                                  class="w-8 h-8"
                                  fill="currentColor"
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                </svg>
                                {isDragActive ? (
                                  <p>Drop the files here ...</p>
                                ) : (
                                  <p>
                                    Drag 'n' drop some files here, or click to
                                    select files
                                  </p>
                                )}
                              </div>
                            ) : (
                              <div
                                sx={{
                                  overflow: "hidden",
                                  objectFit: "cover",
                                  marginTop: 2,
                                }}
                              >
                                <img
                                  height={100}
                                  src={Image}
                                  alt="Your Image"
                                  sx={{ width: "100%" }}
                                />
                              </div>
                            )}
                          </div>
                        </label>
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
                          onChange={(e) => {
                            setCategoryName(e.target.value);
                          }}
                          value={categoryName}
                          type="text"
                          placeholder="Type name"
                          className="rounded-[10px] pl-3 p-1 border border-gray-300 outline-none "
                        />

                        <label
                          for="message"
                          class="block mb-2 text-sm font-medium mt-3 text-gray-900"
                        >
                          Description
                        </label>
                        <textarea
                          onChange={(e) => {
                            setDescription(e.target.value);
                          }}
                          value={description}
                          id="message"
                          rows="4"
                          class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Write your thoughts here..."
                        ></textarea>
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
                          onClick={() => {
                            setShowModal(false);
                          }}
                        >
                          Close
                        </button>
                        <button
                          style={{
                            backgroundColor: "#AAFFCC",
                            color: "#41945D",
                          }}
                          className="text-xs p-2 pl-7 pr-7 rounded shadow hover:shadow-lg outline-none focus:outline-none  mb-1 ease-linear transition-all duration-150"
                          type="submit"
                          // onClick={() => {
                          //   //    callback();
                          //   SubmitCat();
                          // }}
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
      </div>
    </div>
  );
}
