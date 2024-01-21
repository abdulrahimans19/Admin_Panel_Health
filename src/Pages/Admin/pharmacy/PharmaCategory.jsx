import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pharmacyNav } from "../../../Redux/Features/NavbarSlice";
import CatCard from "../../../components/CatCard";
import lungsimg from "../../../assets/images/3d-fluency-lungs.png";
import heartimg from "../../../assets/images/heart.png";
export default function PharmaCategory() {
  const [categoryMenu, setCategoryMenu] = useState(true);

  const dispatch = useDispatch();

const changeCategory=()=>
{
    setCategoryMenu(!categoryMenu)
}
const abc = { name: "Pulmonology", image: lungsimg };
const ab = { name: "Hepatology", image: heartimg };
const editCat = (data) => {
  console.log(data);
};


  useEffect(() => {
    dispatch(pharmacyNav());
  }, []);
  return (
    <div>
      <div className="flex gap-3 p-3">
        <p
          onClick={() => {
            changeCategory()
          }}
          className={`${
            categoryMenu && "font-bold underline"
          }  text-xl  underline-offset-8 decoration-4 cursor-pointer`}
        >
          Categories
        </p>
        <p
          onClick={() => {

            changeCategory()

          }}
          className={`${
            !categoryMenu && "font-bold underline"
          }   cursor-pointer text-xl underline-offset-8 decoration-4`}
        >
          SubCategory
        </p>
      </div>

      <div>
        <h4 className="text-4xl font-semibold p-4 ">{categoryMenu?"Categories":"sub Categories"}</h4>
        <p className="p-2 pl-3 text-gray-600 font-semibold">5 categories</p>
      </div>
<div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4 mt-6">
        <CatCard data={ab} callback={editCat} />
        <CatCard data={abc} callback={editCat} />
        <CatCard data={abc} callback={editCat} />
        <CatCard data={abc} callback={editCat} />
        <CatCard data={abc} callback={editCat} />
      </div>
</div>
      
    </div>
  );
}
