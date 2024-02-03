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
                <div className="relative w-full rounded-full border-2 p-1 focus-within:ring-2 focus-within:ring-blue-300">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {/* SVG icon for email */}
                    <svg
                      class="w-4 h-4  text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 16"
                    >
                      <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                      <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
                    </svg>
                  </div>
                  <input
                    value={email}
                    onChange={handleEmailChange}
                    name="email"
                    type="email"
                    className="appearance-none rounded-full w-full p-2 pl-10 focus:outline-none"
                    placeholder="Email Address"
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
