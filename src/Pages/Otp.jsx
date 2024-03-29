import React, { useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { VerifyEmail, forgotOtp } from "../API/ApiCall";

import mail from "../assets/images/mail.png";
import key from "../assets/images/message.png";

const Otp = () => {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [verificationError, setVerificationError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const inputRefs = useRef([0, 1, 2, 3].map(() => React.createRef()));

  const { email, flow } = location.state || { email: null, flow: null };

  const handleVerification = () => {
    const otpString = otp.join("");

    const apiFunction = flow === "forgot" ? forgotOtp : VerifyEmail;

    apiFunction(email, otpString)
      .then((response) => {
        if (response.data.statusCode === 200 && response.data.status) {
          if (response.data.message === "Valid OTP") {
            if (response.data.data && response.data.data.reset_password_token) {
              const nextState = {
                email,
                reset_password_token: response.data.data.reset_password_token,
              };

              navigate("/set-password", { state: nextState });
            } else {
              console.error("No reset password token provided in response.");
              setVerificationError(
                "No reset password token provided. Please try again or contact support."
              );
            }
          } else if (
            response.data.message ===
            "Email successfully verified, waiting for admin confirmation"
          ) {
            const messageState = { message: response.data.message };

            navigate("/login", { state: messageState });
          }
        } else {
          setVerificationError(
            response.data.message ||
              "An unexpected error occurred. Please try again."
          );
        }
      })
      .catch((err) => {
        console.error(err, "OTP verification error");
        const errorMsg =
          err.response?.data?.message ||
          "Error verifying OTP. Please try again.";
        setVerificationError(errorMsg);
      });
  };

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1);
    setOtp(newOtp);

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].current.focus();
    }
  };

  const handleKeyDown = (event, index) => {
    if (event.key === "Backspace" && !otp[index]) {
      event.preventDefault();
      if (index > 0) {
        inputRefs.current[index - 1].current.focus();
      }
    }
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <div className="flex flex-1 flex-col items-center justify-center lg:px-0 px-4">
        <div className="w-full max-w-lg flex-col justify-start items-center gap-6 inline-flex">
          <div className="flex-col justify-center items-center gap-8 flex">
            <div className="w-32 h-32 relative">
              <img
                className="absolute w-24 h-auto left-4 top-4"
                src={key}
                alt="Key"
              />
            </div>
            <div className="text-zinc-800 text-3xl lg:text-5xl font-bold">
              Enter your OTP
            </div>
            <div className="text-center text-neutral-400">
              Please enter the four-digit verification code we sent to
              <br />
              <span className="font-bold">{location.state?.email}</span>
            </div>
            <div className="flex justify-center items-center gap-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  className="w-16 h-16 bg-neutral-300 rounded-lg text-center text-2xl"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  ref={inputRefs.current[index]}
                />
              ))}
            </div>
            <button
              className="h-14 px-20 bg-gradient-to-r from-sky-950 via-blue-950 to-cyan-900 rounded-full flex justify-center items-center"
              onClick={handleVerification}
            >
              <span className="text-white text-xl font-semibold">
                Confirm OTP
              </span>
            </button>
            {verificationError && (
              <div className="text-red-500">{verificationError}</div>
            )}
            <a href="/login" className="text-zinc-800 text-lg">
              Back to login
            </a>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex flex-1 items-center justify-center">
        <img
          src={mail}
          alt="Mail"
          className="max-w-xs lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl"
        />
      </div>
    </div>
  );
};

export default Otp;
