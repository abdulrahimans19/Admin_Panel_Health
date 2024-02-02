import React, { useState } from "react";
import { DoctorForgotdata } from "../API/ApiCall";
import { useNavigate } from "react-router-dom";
import forgotImage from "../assets/images/forgot.png";
import key from "../assets/images/key.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const resetPassword = (e) => {
    e.preventDefault();
    setIsLoading(true); // Set isLoading to true right before making the API call
    DoctorForgotdata(email)
      .then((response) => {
        if (response.data.status && response.data.statusCode === 200) {
          navigate("/otp", { state: { email: email, flow: "forgot" } });
        } else {
          setErrMsg(
            response.data.message ||
              "An unexpected error occurred. Please try again."
          );
        }
      })
      .catch((error) => {
        if (error.response && error.response.data.statusCode === 401) {
          setErrMsg(error.response.data.data.message);
        } else {
          setErrMsg(
            error.response?.data?.message ||
              "An error occurred. Please try again later."
          );
        }
      })
      .finally(() => setIsLoading(false)); // Ensure isLoading is set back to false after the API call
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const imageStyle = {
    maxWidth: "100%",
    maxHeight: "100%",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };
  const containerStyle = {
    display: "flex",
    flexDirection: "column",
    height: "100vh",
    width: "100%",
    "@media (max-width: 768px)": {
      flexDirection: "column",
    },
  };

  const leftSideStyle = {
    flex: 1,
    display: "none",
    "@media (min-width: 1024px)": {
      // Show on larger screens
      display: "block",
    },
  };

  const rightSideStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    "@media (max-width: 768px)": {
      padding: "10px",
    },
  };

  // Adjust form container for smaller screens
  const formContainerStyle = {
    width: "100%",
    maxWidth: "540px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "start",
    gap: "30px", // Reduced gap for smaller screens
    "@media (max-width: 768px)": {
      gap: "20px",
    },
  };
  const inputStyle =
    "w-full max-w-md appearance-none rounded-full border-2 p-3 px-10 focus:bg-slate-100 focus:ring-2 focus:ring-blue-300";

  return (
    <div style={containerStyle}>
      <div style={leftSideStyle}>
        <img src={forgotImage} alt="Centered Image" style={imageStyle} />
      </div>
      <div style={rightSideStyle}>
        <div style={formContainerStyle}>
          <div className="w-[126px] h-[126px] relative">
            <img
              className="w-24 h-[97.77px] left-[15px] top-[19px] relative"
              src={key}
              alt="Key"
            />
          </div>
          <div className="flex flex-col justify-start items-center gap-[60px]">
            <div className="flex flex-col justify-start items-center gap-[17px]">
              <div className="text-zinc-800 text-5xl font-bold font-['Roboto Flex']">
                Forgot password?
              </div>
              <div className="text-neutral-400 text-2xl font-normal font-['Roboto Flex']">
                Don’t worry, we’ll send you the reset instructions
              </div>
            </div>
            <form onSubmit={resetPassword}>
              <div className="flex flex-col justify-center items-center gap-[20px]">
                <div className="flex flex-col items-center justify-center space-y-4 w-full">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    className={inputStyle}
                    onChange={handleEmailChange}
                    value={email}
                  />
                  {errMsg && <p style={{ color: "red" }}>{errMsg}</p>}
                </div>
                <div className="flex flex-col justify-start items-center w-full">
                  <button
                    className="w-full lg:w-[400px] h-[54px] bg-gradient-to-r from-sky-950 via-blue-950 to-cyan-900 rounded-[60px] flex items-center justify-center"
                    type="submit"
                    disabled={isLoading}
                  >
                    <span className="text-white font-semibold">
                    {isLoading ? "Loading...." : "Reset Password"}
                    </span>
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div className="flex justify-center items-center">
            <a
              href="/login"
              className="text-zinc-800 text-xl font-normal font-['Roboto Flex']"
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
