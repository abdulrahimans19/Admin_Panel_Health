// src/Modal.js

import React, { useEffect, useState } from "react";
import { addCouponApi, createSubCategory } from "../../API/ApiCall";
import DateInput from "../../Pages/Admin/homecare/appoinments/DateInput";

const CouponModal = ({ onClose, displayData, getAllCoupons,apicall }) => {
  const [errors, setErrors] = useState({});
  const [subCategories, setSubCategories] = useState();
  const [subCatName, setSubCatName] = useState("");
  const [selectedDate, setSelectedDate] = useState();
  const handleOptionChange = (e) => {
    const selectedOption = e.target.value;
    setSubCategories(selectedOption);
  };

  const validateSelectedDate = (date) => {
    if (!date) return "Expiry date is required";
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of the day
    if (date < today) return "Expiry date cannot be in the past";
    return "";
  };
  const validateDiscount = (discount) => {
    if (!discount) return "Discount percentage is required";
    if (isNaN(discount) || discount <= 0 || discount > 100) {
      return "Invalid discount percentage";
    }
    return "";
  };
  const validateCouponCode = (code) => {
    if (!code) return "Coupon code is required";
    // Add any other specific validations here (e.g., length, format)
    return "";
  };

  const validateAmount = (amount) => {
    if (!amount) return "Amount is required";
    if (isNaN(amount) || amount <= 0) return "Invalid amount";
    return "";
  };


  const addCoupon = (e) => {
    e.preventDefault();



    const form = new FormData(e.target);
    const UserData = Object.fromEntries(form);



    const couponCodeError = validateCouponCode(UserData.coupon_code);
    const discountError = validateDiscount(UserData.discount);
    const amountError = validateAmount(UserData.amount);
    const selectedDateError = validateSelectedDate(selectedDate);
console.log(selectedDateError);
    if (couponCodeError || discountError || amountError ||selectedDateError) {
      console.log("errpr");
      setErrors({ couponCodeError, discountError, amountError,selectedDateError });
      return; // Stop submission if there are errors
    }

    console.log(UserData);
    console.log(selectedDate);
    const myDate = new Date(selectedDate);
    const isoString = myDate.toISOString();
let wholeData
if(displayData){
    wholeData = {
        coupon_id:displayData._id,
        code: UserData.coupon_code,
        discount_percentage: parseInt(UserData.discount),
        min_amount: parseInt(UserData.amount),
        expiry_date: isoString,
      };
}else
{
    wholeData = {
        code: UserData.coupon_code,
        discount_percentage: parseInt(UserData.discount),
        min_amount: parseInt(UserData.amount),
        expiry_date: isoString,
      };
}

  


    apicall(wholeData)
      .then((data) => {
        getAllCoupons(1);
        onClose(false);
        console.log(data);
      })
      .catch((err) => {
        getAllCoupons(1);
        onClose(false);
      });
  };

  useEffect(() => {
    if (displayData) {
      console.log(new Date(displayData?.expiry_date));
      setSelectedDate(new Date(displayData?.expiry_date));
    }
  }, []);

  const DateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <div className="fixed inset-0 flex items-center justify-center z-40">
      <div className="bg-black opacity-50 fixed inset-0"></div>
      <form
        className="bg-white p-8 max-w-md w-full rounded-lg shadow-lg z-50"
        onSubmit={addCoupon}
        action="
"
      >
        <div className="">
          <h2 className="text-2xl font-bold mb-4">Add Coupon</h2>

          <label className="block text-sm font-medium text-gray-700 mt-2">
            coupon Code
          </label>

          <input
            type="text"
            name="coupon_code"
            className="mt-1 p-2 border rounded-md w-full"
            defaultValue={displayData?.code}
          />
           {errors.couponCodeError && (
            <p className="text-red-500 text-xs">{errors.couponCodeError}</p>
          )}
          <label className="block text-sm font-medium text-gray-700 mt-2">
            discount percentage
          </label>

          <input
            type="number"
            name="discount"
            className="mt-1 p-2 border rounded-md w-full"
            defaultValue={displayData?.discount_percentage}
            // onChange={(e) => handleInputChange(index, e)}
          />
   {errors.discountError && (
            <p className="text-red-500 text-xs">{errors.discountError}</p>
          )}

          <label className="block text-sm font-medium text-gray-700 mt-2">
            amount
          </label>

          <input
            type="number"
            name="amount"
            defaultValue={displayData?.min_amount}
            className="mt-1 p-2 border rounded-md w-full"
            // onChange={(e) => handleInputChange(index, e)}
          />
              {errors.amountError && (
            <p className="text-red-500 text-xs">{errors.amountError}</p>
          )}
          <label className="block text-sm font-medium text-gray-700 mt-2">
            select date
          </label>
          <DateInput
            label={"expiring date"}
            selectedDate={selectedDate}
            onChange={DateChange}
          />
              {errors.selectedDateError && (
            <p className="text-red-500 text-xs">{errors.selectedDateError}</p>
          )}
          <div className="flex justify-end mt-3">
      
            <button
              type="submit"
              className="bg-green-200 text-green-500 px-4 py-2 rounded-md hover:bg-green-300"
            >
              Submit
            </button>
            <button
              className="ml-2 text-red-500 bg-red-200  px-4 py-2 rounded-md"
              onClick={() => {
                onClose(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CouponModal;
