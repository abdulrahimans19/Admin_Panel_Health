import React, { useState } from "react";
import buttonImage from "../../assets/images/element-plus.png";
import AddImage from "../../assets/images/addImage.png";
import AddCategoryModal from "../Modal/AddCategoryModal";
import AddCategory from "../Modal/AddCategory";
import { teliaddCategory } from "../../API/ApiCall";

export default function ComunButton({ text, callback }) {
  const [showModal, setShowModal] = React.useState(false);
  function isShowModal() {
    setShowModal(!showModal);
  }
  function addCategory() {
    console.log("hiihiiihi");
  }
  return (
    <div>
      <button
        className="rounded bg-black text-white p-3 items-center flex bg-no-repeat"
        onClick={() => setShowModal(true)}
      >
        <img src={buttonImage} className="w-5 h-5 mr-2 object-contain" alt="" />
        <div className="sm:block">{text}</div>
      </button>
      {showModal && (
        <AddCategory
          catFunction={teliaddCategory}
          setShowModal={setShowModal}
          // setShowModal={setAddCategoryModal}
          // GetPharmacyCat={GetPharmacyCat}
        />
      )}
      {/* <AddCategoryModal isShowModal={isShowModal} showModal={showModal} /> */}
      {/* {showModal && (
        <AddCategory catFunction={callback} setShowModal={setShowModal} />
      )}
      {/* {editCatModal && ( */}
    </div>
  );
}
