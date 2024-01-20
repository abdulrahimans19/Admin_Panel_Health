import React, { useState } from "react";
import mail from "../assets/images/mail.png";
import key from "../assets/images/message.png";

const Otp = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);

  const containerStyle = {
    display: "flex",
    height: "100vh",
    width: "100%",
  };

  const leftSideStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  };

  const rightSideStyle = {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const handleOtpChange = (index, value) => {
    // Update the OTP state based on user input
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
  };

  return (
    <div style={containerStyle}>
      <div style={leftSideStyle}>
        <div className="w-[540px] h-[746px] flex-col justify-start items-center gap-[20px]  inline-flex">
          <div className="flex-col justify-center items-center gap-[92px] flex">
            <div className="flex-col justify-start items-center gap-[66px] flex">
              <div className="flex-col justify-start items-center gap-[49px] flex">
                <div className="w-[126px] h-[126px] relative">
                  <img
                    className="w-24 h-[87.77px] left-[15px] top-[69px] relative"
                    src={key}
                    alt="Key"
                  />
                  <div className="w-14 h-14 left-[35px] top-[35px] absolute justify-center items-center inline-flex">
                    <div className="w-14 h-14 relative"></div>
                  </div>
                </div>
                <div className="text-zinc-800 text-5xl font-bold font-['Roboto Flex']">
                  Enter your OTP
                </div>
                <div className="text-center text-neutral-400">
                  <span
                    style={{
                      color: "neutral-400",
                      fontSize: "2xl",
                      fontWeight: "normal",
                      fontFamily: "Roboto Flex",
                      lineHeight: "loose",
                    }}
                  >
                    Please enter the four-digit verification code we sent to
                    <br />
                  </span>
                  <span
                    style={{
                      color: "neutral-400",
                      fontSize: "2xl",
                      fontWeight: "bold",
                      fontFamily: "Roboto Flex",
                      lineHeight: "loose",
                    }}
                  >
                    example@gmail.com
                  </span>
                </div>
              </div>
              <div className="justify-center items-center gap-4 inline-flex">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    type="text"
                    className="w-[65px] h-[65px] bg-neutral-300 rounded-[10px] text-center"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                  />
                ))}
              </div>
            </div>
            <div className="flex-col justify-start items-start  flex">
              <button className="h-[58px] px-[70px] py-[30px] bg-gradient-to-r from-sky-950 via-blue-950 to-cyan-900 rounded-[60px] flex-col justify-center items-center gap-1 flex">
                <div className="text-white text-2xl font-semibold font-['Roboto Flex']">
                  Redirect to Email
                </div>
              </button>
            </div>
          </div>
          <div className="justify-center items-center gap-1 inline-flex">
            <a
              href="/login"
              className="text-zinc-800 text-1xl font-normal font-['Roboto Flex']"
            >
              Back to login
            </a>
          </div>
        </div>
      </div>

      <div style={rightSideStyle}>
        <img
          src={mail}
          alt="Centered Image"
          style={{ maxWidth: "60%", maxHeight: "70%" }}
        />
      </div>
    </div>
  );
};

export default Otp;
