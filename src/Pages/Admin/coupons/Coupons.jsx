import React, { useEffect, useState } from "react";
import offerIcon from "../../../assets/images/offer_icon.png";
import AddItemButton from "../../../components/Button/AddItemButton";
import buttonImage from "../../../assets/images/element-plus.png";
import MovieTicketCard from "../../../components/Cards/CouponCard";
import CouponModal from "../../../components/Modal/CouponModal";
import {
  addCouponApi,
  getAllCouponsApi,
  updateCouponApi,
} from "../../../API/ApiCall";
export default function Coupons() {
  const [openCouponModal, setOpenCouponModal] = useState(false);
  const [editCouponModal, setEditCouponModal] = useState(false);
  const [couponData, setCouponData] = useState([]);
  const [cardData, setCardData] = useState();

  const editCoupon = (data) => {
    setCardData(data);
    setEditCouponModal(true);
    console.log(data);
  };

  const getAllCoupons = () => {
    getAllCouponsApi(1)
      .then(({ data }) => {
        console.log(data.data.coupons);
        setCouponData(data.data.coupons);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllCoupons();
  }, []);
  return (
    <div className="container">
      <div className="flex justify-end">
        <div
          onClick={() => {
            setOpenCouponModal(true);
          }}
        >
          <AddItemButton img={offerIcon} text={"add coupon"} />
        </div>
      </div>

      <div className="mt-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {couponData.map((data) => {
            return <MovieTicketCard data={data} callback={editCoupon} />;
          })}
        </div>
      </div>

      {openCouponModal && (
        <CouponModal
          getAllCoupons={getAllCoupons}
          onClose={setOpenCouponModal}
          apicall={addCouponApi}
        />
      )}
      {editCouponModal && (
        <CouponModal
          getAllCoupons={getAllCoupons}
          onClose={setEditCouponModal}
          displayData={cardData}
          apicall={updateCouponApi}
        />
      )}
    </div>
  );
}
