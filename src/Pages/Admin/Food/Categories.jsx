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

  const GetFoodCat = () => {
    getFoodCategory()
      .then(({ data }) => {
        console.log(data.data.mainCategories);
        setCategoryMenu(data.data.mainCategories);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    dispatch(foodNavdata());
    GetFoodCat();
  }, []);

  const getsubCatData = (data) => {
    getFoodSubCategory(data._id)
      .then(({ data }) => {
        console.log(data.data.subCategories);
        setSubCatData(data.data.subCategories);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const viewCatInfo = (data) => {
    console.log(data);
    setEditData(data);
    getsubCatData(data);
    // getFoodSubCategory(data._id)
    //   .then(({ data }) => {
    //     console.log(data.data.subCategories);
    //     setSubCatData(data.data.subCategories);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
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
            {categoryMenu ? " " : "sub Categories"}
          </h4>
          <p className="p-2 pl-3 text-gray-600 font-semibold">
            {" "}
            {categoryMenu.length} Available Categories 
          </p>
        </div>
        {/* <ComunButton text={"Add new categories"} callback={addcategory} /> */}

        <div className="flex gap-3">
          <div
            onClick={() => {
              setAddCategoryModal(true);
            }}
          >
            <AddItemButton text={"Add Categories"} img={buttonImage} />
          </div>
          <div
            onClick={() => {
              setAddSubCategoryModal(true);
            }}
          >
            <AddItemButton text={"Add Sub Categories"} img={buttonImage} />
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
          GetPharmacyCat={GetFoodCat}
        />
      )}
      {editCatModal && (
        <AddCategory
          catFunction={UpadateFoodCategory}
          incomingType={"edit"}
          dataToUpload={EditData}
          setShowModal={setEditCatModal}
          GetPharmacyCat={GetFoodCat}
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
          viewCatInfo={getsubCatData}
        />
      )}
    </div>
  );
}
