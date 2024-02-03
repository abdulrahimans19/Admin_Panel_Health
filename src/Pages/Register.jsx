import React, { useState } from "react";
import doctorImage from "../assets/login/images/doctorLogin.png";
import SignupProfile from "./SignupProfile";
import { UserEmailVerify } from "../API/ApiCall";

const Register = () => {
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [email, setEmail] = useState("");
  const [passerror, setError] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showSignupProfile, setShowSignupProfile] = useState(false);
  const [apiError, setApiError] = useState("");
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const signUser = async (e) => {
    e.preventDefault();
    setError("");
    setApiError("");

    if (!email || !password || !confirmPassword) {
      if (!email) {
        setError("Please complete the form.");
        return;
      } else if (!password && !confirmPassword) {
        setError("Please enter password and confirm password.");
        return;
      } else if (!password) {
        setError("Please enter password.");
        return;
      } else if (!confirmPassword) {
        setError("Please enter confirm password.");
        return;
      }
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    } else if (password.length < 5) {
      setError("Password must be at least 5 digits");
      return;
    }

    try {
      const response = await UserEmailVerify(email);
      setShowSignupProfile(true);
    } catch (error) {
      if (error.response && error.response.data.statusCode === 409) {
        setApiError(error.response.data.data.message);
      } else {
        setApiError("An error occurred. Please try again later.");
      }
    }
  };

  // const isFormFilled = () => {
  //   return email.length > 0 && password.length > 0;
  // };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(newEmail));
  };
  const togglePasswordVisibility = () => {
    setIsPasswordShown(!isPasswordShown);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
      <div className="hidden lg:flex items-center justify-center w-1/2 bg-indigo-500">
        <img
          src={doctorImage}
          alt="Login Image - Doctor"
          className="object-cover w-full h-full"
        />
      </div>

      {/* Signup Section */}
      <div className="flex items-center justify-center w-full lg:w-1/2 p-8">
        <div className="max-w-md w-full space-y-8">
          {/* Form and content go here */}
          <div className="text-center">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900">
              Hello Doctor!
            </h2>
            <p className="text-xl lg:text-2xl font-light text-gray-400">
              New here? Get started!
            </p>
          </div>

          <form onSubmit={signUser} className="space-y-6">
            <div className="space-y-4">
              {/* Email Input Box with SVG */}
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
              </div>
              {!isValidEmail && (
                <p className="text-red-500 text-sm mt-2">
                  Invalid email address
                </p>
              )}
              {apiError && (
                <p className="text-red-500 text-sm mt-2">{apiError}</p>
              )}{" "}
              {/* Password Input Box with SVG and Toggle */}
              <div className="relative w-full rounded-full border-2 p-1 focus-within:ring-2 focus-within:ring-blue-300">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {/* SVG icon for lock/password */}
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
                  className="appearance-none rounded-full w-full p-2 pl-10 focus:outline-none"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    {isPasswordShown ? (
                      // SVG icon when password is shown
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    ) : (
                      // SVG icon when password is hidden
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        ></path>
                      </svg>
                    )}
                  </button>
                </div>
              </div>
              <div className="relative w-full rounded-full border-2 p-1 focus-within:ring-2 focus-within:ring-blue-300">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  {/* SVG icon for lock/password */}
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
                  name="Confirm Password"
                  type="password"
                  className="appearance-none rounded-full w-full p-2 pl-10 focus:outline-none"
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />{" "}
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center"></div>
              </div>
            </div>
            {passerror && (
              <p className="text-red-500 text-sm mt-2">{passerror}</p>
            )}
            <button
              // disabled={!isFormFilled()}
              className="group relative w-full h-[54px] flex justify-center py-2 px-4 border  bg-gradient-to-r from-sky-950 via-blue-950 to-cyan-900 rounded-full text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Continue
            </button>
          </form>

          <div className="flex justify-center">
            <p className="text-sm font-medium text-gray-600">
              Already have an account?{" "}
              <a
                href="/login"
                className="text-indigo-600 hover:text-indigo-500"
              >
                Login
              </a>
            </p>
          </div>

          {showSignupProfile && (
            <SignupProfile
              email={email}
              password={password}
              onClose={() => setShowSignupProfile(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
