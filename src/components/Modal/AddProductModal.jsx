import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

import {
  UploadImageUrl,
  addProductApi,
  getCategoryDetailsById,
  countryCodesApi,
  getPharmaCategory,
  getSubCatData,
  uploadToAws,
} from "../../API/ApiCall";

const ProductModal = ({
  setAddProductModal,
  apiCall,
  editProductData,
  incomingType,
  getProducts,
}) => {
  // const [image, setImage] = useState(null);

  const [showImage, setShowImage] = React.useState(false);
  const [Image, setImage] = React.useState("");
  const [fileToUpload, setFileToUpload] = useState(null);
  const [editImage, seteditImage] = useState(true);
  const [mainCategoyData, setMainCategoyData] = useState([]);
  const [subcategoryData, setSubcategoryData] = useState([]);
  const [countries, setCountrieCode] = useState([]);

  const [selectedCountries, setSelectedCountries] = useState([]);
  const [errors, setErrors] = useState({});

  const validate = (UserData) => {
    let tempErrors = {};
    console.log(UserData);
    tempErrors.name = UserData?.name != "" ? "" : "Name is required";
    tempErrors.description =
      UserData?.description != "" ? "" : "description is required";
    tempErrors.brand = UserData?.brand != "" ? "" : "brand is required";
    tempErrors.quantity =
      UserData?.quantity != "" ? "" : "quantity is required";
    tempErrors.price = UserData?.price != "" ? "" : "price is required";
    tempErrors.subcategory =
      UserData?.subcategory != undefined ? "" : "subcategory is required";
    tempErrors.category =
      UserData?.category != undefined ? "" : "category is required";
    tempErrors.country = selectedCountries[0] ? "" : "country code is required";
    tempErrors.image = Image ? "" : "image is required";
    tempErrors.quantity =
      UserData?.quantity != Number ? "" : "quantity should  a number";

    setErrors(tempErrors);

    return Object.values(tempErrors).every((x) => x === "");
  };

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
    if (!validate(UserData)) return;
    console.log(UserData);
    console.log(fileToUpload);
    let publicUrl;

    if (editImage) {
      publicUrl = editProductData.image;

      const wholeData = {
        product_id: editProductData._id,
        name: UserData.name,
        description: UserData.description,
        brand: UserData.brand,
        image: publicUrl,
        quantity: parseInt(UserData.quantity),
        price: parseInt(UserData.price),
        sub_category_id: UserData.dropdown2,
        country_codes: selectedCountries,
      };

      apiCall(wholeData)
        .then((data) => {
          setAddProductModal(false);
          getProducts();
        })
        .catch((err) => {
          setAddProductModal(false);
          getProducts();
        });
    } else {
      UploadImageUrl()
        .then((data) => {
          uploadToAws(data.data.presignedUrl, fileToUpload).then((data) => {
            console.log(data, "uploaded");
          });
          console.log(data.data.publicUrl, "uploadedssssss");
          publicUrl = data.data.publicUrl;
          console.log(publicUrl);

          let wholeData;
          if (incomingType == "edit") {
            wholeData = {
              product_id: editProductData._id,
              name: UserData.name,
              description: UserData.description,
              brand: UserData.brand,
              image: publicUrl,
              quantity: parseInt(UserData.quantity),
              price: parseInt(UserData.price),
              sub_category_id: UserData.dropdown2,
              country_codes: selectedCountries,
            };
          } else {
            wholeData = {
              name: UserData.name,
              description: UserData.description,
              brand: UserData.brand,
              image: publicUrl,
              quantity: parseInt(UserData.quantity),
              price: parseInt(UserData.price),
              sub_category_id: UserData.dropdown2,
              country_codes: selectedCountries,
            };
          }

          apiCall(wholeData)
            .then((data) => {
              setAddProductModal(false);
              getProducts();
            })
            .catch((err) => {
              setAddProductModal(false);
              getProducts();
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const mainCategory = () => {
    getPharmaCategory()
      .then(({ data }) => {
        setMainCategoyData(data?.data?.mainCategories);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getSubCategory = (data) => {
    getSubCatData(data)
      .then(({ data }) => {
        setSubcategoryData(data.data.subCategories);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    mainCategory();
    countryCodesApi()
      .then((data) => {
        setCountrieCode(data); 
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
 
  useEffect(() => {
    if (editProductData?.image) {
      setShowImage(true);
      setImage(editProductData?.image);
      setSelectedCountries(editProductData?.country_codes);
    }
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
                          {errors.image && (
                            <p className="text-red-500 text-xs">
                              {errors.image}
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
                    defaultValue={""}
                    id="category"
                    name="category"
                    className="mt-1 p-2 border rounded-md w-full disabled:"
                    // onChange={handleOptionChange}
                  >
                    <option
                      value={""}
                      className="pointer-events-none"
                      selected
                      disabled
                    >
                      select Choice
                    </option>

                    {mainCategoyData.map((data) => {
                      return <option value={data._id}>{data?.title}</option>;
                    })}
                  </select>
                  {errors.category && (
                    <p className="text-red-500 text-xs">{errors.category}</p>
                  )}
                  <label
                    for="message"
                    class="block  mt-4 text-sm font-medium text-gray-900"
                  >
                    SubCategory
                  </label>

                  <select
                    id="dropdown2"
                    name="subcategory"
                    className="mt-1 p-2 border rounded-md w-full"
                    // onChange={handleOptionChange}
                  >
                    <option
                      selected
                      disabled
                      defaultValue={
                        editProductData?.sub_category_id
                          ? editProductData?.sub_category_id
                          : ""
                      }
                    >
                      {editProductData?.sub_category_id
                        ? editProductData?.sub_category_id
                        : "select Choice"}
                    </option>

                    {subcategoryData?.map((data) => {
                      console.log(data);
                      return <option value={data._id}>{data.title}</option>;
                    })}
                  </select>
                  {errors.subcategory && (
                    <p className="text-red-500 text-xs">{errors.subcategory}</p>
                  )}

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
                    name="country"
                    className="mt-1 p-2 border rounded-md w-full"
                    // onChange={handleOptionChange}
                  >
                    <option selected value="">
                      select Choice
                    </option>
                    {countries?.map((data) => {
                      return <option value={data.code}>{data.name}</option>;
                    })}
                  </select>
                  {errors.country && (
                    <p className="text-red-500 text-xs">{errors.country}</p>
                  )}
                </div>
              </div>

              <div className="w-3/5">
                <div>Product Name</div>
                <input
                  defaultValue={editProductData?.name}
                  type="text"
                  name="name"
                  className="mt-1 p-2 border rounded-md w-full"
                />
                {errors.name && (
                  <p className="text-red-500 text-xs">{errors.name}</p>
                )}

                <div className="mt-4">Brand:</div>
                <input
                  defaultValue={editProductData?.brand}
                  name="brand"
                  type="text"
                  className="mt-1 p-2 border rounded-md w-full"
                />
                {errors.brand && (
                  <p className="text-red-500 text-xs">{errors.brand}</p>
                )}
                <div className="mt-2">quantity</div>
                <input
                  defaultValue={editProductData?.quantity}
                  type="number"
                  name="quantity"
                  className="mt-1 p-2 border rounded-md w-full"
                />
                {errors.quantity && (
                  <p className="text-red-500 text-xs">{errors.quantity}</p>
                )}
                <div className="mt-2">price</div>
                <input
                  defaultValue={editProductData?.price}
                  type="number"
                  name="price"
                  className="mt-1 p-2 border rounded-md w-full"
                />
                <label
                  for="message"
                  class="block mt-4 text-sm font-medium text-gray-900"
                >
                  {errors.price && (
                    <p className="text-red-500 text-xs">{errors.price}</p>
                  )}
                  Description
                </label>
                <textarea
                  defaultValue={editProductData?.description}
                  name="description"
                  id="message"
                  rows="4"
                  class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Write your thoughts here..."
                ></textarea>
                {errors.description && (
                  <p className="text-red-500 text-xs">{errors.description}</p>
                )}
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
