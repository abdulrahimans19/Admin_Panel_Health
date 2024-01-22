import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { telemedicine } from "../../../Redux/Features/NavbarSlice";
import CatCard from "../../../components/Tables/Cards/CatCard";
import lungsimg from "../../../assets/images/3d-fluency-lungs.png";
import heartimg from "../../../assets/images/heart.png";
import ComunButton from "../../../components/Navbar/ComenButton";
import Modal from "../../../components/Modal";

export default function TeleMedicine() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(telemedicine());
  }, []);

  const abc = { name: "Pulmonology", image: lungsimg };
  const ab = { name: "Hepatology", image: heartimg };

  const [showModal, setShowModal] = useState(false);

  const editCat = (data) => {
    console.log(data);
  };

  const addcategory = () => {
    setShowModal(true);
  };

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h2
            className="font-bold text-lg"
            style={{ fontWeight: 500, fontSize: "32px" }}
          >
            Categories
          </h2>
          <p>2 available categories</p>
        </div>
        <ComunButton text={"Add new categories"} callback={addcategory} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4 mt-6">
        <CatCard data={ab} callback={editCat} />
        <CatCard data={abc} callback={editCat} />
        <CatCard data={abc} callback={editCat} />
        <CatCard data={abc} callback={editCat} />
        <CatCard data={abc} callback={editCat} />
      </div>

      {showModal && <Modal setShowModal={setShowModal} />}
    </div>
  );
}
