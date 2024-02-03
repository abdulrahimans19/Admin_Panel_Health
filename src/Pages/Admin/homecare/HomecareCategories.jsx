import React, { useEffect, useState } from "react";
import { homecare } from "../../../Redux/Features/NavbarSlice";
import image from "../../../assets/images/doctor-ittle-girl.png";
import feverImage from "../../../assets/images/face-thermometer.png";
import { useDispatch } from "react-redux";
import Button from "../../../components/Button";

import ComunButton from "../../../components/Navbar/ComenButton";
import AddNewCategoryButton from "./AddNewCategoryButton";
import CatCard from "../../../components/Cards/CatCard";
import {
  GetHomecareCategories,
  GetHomecareCategoriesApi,
  addHomecareCategory,
  homeCareUpadateCate
} from "../../../API/ApiCall";
import AddCategoryModal from "../../../components/Modal/AddCategoryModal";
import AddCategoryModalHomecare from "./modal/AddCategoryModalHomecare";
import AddCategory from "../../../components/Modal/AddCategory";
import CatInfoModal from "../../../components/Modal/ViewCatInfo";

export default function Homecare() {
  const [addcategoryModal, setAddCategoryModal] = useState(false);
  const dispatch = useDispatch();
  const [homeCareCategories, setHomeCareCategory] = useState([]);
  const [editShowModal, setEditShowModal] = useState(false);
  const [editData, setEditData] = useState();
  const [viewCatInfoModal, setViewCatInfoModal] = useState(false);

  // const getHomecareCat = () => {
  //   getPharmaCategory().then(({ data }) => {
  //     console.log(data.data.mainCategories);
  //     setCategoryData(data.data.mainCategories);
  //   });
  // };
  useEffect(() => {
    getHomecareCategories();
    dispatch(homecare());
  }, []);
  const getCategory=()=>{

    console.log("inside edit");
    getHomecareCategories().then((data)=>{
      console.log("data is ",data);
      setHomeCareCategory(data?.data?.data?.mainCategories)
    }).catch((error)=>{
      console.log(error);
    })
  }
  function addCategory() {
    console.log("this is add category in homecare @@@@@@@");
  }
  const editCat = (data) => {
    setEditShowModal(true);
    setEditData(data);

  };
  const viewCatInfo = (data) => {
    setEditData(data);

    setViewCatInfoModal(true);
  };
  const getHomecareCategories = () => {
    GetHomecareCategoriesApi().then((data) => {
      setHomeCareCategory(data.data.data.mainCategories);
    }).catch((error)=>{
      console.log(error);
    })
  };
  return (
    <div>
      <div className="sm:flex justify-between">
        <div>
          <h2 className="font-bold text-lg">Categories</h2>
          <p>{homeCareCategories.length} Available Categories</p>
        </div>
        <div
          onClick={() => {
            setAddCategoryModal(true);
          }}
        >
          <div className="mt-5 sm:mt-0">
          <AddNewCategoryButton
            text={"Add Category"}
            callback={addCategory}
          />
          </div>
        
        </div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4 mt-6"></div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4 mt-6">
        {homeCareCategories[0] &&
          homeCareCategories.map((data) => {
            return (
              <CatCard
                data={data}
                viewCatInfo={viewCatInfo}
                callback={editCat}
              />
            );
          })}
      </div>
      {addcategoryModal && (
        <AddCategory
          catFunction={addHomecareCategory}
          setShowModal={setAddCategoryModal}
          GetPharmacyCat={getHomecareCategories}
          />

        )
      }
      {editShowModal && (
        <AddCategory
          catFunction={homeCareUpadateCate}
          incomingType={"edit"}
          dataToUpload={editData}
          setShowModal={setEditShowModal}
          GetPharmacyCat={getHomecareCategories}
        />
      )}
      {viewCatInfoModal && (
        <CatInfoModal
          catInfo={editData}
          setViewCatInfoModal={setViewCatInfoModal}
        />
      )}
    </div>
  );
}
