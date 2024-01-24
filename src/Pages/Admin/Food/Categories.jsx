import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { foodNavdata, pharmacyNav } from "../../../Redux/Features/NavbarSlice";
import CatCard from "../../../components/Cards/CatCard";
import lungsimg from "../../../assets/images/3d-fluency-lungs.png";
import heartimg from "../../../assets/images/heart.png";
import ComunButton from "../../../components/Navbar/ComenButton";
import AddItemButton from "../../../components/Button/AddItemButton";
import buttonImage from "../../../assets/images/element-plus.png";
import AddCategory from "../../../components/Modal/AddCategory";
import AddSubCategoryModal from "../../../components/Modal/AddSubCategory";
import { getFoodCategory } from "../../../API/ApiCall";

export default function FoodCategory() {
  const [categoryMenu, setCategoryMenu] = useState(true);
  const [AddCategoryModal, setAddCategoryModal] = useState(false);
  const [addSubCategoryModal, setAddSubCategoryModal] = useState(false);
  const dispatch = useDispatch();

  const changeCategory = () => {
    setCategoryMenu(!categoryMenu);
  };
  const abc = { name: "Pulmonology", image: lungsimg };
  const ab = { name: "Hepatology", image: heartimg };
  const editCat = (data) => {
    console.log(data);
  };

  const addcategory = () => {
    console.log("add category modal");
  };

  useEffect(() => {
    dispatch(foodNavdata());
    getFoodCategory().then(({ data }) => {
      setCategoryMenu(data.data.mainCategories);
    });
  }, []);

  return (
    <div>
      <div className="flex gap-3 p-3">
        <p
          // onClick={() => {
          //   changeCategory();
          // }}
          className={`${
            categoryMenu && "font-bold underline"
          }  text-xl  underline-offset-8 decoration-4 cursor-pointer`}
        >
          Categories
        </p>
        {/* <p
          onClick={() => {
            changeCategory();
          }}
          className={`${
            !categoryMenu && "font-bold underline"
          }   cursor-pointer text-xl underline-offset-8 decoration-4`}
        >
          SubCategory
        </p> */}
      </div>
      <div className="flex justify-between">
        <div>
          <h4 className="text-4xl font-semibold p-4 ">
            {categoryMenu ? "Categories" : "sub Categories"}
          </h4>
          <p className="p-2 pl-3 text-gray-600 font-semibold">5 categories</p>
        </div>
        {/* <ComunButton text={"Add new categories"} callback={addcategory} /> */}

        <div className="flex gap-3">
          <div
            onClick={() => {
              setAddCategoryModal(true);
            }}
          >
            <AddItemButton text={"Add new categories"} img={buttonImage} />
          </div>
          <div
            onClick={() => {
              setAddSubCategoryModal(true);
            }}
          >
            <AddItemButton text={"Add sub Categories"} img={buttonImage} />
          </div>
        </div>
      </div>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4 mt-6">
          {categoryMenu[0] &&
            categoryMenu.map((data) => {
              return <CatCard data={data} callback={editCat} />;
            })}
        </div>
      </div>
      \{AddCategoryModal && <AddCategory setShowModal={setAddCategoryModal} />}
      {addSubCategoryModal && (
        <AddSubCategoryModal onClose={setAddSubCategoryModal} />
      )}
    </div>
  );
}
