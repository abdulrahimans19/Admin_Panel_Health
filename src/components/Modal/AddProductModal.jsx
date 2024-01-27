import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

import {
  UploadImageUrl,
  addProductApi,
  countryCodesApi,
  getPharmaCategory,
  getSubCatData,
  uploadToAws,
} from "../../API/ApiCall";

const ProductModal = ({ setAddProductModal }) => {
  // const [image, setImage] = useState(null);
  const [input1, setInput1] = useState("");
  const [input2, setInput2] = useState("");
  const [input3, setInput3] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Handle form submission logic here
  };
  const [categoryName, setCategoryName] = useState("");
  const [description, setDescription] = useState("");
  const [showImage, setShowImage] = React.useState(false);
  const [Image, setImage] = React.useState("");
  const [fileToUpload, setFileToUpload] = useState(null);
  const [editImage, seteditImage] = useState(true);
  const [mainCategoyData, setMainCategoyData] = useState([]);
  const [subcategoryData, setSubcategoryData] = useState([]);
  const [countries, setCountrieCode] = useState([]);

  const [selectedCountries, setSelectedCountries] = useState([]);
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

  const AddProduct = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const UserData = Object.fromEntries(form);

    console.log(UserData);
    console.log(fileToUpload);

   const Url= UploadImageUrl().then((data) => {
    
      // uploadToAws(data.data.presignedUrl, fileToUpload).then((data) => {
      //   console.log(data, "uploaded");
        
      // });
   
      const wholeData = {
        name:UserData.name,
        description:UserData.description,
        brand:UserData.brand,
        image: data.data.publicUrl,
        quantity:UserData.quantity,
        price:UserData.price,
        sub_category_id:UserData.dropdown2
        ,
        country_codes:selectedCountries
      };
      console.log(wholeData);
      // addProductApi();
    });
  };

  const mainCategory = () => {
    getPharmaCategory().then(({ data }) => {
      setMainCategoyData(data?.data?.mainCategories);
    });
  };

  const getSubCategory = (data) => {
    getSubCatData(data).then(({ data }) => {
      setSubcategoryData(data.data.subCategories);
    });
  };

  useEffect(() => {
    mainCategory();
    countryCodesApi().then((data) => {
      setCountrieCode(data);
    });
  }, []);

  return (
    <>
      (
      <div className="fixed inset-0 z-50 w-full flex items-center justify-center p-4 bg-gray-800 bg-opacity-50">
        <form onSubmit={AddProduct} id="addProduct">
          <div className="bg-white p-8 rounded-lg ">
            <div className="text-xl p-4 font-semibold">Add Product</div>

            <div className="flex gap-3 p-5">
              {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"> */}
<div className="w-2/5">
<div class="flex  items-center justify-center bg-grey-lighter">
                <label class="w-64 flex flex-col items-center px-4 py-6 bg-white text-blue rounded-lg shadow-lg tracking-wide uppercase border border-blue cursor-pointer hover:bg-blue hover:text-white">
                  <div {...getRootProps()}>
                    {!showImage ? (
                      <div>
                        <p>
                          Drag 'n' drop some files here, or click to select
                          files
                        </p>
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

<div className="">
                  <label
                    for="message"
                    class="block  mt-4 text-sm font-medium text-gray-900"
                  >
                    Category
                  </label>

                  <select
                    onChange={(data) => {
                      getSubCategory(data.target.value);
                    }}
                    id="dropdown"
                    name="dropdown"
                    className="mt-1 p-2 border rounded-md w-full"
                    // onChange={handleOptionChange}
                  >
                    <option selected value="">
                      select Choice
                    </option>

                    {mainCategoyData.map((data) => {
                      return <option value={data._id}>{data?.title}</option>;
                    })}
                  </select>

                  <label
                    for="message"
                    class="block  mt-4 text-sm font-medium text-gray-900"
                  >
                    SubCategory
                  </label>

                  <select
                    id="dropdown2"
                    name="dropdown2"
                    className="mt-1 p-2 border rounded-md w-full"
                    // onChange={handleOptionChange}
                  >
                    <option selected value="">
                      select Choice
                    </option>

                    {subcategoryData?.map((data) => {
                      console.log(data);
                      return <option value={data._id}>{data.title}</option>;
                    })}
                  </select>

                  <label
                    for="message"
                    class="block  mt-4 text-sm font-medium text-gray-900"
                  >
                    country
                  </label>
                  <label
                    htmlFor="message"
                    className="block mt-4 text-md font-bold text-gray-900"
                  >
                    {selectedCountries.join(" ")}
                  </label>
                  <select
                    onChange={(data) => {
                      console.log(data.target.value);
                      setSelectedCountries((prevArray) => {
                        const newValue = data.target.value;

                        // Check if the value is already in the array
                        if (!prevArray.includes(newValue)) {
                          // If not, update the array
                          return [...prevArray, newValue];
                        }

                        // If the value is already in the array, return the unchanged array
                        return prevArray;
                      });
                    }}
                    id="dropdown3"
                    name="dropdown3"
                    className="mt-1 p-2 border rounded-md w-full"
                    // onChange={handleOptionChange}
                  >
                    <option selected value="">
                      select Choice
                    </option>
                    {countries?.map((data) => {
                      console.log(data);
                      return <option value={data.code}>{data.name}</option>;
                    })}
                  </select>
                </div>
</div>
              

              <div className="w-3/5">
                <div>Product Name</div>
                <input
                  type="text"
                  name="name"
                  className="mt-1 p-2 border rounded-md w-full"
                />

                <div className="mt-4">Brand:</div>
                <input
                  name="brand"
                  type="text"
                  className="mt-1 p-2 border rounded-md w-full"
                />
                <div  className="mt-2">quantity</div>
                <input
                  type="number"
                  name="quantity"
                  className="mt-1 p-2 border rounded-md w-full"
                />
          <div className="mt-2">price</div>
                <input
                  type="number"
                  name="price"
                  className="mt-1 p-2 border rounded-md w-full"
                />
                <label
                  for="message"
                  class="block mt-4 text-sm font-medium text-gray-900"
                >
                  Description
                </label>
                <textarea
                  name="description"
                  id="message"
                  rows="4"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Write your thoughts here..."
                ></textarea>

               
              </div>
            </div>
            <div className="flex justify-end m-5">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                // onClick={handleSubmit}
              >
                Submit
              </button>
              <button
                className="ml-2 text-gray-500 hover:text-gray-700 px-4 py-2 rounded-md"
                onClick={() => {
                  setAddProductModal(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
      )
    </>
  );
};

export default ProductModal;
