import React, { useState } from "react";
import { LoginUserdata } from "../API/ApiCall";
import AdminImage from "../assets/login/images/adminLogin.png";
import { useNavigate } from "react-router-dom";
import doctorImage from "../assets/login/images/doctorLogin.png";
import { DoctorLogInApi } from "../API/DoctorApi";

const Login = () => {
  const [selectedOption, setSelectedOption] = useState("Admin");
  const navigate = useNavigate();
  const [errmsg, setErrmsg] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
        localStorage.setItem("sophwe_token", JSON.stringify(data.data.data));
        const redirectPath =
          selectedOption === "Admin" ? "/" : "/doctor/overview";
        navigate(redirectPath);
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
            <input
              value={email}
              onChange={handleEmailChange}
              name="email"
              type="email"
              className="w-full lg:w-[400px] appearance-none rounded-full border-2 p-3 focus:bg-slate-150 focus:ring-2 focus:ring-blue-300"
              placeholder="Email Address"
            />
            {!isValidEmail && (
              <p className="text-red-500">Invalid email address</p>
            )}

            <input
              name="password"
              type="password"
              className="w-full lg:w-[400px] appearance-none rounded-full border-2 p-3 focus:bg-slate-150 focus:ring-2 focus:ring-blue-300"
              placeholder="Password"
            />
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
              <div className="flex justify-center lg:justify-start w-full lg:w-[400px] mt-4">
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
