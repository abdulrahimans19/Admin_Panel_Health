import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pharmacyNav } from "../../../Redux/Features/NavbarSlice";
import lungsimg from "../../../assets/images/3d-fluency-lungs.png";
import heartimg from "../../../assets/images/heart.png";
import ComunButton from "../../../components/Navbar/ComenButton";
import CatCard from "../../../components/Cards/CatCard";
import ProductCard from "../../../components/Cards/ProductCards";
import AddItemButton from "../../../components/Button/AddItemButton";
import buttonImage from "../../../assets/images/element-plus.png";
import ProductModal from "../../../components/Modal/AddProductModal";
import {
  addProductApi,
  disablePharmaProduct,
  disabledFarmaProductApi,
  editPharmaProduct,
  filterPharmaAPi,
  getPharmaCategory,
  getPharmaProductApi,
} from "../../../API/ApiCall";
import ReactPaginate from "react-paginate";
import "../../../assets/pagination.css";
import ConfirmationModal from "../../../components/Modal/ConfirmationModal";
export default function PharmaProduct() {
  const [categoryMenu, setCategoryMenu] = useState(true);
  const [AddProductModal, setAddProductModal] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [PharmaProductsData, setPharmaProductsData] = useState([]);
  const [totalPagecount, setTotalPagecount] = useState(0);
  const [editProductData, setEditProductData] = useState("");
  const [editProduct, setEditProduct] = useState(false);
  const [disableProducts, setDisableProducts] = useState(false);
  const [Categories, setCategories] = useState([]);
  const [filterId, setFilterId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [enableProduct, setEnableProduct] = useState(false);
  const dispatch = useDispatch();
  const editCat = (data) => {
    setEditProductData(data);
    setEditProduct(true);

    console.log(data);
  };

  const getFarmaCategories = () => {
    getPharmaCategory()
      .then(({ data }) => {
        console.log(data, "maincat");
        setCategories(data.data.mainCategories);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const PharmaProduct = () => {
    if (filterId) {
      setCurrentPage(0);
      filterPharmaAPi(filterId, 1)
        .then(({ data }) => {
          const totalPages = Math.ceil(data.data.total_document / 10);
          setTotalPagecount(totalPages);
          setPharmaProductsData(data.data.products);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (categoryMenu) {
      getPharmaProductApi(pageNumber)
        .then(({ data }) => {
          const totalPages = Math.ceil(data.data.total_document / 10);
          setTotalPagecount(totalPages);
          console.log(data.data.products);

          setPharmaProductsData(data.data.products);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      disabledFarmaProductApi()
        .then(({ data }) => {
          const totalPages = Math.ceil(data.data.total_document / 10);
          setTotalPagecount(totalPages);
          console.log(data.data);
          setPharmaProductsData(data.data.products);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    dispatch(pharmacyNav());
    PharmaProduct();
  }, [categoryMenu, filterId]);
  useEffect(() => {
    getFarmaCategories();
  }, []);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);

    if (filterId) {
      filterPharmaAPi(filterId, selectedPage.selected + 1)
        .then(({ data }) => {
          setPageNumber(selectedPage.selected + 1);

          setPharmaProductsData(data.data.products);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      if (categoryMenu) {
        getPharmaProductApi(selectedPage.selected + 1)
          .then(({ data }) => {
            console.log(data.data.products);
            setPageNumber(selectedPage.selected + 1);
            setPharmaProductsData(data.data.products);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        disabledFarmaProductApi(selectedPage.selected + 1)
          .then(({ data }) => {
            console.log(data.data.products);
            setPageNumber(selectedPage.selected + 1);
            setPharmaProductsData(data.data.products);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  };

  const CallBackDisable = (data) => {
    setEditProductData(data);
    setDisableProducts(true);
    console.log(data, "disble working");
  };
  const CallBackEnable = (data) => {
    setEditProductData(data);
    setEnableProduct(true);
    console.log(data, "disble working");
  };

  const disableProduct = () => {
    console.log("confirm working");
    console.log(editProductData);
    disablePharmaProduct(editProductData._id)
      .then((data) => {
        console.log(data);
        PharmaProduct();
        setDisableProducts(false);
      })
      .catch((err) => {
        console.log(err);
        setDisableProducts(false);
      });
  };

  return (
    <div>
      <div className="flex gap-3 p-3">
        <p
          onClick={() => {
            setFilterId(null);
            setCategoryMenu(true);
          }}
          className={`${
            categoryMenu && "font-bold underline"
          }  text-xl  underline-offset-8 decoration-4 cursor-pointer`}
        >
          products
        </p>
        <p
          onClick={() => {
            setFilterId(null);

            setCategoryMenu(false);
          }}
          className={`${
            !categoryMenu && "font-bold underline"
          }   cursor-pointer text-xl underline-offset-8 decoration-4`}
        >
          Disabled
        </p>
      </div>

      <div className="sm:flex justify-between">
        <div>
          <h4 className="text-4xl font-semibold p-4 ">
            {categoryMenu ? "Categories" : ""}
          </h4>
          <p className="p-2 pl-3 text-gray-600 font-semibold">
            {/* {PharmaProductsData.length} categories */}
          </p>
        </div>
        <div>
          {/* <ComunButton text={"Add new categories"} callback={addcategory} /> */}
          <div
            className=""
            onClick={() => {
              setAddProductModal(true);
            }}
          >
            <AddItemButton text={"Add Products"} img={buttonImage} />
          </div>

          <div className="flex items-center px-2.5 mt-4 py-0.5 text-base font-semibold text-green-500 text-center">
            {categoryMenu ? (
              <select
                onChange={(data) => {
                  setFilterId(data.target.value);
                }}
                id="countries"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option selected disabled value="">
                  Filter By Category
                </option>
                {Categories?.map((data) => {
                  return <option value={data._id}>{data.title}</option>;
                })}
              </select>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
      <div>
        <div className="  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4 mt-6">
          {PharmaProductsData?.map((data) => {
            if (categoryMenu) {
              return (
                <ProductCard
                  type="enable"
                  data={data}
                  callback={editCat}
                  disableCall={CallBackDisable}
                />
              );
            } else {
              return (
                <ProductCard
                  type="disable"
                  data={data}
                  callback={editCat}
                  disableCall={CallBackDisable}
                />
              );
            }
          })}
        </div>
      </div>
      {AddProductModal && (
        <ProductModal
          setAddProductModal={setAddProductModal}
          apiCall={addProductApi}
          getProducts={PharmaProduct}
        />
      )}
      {editProduct && (
        <ProductModal
          setAddProductModal={setEditProduct}
          editProductData={editProductData}
          apiCall={editPharmaProduct}
          incomingType={"edit"}
          getProducts={PharmaProduct}
        />
      )}
      <div className="">
        <div className=" flex justify-center">
          <ReactPaginate
            pageCount={totalPagecount} // Replace with the total number of pages
            pageRangeDisplayed={2} // Number of pages to display in the pagination bar
            marginPagesDisplayed={1} // Number of pages to display for margin pages
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            activeClassName={"active"}
            forcePage={currentPage}
          />
        </div>
      </div>

      {disableProducts && (
        <ConfirmationModal
          text={"are you sure you want to disable this product"}
          onClose={setDisableProducts}
          onConfirm={disableProduct}
        />
      )}
      {enableProduct && (
        <ConfirmationModal
          text={"are you sure you want to enable this product"}
          onClose={setDisableProducts}
          onConfirm={disableProduct}
        />
      )}
    </div>
  );
}
