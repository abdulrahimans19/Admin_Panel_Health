import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { telemedicine } from "../../Redux/Features/NavbarSlice";
import CatCard from "../../components/CatCard";
import image from "../../assets//login/images/Doctor.png";
export default function TeleMedicine() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(telemedicine());
  }, []);

  const abc = { name: "sambh", image: image };

  const editCat = (data) => {
    console.log(data);
  };

  return (
    <div>
      <CatCard data={abc} callback={editCat} />
    </div>
  );
}
