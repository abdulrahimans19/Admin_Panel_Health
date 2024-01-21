import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { telemedicine } from "../../Redux/Features/NavbarSlice";
import CatCard from "../../components/CatCard";
// import image from "../../assets//login/images/Doctor.png";
import lungsimg from "../../assets/images/3d-fluency-lungs.png";
import heartimg from "../../assets/images/heart.png";
import ComunButton from "../../components/Navbar/ComenButton";

export default function TeleMedicine() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(telemedicine());
  }, []);

  const abc = { name: "Pulmonology", image: lungsimg };
  const ab = { name: "Hepatology", image: heartimg };

  const editCat = (data) => {
    console.log(data);
  };

  function addcategory() {
    console.log("this is add category in telimedcin @@@@@@@");
  }
  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h2 className="font-bold text-lg">Categories</h2>
          <p>2 available categories</p>
        </div>
        <ComunButton text={"Add new categories"} callback={addcategory} />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4 mt-6">
        <CatCard data={ab} callback={editCat} />
        <CatCard data={abc} callback={editCat} />
        <CatCard data={abc} callback={editCat} />
        <CatCard data={abc} callback={editCat} />
        <CatCard data={abc} callback={editCat} />
      </div>
    </div>
  );
}
