import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { telemedicine } from "../../../Redux/Features/NavbarSlice";

import lungsimg from "../../../assets/images/3d-fluency-lungs.png";
import heartimg from "../../../assets/images/heart.png";
import ComunButton from "../../../components/Navbar/ComenButton";
import CatCard from "../../../components/Cards/CatCard";
import { MainDoctorCategories } from "../../../API/ApiCall";

export default function TeleMedicine() {
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(telemedicine());
    getCategory();
  }, []);

  async function getCategory() {
    try {
      const response = await MainDoctorCategories();
      setCategories(response?.data?.data?.mainCategories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  }

  const [showModal, setShowModal] = useState(false);

  function editCat() {
    setShowModal(true);
  }
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
        <ComunButton text={"Add new categories"} callback={addCategory} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4 mt-6">
        {categories[0] &&
          categories.map((data) => {
            return <CatCard data={data} callback={editCat} />;
          })}
      </div>
    </div>
  );
}
