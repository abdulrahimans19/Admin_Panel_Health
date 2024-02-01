import React, { useState } from "react";
import { motion } from "framer-motion";
import { addWithdrawRequest } from "../../../../API/ApiCall";

function WithdrawModal({ showModal, isShowModal, profile }) {
  const [formData, setFormData] = useState({
    amount: "",
    name: "",
    country: "",
    bank_name: "",
    account_type: "",
    account_number: "",
    swift_code: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setFormErrors({
      ...formErrors,
      [name]: null,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};

    if (!formData.amount.trim()) {
      errors.amount = "Amount is required";
    }
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }
    console.log(formData.country, " @@@@@@@@@@@");
    if (!formData.country.trim()) {
      errors.country = "country is required";
    }
    if (!formData.bank_name.trim()) {
      errors.bank_name = "country is required";
    }
    if (!formData.account_type.trim()) {
      errors.account_type = "country is required";
    }
    if (!formData.account_number.trim()) {
      errors.account_number = "country is required";
    }
    if (!formData.swift_code.trim()) {
      errors.swift_code = "country is required";
    }
    // Add more validation rules as needed

    if (Object.keys(errors).length === 0) {
      addWithdrawRequest(formData)
        .then((data) => {
          console.log(data);

          setFormData({
            amount: "",
            name: "",
            country: "",
            bank_name: "",
            account_type: "",
            account_number: "",
            swift_code: "",
          });

          isShowModal();
        })
        .catch((err) => {
          console.log(err.response.data.data.message);

          errors.confict = err?.response?.data?.data?.message
            ? err?.response?.data?.data?.message
            : "Something went wrong";
          setFormErrors(errors);
        });
      //Conflict
    } else {
      setFormErrors(errors);
    }
  };

  const animationVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { y: 30, opacity: 1 },
  };

  const screenWidth = window.screen.width;
  console.log("Screen Width: " + screenWidth + " pixels");
  const animationTransition = {
    type: "spring",
    damping: 10,
    stiffness: 100,
  };

  return (
    <div>
      <div>
        {showModal ? (
          <div className="container ">
            <div className=" justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="container flex justify-center">
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={animationVariants}
                  transition={animationTransition}
                  style={{
                    position: "absolute",
                    bottom: 0,
                    transform: "translateX(-50%)",
                    padding: "20px",
                    borderRadius: "8px",
                  }}
                  className="relative w-auto my-6 mx-auto max-w-3xl  flex justify-center "
                >
                  <form onSubmit={handleSubmit}>
                    <div className="p-3  shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      <div className="flex justify-between p-2 mt-5">
                        <div>
                          <h1 className="font-[30px] fond-bold text-xl">
                            Withdraw Cash
                          </h1>
                        </div>
                        <button onClick={() => isShowModal()}>x</button>
                      </div>
                      <div className="relative mb-10">
                        <p className="absolute right-0 text-sm mt-3">
                          Balance: {profile && profile?.wallet} AED
                        </p>
                      </div>
                      <div className="text-center">
                        <span className="text-red-500 text-center">
                          {formErrors && formErrors.name
                            ? formErrors.name
                            : formErrors.country
                            ? formErrors?.country
                            : formErrors?.swift_code
                            ? formErrors?.swift_code
                            : formErrors?.amount
                            ? formErrors?.amount
                            : formErrors?.account_number
                            ? formErrors.account_number
                            : formErrors.account_type
                            ? formErrors.account_type
                            : formErrors.confict
                            ? formErrors.confict
                            : ""}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 mt-3">
                        <div className="">
                          <p className="mb-2">Name</p>
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            className="p-2 outline-none border border-gray-400 rounded-lg w-auto h-10"
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="">
                          <p className="mb-2">Country</p>
                          <select
                            name="country"
                            className="p-2 outline-none border border-gray-400 rounded-lg w-auto h-10"
                            value={formData.country}
                            onChange={handleInputChange}
                          >
                            <option>Select country</option>
                            <option value="United States">United States</option>
                            <option value="United Arab Emirates">
                              United Arab Emirates
                            </option>
                            <option value="India">India</option>
                          </select>
                          <div></div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 mt-10">
                        <div className="">
                          <p className="mb-2">Swift code</p>
                          <input
                            type="text"
                            name="swift_code"
                            value={formData.swift_code}
                            className="p-2 outline-none border border-gray-400 rounded-lg w-auto h-10"
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="">
                          <p className="mb-2">Amount to withdraw</p>
                          <input
                            type="number"
                            name="amount"
                            value={formData.amount}
                            className="p-2 outline-none border border-gray-400 rounded-lg w-auto h-10"
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 mt-10">
                        <div className="">
                          <p className="mb-1">Bank name</p>
                          <input
                            type="text"
                            name="bank_name"
                            value={formData.bank_name}
                            className="p-2 outline-none border border-gray-400 rounded-lg w-auto h-10"
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="">
                          <p className="mb-1">Account number</p>
                          <input
                            type="text"
                            name="account_number"
                            value={formData.account_number}
                            className="p-2 outline-none border border-gray-400 rounded-lg w-auto h-10"
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="flex justify-center mt-3 text-center">
                        <div>
                          <p>Account Type</p>
                          <input
                            type="text"
                            name="account_type"
                            value={formData.account_type}
                            className="mt-1 p-2 outline-none border border-gray-400 rounded-lg w-auto h-10"
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4 mt-5 p-5">
                        <button
                          className="rounded-lg h-10 w-[150px] text-white"
                          style={{ backgroundColor: "rgba(36, 168, 250, 1)" }}
                          type="submit"
                        >
                          Request
                        </button>
                        <button
                          className="rounded-lg border border-1 border-blue-300 h-10 w-[150px] text-blue-400"
                          onClick={() => isShowModal()}
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </form>
                </motion.div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default WithdrawModal;
