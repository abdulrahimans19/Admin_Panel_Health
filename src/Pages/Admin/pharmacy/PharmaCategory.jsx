import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pharmacyNav } from "../../../Redux/Features/NavbarSlice";

export default function PharmaCategory() {
  const [categoryMenu, setCategoryMenu] = useState(true);

  const dispatch = useDispatch();

const changeCategory=()=>
{
    setCategoryMenu(!categoryMenu)
}


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
          Category
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
        <h4 className="text-4xl font-semibold ">{categoryMenu?"category":"sub category"}</h4>
        <p className="p-2">5 categories</p>
      </div>

      
    </div>
  );
}
