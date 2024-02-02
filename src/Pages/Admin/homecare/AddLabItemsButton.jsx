import React, { useState } from "react";
import buttonImage from "../../../assets/images/element-plus.png";
import AddImage from "../../../assets/images/addImage.png";
import FilterDropDown from "./FilterDropDown";
import AddSubtestModal from "./LabItems/lab_components/AddSubtestModal";
import AddSubCategoryModal from "../../../components/Modal/AddSubCategory";

function AddLabItemsButton({ text }) {
  const [addSubTestingModal, setAddSubTestingModal] = React.useState(false);
  const [showModal, setShowModal] = React.useState(false);

  return (
    <div>
      <button
        className="rounded bg-black text-white p-3 items-center flex bg-no-repeat"
        // onClick={() => callback()}
      >
        <img src={buttonImage} className="w-5 h-5 mr-2 object-contain" alt="" />
        <div className="sm:block">{text}</div>
      </button>
    </div>
  );
}

export default AddLabItemsButton;
