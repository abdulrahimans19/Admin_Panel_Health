import React, { useState } from "react";
import { motion } from "framer-motion";
import { addWithdrawRequest } from "../../../../API/ApiCall";

function WithdrawModal({ showModal, isShowModal, profile }) {
  const [amount, setamount] = useState();
  const [name, setname] = useState();
  const [country, setcountry] = useState();
  const [bank_name, setbank_name] = useState();
  const [account_type, setaccount_type] = useState();
  const [account_number, setaccount_number] = useState();
  const [swift_code, setswift_code] = useState();
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior

    const wholedata = {
      amount: amount,
      name: name,
      country: country,
      bank_name: bank_name,
      account_type: account_type,
      account_number: account_number,
      swift_code: swift_code,
    };
    addWithdrawRequest(wholedata).then((data) => {
      console.log(data);
      setamount("");
      setname("");
      setcountry("");
      setbank_name("");
      setaccount_type("");
      setaccount_number("");
      setswift_code("");

      isShowModal();
    });
  };

  const animationVariants = {
    hidden: { y: 100, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

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
                  {/*content*/}

                  <form onSubmit={handleSubmit}>
                    <div className="p-3  shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      {/* Head */}
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
                      {/* {body} */}

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-2 mt-3">
                        <div className="">
                          <p className="mb-2">Name</p>
                          <input
                            required
                            type="text"
                            name="name" // This should match the key in your state
                            value={name}
                            className="p-2 outline-none border border-gray-400 rounded-lg w-auto h-10"
                            onChange={(e) => setname(e.target.value)}
                          />
                        </div>
                        <div className="">
                          <p className="mb-2">Country</p>
                          <select
                            required
                            name="country" // This should match the key in your state
                            className="w-full p-2 outline-none border border-gray-400 rounded-lg h-10"
                            value={country}
                            onChange={(e) => setcountry(e.target.value)}
                          >
                            <option selected>Select country</option>
                            <option value="United States">United States</option>
                            <option value="United Arab Emarits">
                              United Arab Emarits
                            </option>
                            <option value="india">India</option>
                          </select>
                        </div>
                      </div>
                      {/* secontinput */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-1 mt-10">
                        <div className="">
                          <p className="mb-2">Swift code</p>
                          <input
                            required
                            type="text"
                            name="swift_code" // This should match the key in your state
                            value={swift_code}
                            className="p-2 outline-none border border-gray-400 rounded-lg w-auto h-10"
                            onChange={(e) => setswift_code(e.target.value)}
                          />
                        </div>
                        <div className="">
                          <p className="mb-2">Amount to withdraw</p>
                          <input
                            required
                            type="text"
                            name="amount" // This should match the key in your state
                            value={amount}
                            className="p-2 outline-none border border-gray-400 rounded-lg w-auto h-10"
                            onChange={(e) => setamount(e.target.value)}
                          />
                        </div>
                      </div>
                      {/* third */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-2 mt-10">
                        <div className="">
                          <p className="mb-1">Bank name</p>
                          <input
                            required
                            type="text"
                            name="bank_name" // This should match the key in your state
                            value={bank_name}
                            className="p-2 outline-none border border-gray-400 rounded-lg w-auto h-10"
                            onChange={(e) => setbank_name(e.target.value)}
                          />
                        </div>
                        <div className="">
                          <p>Account number</p>
                          <input
                            required
                            type="text"
                            name="account_number" // This should match the key in your state
                            value={account_number}
                            className="p-2 outline-none border border-gray-400 rounded-lg w-auto h-10"
                            onChange={(e) => setaccount_number(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="flex justify-center mt-3 text-center">
                        <div>
                          <p>account_type</p>
                          <input
                            type="text"
                            name="account_type" // This should match the key in your state
                            value={account_type}
                            className="mt-1 p-2 outline-none border border-gray-400 rounded-lg w-auto h-10"
                            onChange={(e) => setaccount_type(e.target.value)}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-2 mt-5 p-5">
                        <button
                          onClick={() => {
                            console.log("hiiiiiiiiiiiiii");
                          }}
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
