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
import {
  getFoodCategory,
  addFoodCategory,
  UpadateFoodCategory,
  getFoodSubCategory,
} from "../../../API/ApiCall";
import CatInfoModal from "../../../components/Modal/ViewCatInfo";

export default function FoodCategory() {
  const [categoryMenu, setCategoryMenu] = useState(true);
  const [AddCategoryModal, setAddCategoryModal] = useState(false);
  const [addSubCategoryModal, setAddSubCategoryModal] = useState(false);
  const [editCatModal, setEditCatModal] = useState(false);
  const [EditData, setEditData] = useState(null);
  const [subCatData, setSubCatData] = useState([]);
  const [viewCatInfoModal, setViewCatInfoModal] = useState(false);
  const [categoryData, setCategoryData] = useState([]);

  const dispatch = useDispatch();

  const changeCategory = () => {
    setCategoryMenu(!categoryMenu);
  };
  const abc = { name: "Pulmonology", image: lungsimg };
  const ab = { name: "Hepatology", image: heartimg };

  const addcategory = async () => {
    console.log("add category modal");
  };
  const editCat = (data) => {
    setEditCatModal(true);

    setEditData(data);
  };

  useEffect(() => {
    dispatch(foodNavdata());
    getFoodCategory().then(({ data }) => {
      setCategoryMenu(data.data.mainCategories);
    });
  }, []);

  const viewCatInfo = (data) => {
    console.log(data);
    setEditData(data);

    getFoodSubCategory(data._id).then(({ data }) => {
      console.log(data.data.subCategories);
      setSubCatData(data.data.subCategories);
    });
    setViewCatInfoModal(true);
  };

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
          <p className="p-2 pl-3 text-gray-600 font-semibold">
            {" "}
            {categoryMenu.length} categories
          </p>
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
              return (
                <CatCard
                  data={data}
                  callback={editCat}
                  viewCatInfo={viewCatInfo}
                />
              );
            })}
        </div>
      </div>
      {AddCategoryModal && (
        <AddCategory
        catFunction={addFoodCategory}
          setShowModal={setAddCategoryModal}
          GetPharmacyCat={getFoodCategory}
        />
      )}
      {editCatModal && (
        <AddCategory
          catFunction={UpadateFoodCategory}
          incomingType={"edit"}
          dataToUpload={EditData}
          setShowModal={setEditCatModal}
          GetPharmacyCat={getFoodCategory}
        />
      )}

      {addSubCategoryModal && (
        <AddSubCategoryModal
          displayData={categoryMenu}
          onClose={setAddSubCategoryModal}
        />
      )}

      {viewCatInfoModal && (
        <CatInfoModal
          catInfo={EditData}
          subCatData={subCatData}
          setViewCatInfoModal={setViewCatInfoModal}
        />
      )}
    </div>
  );
}
