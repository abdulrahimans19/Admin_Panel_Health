import React, { useEffect } from 'react'
import { homecare } from '../../Redux/Features/NavbarSlice';
import image from "../../assets//login/images/Doctor.png";
import { useDispatch } from 'react-redux';
import Button from '../../components/Button';
import CatCard from '../../components/CatCard';


export default function Homecare() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(homecare());
  }, []);
  const category = { name: "Full body", image: image };
  const editCat = (data) => {
    console.log(data);
  };
  return (
  //   <div class="w-[1145px] h-[67px] justify-start items-center gap-[758px] inline-flex">
  //   <div class="flex-col justify-start items-start gap-2.5 inline-flex">
  //     <div class="text-neutral-800 text-[32px] font-medium font-['Roboto Flex']">Categories</div>
  //     <div class="text-neutral-500 text-base font-medium font-['Roboto Flex']">0 available categories</div>
  //   </div>
  //   <div class="p-4 bg-black rounded-[10px] justify-center items-center gap-[15px] flex">
  //     <div class="w-6 h-6 justify-center items-center flex">
  //       <div class="w-6 h-6 relative">
  //       </div>
  //     </div>
  //     <Button data={"Add new categories"} callback={()=>{
  //       console.log("wef");
  //     }}/>
  //   </div>
  //   <CatCard data={category} callback={editCat}/>
  // </div>
  <div class="w-full md:w-[1145px] mx-auto flex flex-col md:flex-row justify-start items-center md:gap-8">
  <div class="flex flex-col justify-between items-start gap-5">
      <div class="text-neutral-800 text-lg md:text-2xl font-medium font-['Roboto Flex']">Categories</div>
      <div class="text-neutral-500 text-base md:text-lg font-medium font-['Roboto Flex']">0 available categories</div>
  </div>
  <div class="p-4 bg-black rounded-[10px] flex justify-center items-center gap-3 md:ml-auto">
      <div class="w-6 h-6 justify-center items-center flex">
          <div class="w-6 h-6 relative"></div>
      </div>
      <button class="text-white text-sm md:text-base font-medium font-['Roboto Flex'] px-4 py-2 rounded-md">
          Add new categories
      </button>
  </div>
  {/* <!-- Assuming CatCard is another component -->
  <!-- <CatCard data={category} callback={editCat}/> --> */}
</div>

  )
}
