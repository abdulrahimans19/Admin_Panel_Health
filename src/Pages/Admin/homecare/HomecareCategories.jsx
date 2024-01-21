import React, { useEffect } from 'react'
import { homecare } from '../../../Redux/Features/NavbarSlice';
import image from "../../../assets/login/images/Doctor.png";
import { useDispatch } from 'react-redux';
import Button from '../../../components/Button';
import CatCard from '../../../components/CatCard';
import ComunButton from '../../../components/Navbar/ComenButton';


export default function Homecare() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(homecare());
  }, []);
  const cardText = { name: "Full body checkup", image: image };
  function addcategory() {
    console.log("this is add category in homecare @@@@@@@");
  }
  const editCat = (data) => {
    console.log(data);
  };
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
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4 mt-6">
        <CatCard data={cardText} showModel={true} callback={editCat} />
        <CatCard data={cardText} showModel={true} callback={editCat} />
      </div>
    </div>
  )
}
