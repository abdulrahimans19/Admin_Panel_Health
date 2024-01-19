import React from "react";
import forgotImage from "../assets/images/forgot.png";
import key from "../assets/images/key.png";

const ForgotPassword = () => {
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
        <img src={forgotImage} alt="Centered Image" style={imageStyle} />
      </div>
      <div style={rightSideStyle}>
        <div className="w-[540px] h-[624px] flex-col justify-start items-center gap-[60px] inline-flex">
          <div className="w-[126px] h-[126px] relative">
            <img
              className="w-24 h-[97.77px] left-[15px] top-[19px] relative"
              src={key}
              alt="Key"
            />
          </div>
          <div className="flex-col justify-start items-center gap-[60px] flex">
            <div className="flex-col justify-start items-center gap-[17px] flex">
              <div className="text-zinc-800 text-5xl font-bold font-['Roboto Flex']">
                Forgot password?
              </div>
              <div className="text-neutral-400 text-2xl font-normal font-['Roboto Flex']">
                Don’t worry, we’ll send you the reset instructions
              </div>
            </div>
            <div className="flex-col justify-center items-center gap-[10px] flex">
              <div className="flex flex-col items-center justify-center space-y-4 ">
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  className="w-[400px] appearance-none rounded-full border-2  p-3 px-4 focus:bg-slate-100 focus:ring-2 focus:ring-blue-300"
                />
                <div></div>
              </div>

              <div className="flex-col justify-start items-center  flex">
                <button className="h-[58px] px-[105px] py-[30px] bg-gradient-to-r from-sky-950 via-blue-950 to-cyan-900 rounded-[60px] flex-col justify-center items-center gap-1 flex">
                  <div className="text-white text-2xl font-semibold font-['Roboto Flex']">
                    Reset Password
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className="justify-center items-center inline-flex">
            <div className="w-6 h-6 relative origin-top-left rotate-180"></div>
            <a
              href="/login"
              className="text-zinc-800 text-1xl font-normal font-['Roboto Flex']"
            >
              Back to login
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
