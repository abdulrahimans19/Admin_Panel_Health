import React from "react";
import success from "../assets/images/success.png";
import logo from "../assets/images/key.png";

const Success = () => {
  const containerStyle = {
    display: "flex",
    height: "100vh",
    width: "100%",
  };

  const leftSideStyle = {
    flex: 1,
    position: "relative",
  };

  const imageStyle = {
    maxWidth: "70%",
    maxHeight: "60%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  const rightSideStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div style={containerStyle}>
      <div style={leftSideStyle}>
        <img src={success} alt="Centered Image" style={imageStyle} />
      </div>
      <div style={rightSideStyle}>
        <div class="w-[540px] h-[463px] flex-col justify-start items-center gap-[60px] inline-flex">
          <div class="w-[126px] h-[126px] relative">
            {/* <div class="w-[126px] h-[126px] left-0 top-0 absolute bg-gradient-to-b from-teal-500 to-zinc-300 rounded-full"></div> */}
            <img
              class="w-24 h-[87.77px] left-[15px] top-[19px] relative "
              src={logo}
            />
            {/* <img src={logo} alt="Logo" style={logoStyle} /> */}
          </div>
          <div class="flex-col justify-start items-center gap-[60px] flex">
            <div class="flex-col justify-start items-center gap-[60px] flex">
              <div class="flex-col justify-start items-center gap-[17px] flex">
                <div class="text-zinc-800 text-5xl font-bold font-['Roboto Flex']">
                  Password reset
                </div>
                <div class="text-center text-neutral-400 text-2xl font-normal font-['Roboto Flex']">
                  Your Password has been successfully reset
                  <br />
                  please try to login again with the new password
                </div>
              </div>
              <div class="flex-col justify-start items-start gap-[30px] flex">
              <button className="h-[68px] px-[80px] py-[30px] bg-gradient-to-r from-sky-950 via-blue-950 to-cyan-900 rounded-[60px] flex-col justify-center items-center gap-1 flex">
                  <div className="text-white text-2xl font-semibold font-['Roboto Flex']">
                    Done
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Success;
