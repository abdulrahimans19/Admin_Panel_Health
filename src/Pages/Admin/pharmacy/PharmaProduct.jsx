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
import { getPharmaProductApi } from "../../../API/ApiCall";
import ReactPaginate from 'react-paginate';
import "./style.css"
export default function PharmaProduct() {
  const [categoryMenu, setCategoryMenu] = useState(true);
  const [AddProductModal, setAddProductModal] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [PharmaProductsData, setPharmaProductsData] = useState([]);
  const [totalPagecount, setTotalPagecount] = useState(0)
  const changeCategory = () => {
    setCategoryMenu(!categoryMenu);
  };

  const dispatch = useDispatch();
  const editCat = (data) => {
    console.log(data);
  };

  const PharmaProduct = () => {
    getPharmaProductApi(setPageNumber).then(({ data }) => {
      const totalPages = Math.ceil(data.data.total_document / 10);
      setTotalPagecount(totalPages)
      console.log(data.data.products);

      setPharmaProductsData(data.data.products);
    });
  };

  const abc = { name: "Pulmonology", image: lungsimg };
  const ab = { name: "Hepatology", image: heartimg };
  useEffect(() => {
    dispatch(pharmacyNav());
    PharmaProduct();
  }, []);


  const [currentPage, setCurrentPage] = useState(0);

  const handlePageChange = (selectedPage) => {
    // Handle page change logic here, e.g., fetching data for the new page
    setCurrentPage(selectedPage.selected);

console.log(selectedPage.selected);
    getPharmaProductApi(selectedPage.selected+1).then(({ data }) => {
      console.log(data.data.products);

      setPharmaProductsData(data.data.products);
    });

  };



  return (
    <div>
      <div className="flex gap-3 p-3">
        <p
          onClick={() => {
            changeCategory();
          }}
          className={`${
            categoryMenu && "font-bold underline"
          }  text-xl  underline-offset-8 decoration-4 cursor-pointer`}
        >
          products
        </p>
        <p
          onClick={() => {
            changeCategory();
          }}
          className={`${
            !categoryMenu && "font-bold underline"
          }   cursor-pointer text-xl underline-offset-8 decoration-4`}
        >
          Disabled
        </p>
      </div>

      <div className="flex justify-between">
        <div>
          <h4 className="text-4xl font-semibold p-4 ">
            {categoryMenu ? "Categories" : "sub Categories"}
          </h4>
          <p className="p-2 pl-3 text-gray-600 font-semibold">{PharmaProductsData.length} categories</p>
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
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option disabled value="">
                Filter By Category
              </option>
              <option value="full">full body</option>
              <option value="Fever">Fever</option>
            </select>
          </div>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4 mt-6">
          {PharmaProductsData.map((data) => {
            return <ProductCard data={data} callback={editCat} />;
          })}
        </div>
      </div>
      {AddProductModal && (
        <ProductModal setAddProductModal={setAddProductModal} />
      )}


<ReactPaginate
        pageCount={totalPagecount}  // Replace with the total number of pages
        pageRangeDisplayed={3}  // Number of pages to display in the pagination bar
        marginPagesDisplayed={1}  // Number of pages to display for margin pages
        onPageChange={handlePageChange}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    </div>
  );
}
