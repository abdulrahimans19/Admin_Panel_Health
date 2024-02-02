import React from "react";
import { useNavigate } from "react-router-dom";

import success from "../assets/images/success.png";
import logo from "../assets/images/key.png";

const Success = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate("/login");
  };
  return (
    <div className="flex flex-wrap h-screen">
      <div className="w-full md:w-1/2 flex justify-center items-center p-4">
        <img
          src={success}
          alt="Success"
          className="max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg 2xl:max-w-xl mx-auto"
        />
      </div>
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-4">
        <img src={logo} alt="Logo" className="w-24 h-auto mb-8" />
        <div className="text-center">
          <h2 className="text-zinc-800 text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Password reset
          </h2>
          <p className="text-neutral-400 text-lg md:text-xl lg:text-2xl mb-10">
            Your Password has been successfully reset. <br />
            Please try to login again with the new password.
          </p>
        </div>
        <button
          onClick={handleSubmit}
          className="w-full  lg:w-[400px] h-[54px] bg-gradient-to-r from-sky-950 via-blue-950 to-cyan-900 rounded-[60px] flex items-center justify-center"
          type="submit"
        >
          <span className="text-white font-semibold">Continue to Login</span>
        </button>
      </div>
    </div>
  );
};

export default Success;
