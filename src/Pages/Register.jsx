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

          <form onSubmit={signUser} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <input
                  value={email}
                  onChange={handleEmailChange}
                  name="email"
                  type="email"
                  required
                  className="w-full rounded-full border-gray-300 p-3 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Email Address"
                />
                {!isValidEmail && (
                  <p className="text-red-500 text-sm mt-2">
                    Invalid email address
                  </p>
                )}
                {apiError && (
                  <p className="text-red-500 text-sm mt-2">{apiError}</p>
                )}{" "}
                {/* Display API error if any */}
              </div>
              <div>
                <input
                  name="password"
                  type="password"
                  required
                  className="w-full rounded-full border-gray-300 p-3 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <input
                  name="confirmPassword"
                  type="password"
                  required
                  className="w-full rounded-full border-gray-300 p-3 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Confirm Password"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {passerror && (
                  <p className="text-red-500 text-sm mt-2">{passerror}</p>
                )}
              </div>
            </div>

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
