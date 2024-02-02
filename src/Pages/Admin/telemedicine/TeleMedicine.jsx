import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { telemedicine } from "../../../Redux/Features/NavbarSlice";

import lungsimg from "../../../assets/images/3d-fluency-lungs.png";
import heartimg from "../../../assets/images/heart.png";
import ComunButton from "../../../components/Navbar/ComenButton";
import CatCard from "../../../components/Cards/CatCard";
import {
  MainDoctorCategories,
  teliUpadateCate,
  teliaddCategory,
} from "../../../API/ApiCall";
import CatInfoModal from "../../../components/Modal/ViewCatInfo";
import AddCategory from "../../../components/Modal/AddCategory";

export default function TeleMedicine() {
  const [categories, setCategories] = useState([]);
  const [viewCatInfoModal, setViewCatInfoModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editShowModal, setEditShowModal] = useState(false);
  const [editData, setEditData] = useState();

  const getCategory = () => {
    MainDoctorCategories().then((data) => {
      setCategories(data?.data?.data?.mainCategories);
    }).catch((err)=>
    {
      console.log(err);
    })
  };
  const isShowModal = () => {
    setShowModal(!showModal);
  };
  const editCat = (data) => {
    setEditShowModal(true);

    setEditData(data);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(telemedicine());
    getCategory();
  }, []);
  const viewCatInfo = (data) => {
    setEditData(data);

    setViewCatInfoModal(true);
  };

  function addCategory() {
    console.log("Add category in telimedicin");
  }

  return (
    <div className="container mt-5">
      <div className="flex justify-between">
        <div>
          <h2 className="font-bold text-500" style={{ fontSize: "20px" }}>
            Categories
          </h2>
          <p className="text-gray-400 text-xs">
            {categories.length} available categories
          </p>
        </div>
        <ComunButton text={"Add new categories"} callback={isShowModal} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4 mt-6">
        {categories[0] &&
          categories.map((data) => {
            return (
              <CatCard
                viewCatInfo={viewCatInfo}
                data={data}
                callback={editCat}
              />
            );
          })}
      </div>

      {showModal && (
        <AddCategory
          catFunction={teliaddCategory}
          setShowModal={setShowModal}
          GetPharmacyCat={getCategory}
        />
      )}
      {editShowModal && (
        <AddCategory
          catFunction={teliUpadateCate}
          incomingType={"edit"}
          dataToUpload={editData}
          setShowModal={setEditShowModal}
          GetPharmacyCat={getCategory}
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
