import React, { useEffect, useState } from "react";
import { homecare } from "../../../Redux/Features/NavbarSlice";
import image from "../../../assets/images/doctor-ittle-girl.png";
import feverImage from "../../../assets/images/face-thermometer.png";
import { useDispatch } from "react-redux";
import Button from "../../../components/Button";

import ComunButton from "../../../components/Navbar/ComenButton";
import AddNewCategoryButton from "./AddNewCategoryButton";
import CatCard from "../../../components/Cards/CatCard";
import { GetHomecareCategories, GetHomecareCategoriesApi } from "../../../API/ApiCall";

export default function Homecare() {
  const dispatch = useDispatch();
  const [homeCareCategories, setHomeCareCategory] = useState([]);
  useEffect(() => {
    getHomecareCategories();
    dispatch(homecare());
  }, []);
  function addCategory() {
    console.log("this is add category in homecare @@@@@@@");
  }
  const editCat = (data) => {
    console.log(data);
  };
  const getHomecareCategories = () => {
    GetHomecareCategoriesApi().then((data) => {
      setHomeCareCategory(data.data.data.mainCategories);
    });
  };
  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h2 className="font-bold text-lg">Categories</h2>
          <p>{homeCareCategories.length} available categories</p>
        </div>
        <ComunButton text={"Add new categories"} callback={addCategory} />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4 mt-6"></div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4 mt-6">
        {homeCareCategories[0] &&
          homeCareCategories.map((data) => {
            return (
              <CatCard
                data={data}
                showModal={true}
                callback={editCat}
                isHomecareCategory={true}
              />
            );
          })}
      </div>
    </div>
  );
}
