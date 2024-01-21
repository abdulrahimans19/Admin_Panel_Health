import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { homecare } from '../../../Redux/Features/NavbarSlice';
import ComunButton from '../../../components/Navbar/ComenButton';

export function HomecareLabItems() {
    const dispatch = useDispatch();
  useEffect(() => {
    dispatch(homecare())
  }, [])
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
          <p>0 available items</p>
        </div>
        <ComunButton text={"Add Lab Items"} callback={addcategory} />
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4 mt-6">
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4 mt-6">
      </div>
    </div>
  )
}

