import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { pharmacyNav } from "../../../Redux/Features/NavbarSlice";
import lungsimg from "../../../assets/images/3d-fluency-lungs.png";
import heartimg from "../../../assets/images/heart.png";
import ComunButton from "../../../components/Navbar/ComenButton";
import CatCard from "../../../components/Tables/Cards/CatCard";

export default function PharmaProduct() {
  const [categoryMenu, setCategoryMenu] = useState(true);

  const changeCategory = () => {
    setCategoryMenu(!categoryMenu);
  };

  const dispatch = useDispatch();
  const editCat = (data) => {
    console.log(data);
  };
  const addcategory = () => {
    console.log("add category modal");
  };

  const abc = { name: "Pulmonology", image: lungsimg };
  const ab = { name: "Hepatology", image: heartimg };
  useEffect(() => {
    dispatch(pharmacyNav());
  }, []);
  return (
    <div>
      <div className="flex gap-3 p-3">
        <p
          onClick={() => {
            changeCategory();
          }}
          className={`${
            categoryMenu && "font-bold underline"
          }  text-xl  underline-offset-8 decoration-4 cursor-pointer`}
        >
          Categories
        </p>
        <p
          onClick={() => {
            changeCategory();
          }}
          className={`${
            !categoryMenu && "font-bold underline"
          }   cursor-pointer text-xl underline-offset-8 decoration-4`}
        >
          SubCategory
        </p>
      </div>

      <div className="flex justify-between">
        <div>
          <h4 className="text-4xl font-semibold p-4 ">
            {categoryMenu ? "Categories" : "sub Categories"}
          </h4>
          <p className="p-2 pl-3 text-gray-600 font-semibold">5 categories</p>
        </div>
        <div>
          <ComunButton text={"Add new categories"} callback={addcategory} />

          <div className="flex items-center px-2.5 mt-4 py-0.5 text-base font-semibold text-green-500 text-center">
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
                 <option disabled value="">
              Filter By Category
              </option>
              <option  value="full">
                full body
              </option>
              <option value="Fever">Fever</option>
            </select>
          </div>
        </div>
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
