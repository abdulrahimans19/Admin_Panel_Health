import React, { useState } from "react";
import { LoginUserdata } from "../API/ApiCall";
import AdminImage from "../assets/login/images/adminLogin.png";
import { useNavigate } from "react-router-dom";
import doctorImage from "../assets/login/images/doctorLogin.png";
import { DoctorLogInApi } from "../API/DoctorApi";
import { requestForToken } from "../firebase/Firebaseconfig";

const Login = () => {
  const [selectedOption, setSelectedOption] = useState("Admin");
  const navigate = useNavigate();
  const [errmsg, setErrmsg] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const handleToggle = (option) => {
    setSelectedOption(option);
  };

  const LoginUser = (e) => {
    e.preventDefault();
    setErrmsg("");
    const form = new FormData(e.target);
    const UserData = Object.fromEntries(form.entries());

    const apiCall = selectedOption === "Admin" ? LoginUserdata : DoctorLogInApi;
    apiCall(UserData)
      .then((data) => {
        if (
          data.data.data.user_role === "Admin" ||
          data.data.data.user_role === "DOCTOR"
        ) {
          localStorage.setItem("sophwe_token", JSON.stringify(data.data.data));
          if (selectedOption === "Admin") {
            requestForToken();
          }

          const redirectPath =
            selectedOption === "Admin" ? "/" : "/doctor/overview";
          navigate(redirectPath);
        } else {
          setErrmsg("Email or password is incorrect");
        }
      })
      .catch((err) => {
        setErrmsg("Email or password is incorrect");
      })
      .finally(() => setIsLoading(false));
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setIsValidEmail(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(event.target.value));
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
      <div className="hidden lg:flex items-center justify-center flex-1 bg-indigo-500">
        <img
          src={selectedOption === "Admin" ? AdminImage : doctorImage}
          alt="Login"
          className="object-cover w-full h-full"
        />
      </div>

      <div className="flex flex-1 items-center justify-center w-full lg:w-1/2 p-8">
        <div className="max-w-md w-full space-y-8">
          <div className="flex flex-col items-center justify-center space-y-5">
            <h2 className="text-2xl lg:text-5xl font-extrabold text-gray-900">
              Hello {selectedOption}!
            </h2>
            <h2 className="text-xl lg:text-3xl font-thin text-gray-400">
              Welcome back
            </h2>
          </div>

          <div className="flex items-center justify-center">
            <div className="relative w-full lg:w-[340px] h-[68px] bg-white rounded-full border border-zinc-400 overflow-hidden mb-6">
              <div
                className={`absolute left-0 top-0 ${
                  selectedOption === "Admin" ? "w-1/2" : "w-1/2 left-1/2"
                } h-full bg-blue-950 rounded-full shadow`}
              ></div>
              <button
                onClick={() => handleToggle("Admin")}
                className={`absolute w-1/2 h-full text-center font-medium text-lg transition-all ease-in-out duration-300 ${
                  selectedOption === "Admin"
                    ? "bg-blue-950 text-white"
                    : "bg-white text-black"
                }`}
                style={{ borderRadius: "60px" }}
              >
                Admin
              </button>
              <button
                onClick={() => handleToggle("Doctor")}
                className={`absolute w-1/2 h-full text-center font-medium text-lg transition-all ease-in-out duration-300 ${
                  selectedOption === "Doctor"
                    ? "bg-blue-950 text-white"
                    : "bg-white text-black"
                }`}
                style={{ left: "50%", borderRadius: "60px" }}
              >
                Doctor
              </button>
            </div>
          </div>

          <form
            onSubmit={LoginUser}
            className="w-full flex flex-col items-center space-y-4"
          >
            {/* Email Input Box with SVG */}
            <div className="w-full lg:w-[400px] flex items-center rounded-full border-2 p-1 focus-within:ring-2 focus-within:ring-blue-300 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
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
                className="flex-1 appearance-none rounded-full p-2 focus:bg-slate-150 focus:outline-none pl-10"
                placeholder="Email Address"
              />
            </div>
            {!isValidEmail && (
              <p className="text-red-500">Invalid email address</p>
            )}

            {/* Password Input Box with SVG */}
            <div className="w-full lg:w-[400px] flex items-center rounded-full border-2 p-1 focus-within:ring-2 focus-within:ring-blue-300 relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {/* SVG icon here */}
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <input
                name="password"
                type={isPasswordShown ? "text" : "password"}
                className="flex-1 appearance-none rounded-full p-2 focus:bg-slate-150 focus:outline-none pl-10"
                placeholder="Password"
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  type="button"
                  onClick={() => setIsPasswordShown(!isPasswordShown)}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  {isPasswordShown ? (
                    // Icon when password is shown
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                      ></path>
                    </svg>
                  ) : (
                    // Icon when password is hidden
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      ></path>
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      ></path>
                    </svg>
                  )}
                </button>
              </div>
            </div>
            {errmsg && <p className="text-red-500">{errmsg}</p>}

            {selectedOption === "Doctor" ? (
              <a
                href="/forgot"
                className="text-cyan-900 font-medium self-end mr-10"
              >
                Forgot Password?
              </a>
            ) : (
              <div className="h-8"></div>
            )}

            <button
              className="w-full lg:w-[400px] h-[54px] bg-gradient-to-r from-sky-950 via-blue-950 to-cyan-900 rounded-[60px] flex items-center justify-center"
              type="submit"
              disabled={isLoading}
            >
              <span className="text-white font-semibold">
                {" "}
                {isLoading ? "Loading...." : "Login"}
              </span>
            </button>

            {selectedOption === "Doctor" && (
              <div className="flex justify-center w-full lg:w-[400px] mt-4 ">
              <span>Don't have an account? </span>
              <a href="/register" className="text-cyan-900 ml-2 font-medium">
                Signup
              </a>
            </div>
            
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
