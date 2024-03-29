import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { telemedicine } from "../../../Redux/Features/NavbarSlice";

import lungsimg from "../../../assets/images/3d-fluency-lungs.png";
import heartimg from "../../../assets/images/heart.png";
import ComunButton from "../../../components/Navbar/ComenButton";
import CatCard from "../../../components/Cards/CatCard";
import {
  MainDoctorCategories,
  teliUpadateCate,
  teliaddCategory,
} from "../../../API/ApiCall";
import CatInfoModal from "../../../components/Modal/ViewCatInfo";
import AddCategory from "../../../components/Modal/AddCategory";
import NoDataImage from "../../../components/NoDataImage";

export default function TeleMedicine() {
  const [categories, setCategories] = useState([]);
  const [viewCatInfoModal, setViewCatInfoModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [editShowModal, setEditShowModal] = useState(false);
  const [editData, setEditData] = useState();
  const [isLoding, setIsLoding] = useState(true);
  const [showNoCategories, setShowNoCategories] = useState(false);

  const getCategory = () => {
    MainDoctorCategories()
      .then((data) => {
        setCategories(data?.data?.data?.mainCategories);
        setIsLoding(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoding(false);
      });
  };
  const isShowModal = () => {
    setShowModal(!showModal);
  };
  const editCat = (data) => {
    setEditShowModal(true);

    setEditData(data);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(telemedicine());
    getCategory();

    const delay = setTimeout(() => {
      setShowNoCategories(true);
    }, 10000);

    return () => clearTimeout(delay);
  }, []);
  const viewCatInfo = (data) => {
    setEditData(data);

    setViewCatInfoModal(true);
  };

  return (
    <div className="container mt-5">
      <div className="sm:flex justify-between">
        <div>
          <h2 className="font-bold text-500" style={{ fontSize: "20px" }}>
            Categories
          </h2>
          <p className="text-gray-400 text-xs">
            {categories.length} available categories
          </p>
        </div>
        <div className="mt-5 sm:mt-0">
          <ComunButton text={"Add new categories"} callback={isShowModal} />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4 mt-6">
        {isLoding ? (
          <div>Loding.....</div>
        ) : (
          categories[0] &&
          categories.map((data) => {
            return (
              <CatCard
                viewCatInfo={viewCatInfo}
                data={data}
                callback={editCat}
              />
            );
          })
        )}
      </div>

      {showModal && (
        <AddCategory
          catFunction={teliaddCategory}
          setShowModal={setShowModal}
          GetPharmacyCat={getCategory}
        />
      )}
      {categories && categories.length === 0
        ? showNoCategories && (
            <div className="mt-10">
              <NoDataImage text={"No Categories available"} />{" "}
            </div>
          )
        : ""}
      {editShowModal && (
        <AddCategory
          catFunction={teliUpadateCate}
          incomingType={"edit"}
          dataToUpload={editData}
          setShowModal={setEditShowModal}
          GetPharmacyCat={getCategory}
        />
      )}
      {viewCatInfoModal && (
        <CatInfoModal
          catInfo={editData}
          setViewCatInfoModal={setViewCatInfoModal}
        />
      )}
    </div>
  );
}
