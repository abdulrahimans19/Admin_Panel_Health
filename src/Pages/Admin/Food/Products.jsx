import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { foodNavdata, pharmacyNav } from "../../../Redux/Features/NavbarSlice";
import lungsimg from "../../../assets/images/3d-fluency-lungs.png";
import heartimg from "../../../assets/images/heart.png";
import ComunButton from "../../../components/Navbar/ComenButton";
import CatCard from "../../../components/Cards/CatCard";
import ProductCard from "../../../components/Cards/ProductCards";
import AddItemButton from "../../../components/Button/AddItemButton";
import buttonImage from "../../../assets/images/element-plus.png";
import ProductModal from "../../../components/Modal/AddProductModal";
import {
  getFoodProducts,
  addFoodProductApi,
  disableFoodProduct,
  disabledFoodProductApi,
  editFoodProduct,
  filterFoodAPi,
  getFoodCategory,
  getFoodProductApi,
  getPharmaCategory,
} from "../../../API/ApiCall";
import ReactPaginate from "react-paginate";
import "../../../assets/pagination.css";
import ConfirmationModal from "../../../components/Modal/ConfirmationModal";
import AddBulk from "../../../components/Modal/AddBulk";
// import AddBulk from "../../../components/Modal/AddBulk";

export default function FoodProduct() {
  const [categoryMenu, setCategoryMenu] = useState([]);
  const [AddProductModal, setAddProductModal] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [FoodProductsData, setFoodProductsData] = useState([]);
  const [totalPagecount, setTotalPagecount] = useState(0);
  const [editProductData, setEditProductData] = useState("");
  const [editProduct, setEditProduct] = useState(false);
  const [disableProducts, setDisableProducts] = useState(false);
  const [Categories, setCategories] = useState([]);
  const [filterId, setFilterId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
const [addBulModal, setAddBulModal] = useState(false)
  const changeCategory = () => {
    setCategoryMenu(!categoryMenu);
  };

  const dispatch = useDispatch();
  const editCat = (data) => {
    setEditProductData(data);
    setEditProduct(true);
  };

  const getFoodCategories = () => {
    getFoodCategory()
      .then(({ data }) => {
        setCategories(data.data.mainCategories);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const FoodProduct = () => {
    if (filterId) {
      setCurrentPage(0);
      filterFoodAPi(filterId, 1)
        .then(({ data }) => {
          const totalPages = Math.ceil(data.data.total_document / 10);
          setTotalPagecount(totalPages);
          setFoodProductsData(data.data.products);
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (categoryMenu) {
      getFoodProductApi(pageNumber)
        .then(({ data }) => {
          const totalPages = Math.ceil(data.data.total_document / 10);
          setTotalPagecount(totalPages);

          setFoodProductsData(data.data.products);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      disabledFoodProductApi()
        .then(({ data }) => {
          const totalPages = Math.ceil(data.data.total_document / 10);
          setTotalPagecount(totalPages);

          setFoodProductsData(data.data.products);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const addcategory = () => {};

  useEffect(() => {
    dispatch(foodNavdata());
    FoodProduct();
  }, [categoryMenu, filterId]);
  useEffect(() => {
    getFoodCategories();
  }, []);

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);

    if (filterId) {
      filterFoodAPi(filterId, selectedPage.selected + 1)
        .then(({ data }) => {
          setPageNumber(selectedPage.selected + 1);

          setFoodProductsData(data.data.products);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      if (categoryMenu) {
        getFoodProductApi(selectedPage.selected + 1)
          .then(({ data }) => {
            setPageNumber(selectedPage.selected + 1);
            setFoodProductsData(data.data.products);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        disabledFoodProductApi(selectedPage.selected + 1)
          .then(({ data }) => {
            setPageNumber(selectedPage.selected + 1);
            setFoodProductsData(data.data.products);
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
  };

  const disableProduct = () => {
    disableFoodProduct(editProductData._id)
      .then((data) => {
        
      })
      .catch((err) => {
        console.log(err);
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
          Products
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
            {categoryMenu ? " " : ""}
          </h4>
          <p className="p-2 pl-3 text-gray-600 font-semibold">
            {/* {categoryMenu.length} */}
          </p>
        </div>
        <div>
          <div className="sm:flex gap-4 ">
          <div
            className=""
            onClick={() => {
              setAddBulModal(true);
            }}
          >
            <AddItemButton text={"Add bulk Products"} img={buttonImage} />
          </div>
          <div
            className="  mt-2 sm:mt-0"
            onClick={() => {
              setAddProductModal(true);
            }}
          >
            <AddItemButton text={"Add Products"} img={buttonImage} />
          </div>
          </div>
          {/* <ComunButton text={"Add new categories"} callback={addcategory} /> */}
     

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4 mt-6">
          {FoodProductsData?.map((data) => {
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
          apiCall={addFoodProductApi}
          getProducts={FoodProduct}
          getPharmaCategorydata={getFoodCategory}
        />
      )}
      {editProduct && (
        <ProductModal
          setAddProductModal={setEditProduct}
          editProductData={editProductData}
          apiCall={editFoodProduct}
          incomingType={"edit"}
          getProducts={FoodProduct}
          getPharmaCategorydata={getFoodCategory}

        />
      )}

{addBulModal&&<AddBulk onClose={setAddBulModal} type={"food"} FoodProduct={FoodProduct} />}


      <ReactPaginate
        pageCount={totalPagecount} // Replace with the total number of pages
        pageRangeDisplayed={3} // Number of pages to display in the pagination bar
        marginPagesDisplayed={1} // Number of pages to display for margin pages
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        activeClassName={"active"}
        forcePage={currentPage}
      />
      {disableProducts && (
        <ConfirmationModal
          onClose={setDisableProducts}
          onConfirm={disableProduct}
        />
      )}
    </div>
  );
}
