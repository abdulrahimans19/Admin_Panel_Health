import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import sideImage from "../assets/images/setpass.png";
import key from "../assets/images/key.png";
import { SetPassword } from "../API/ApiCall";

const SetNewPass = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
  const [isPasswordShown, setIsPasswordShown] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();

  const { email, reset_password_token } = location.state || {
    email: null,
    reset_password_token: null,
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    validatePassword(e.target.value, confirmPassword);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    validatePassword(password, e.target.value);
  };

  const validatePassword = (pass, confirmPass) => {
    let validationErrors = [];
    if (pass.length < 5) {
      validationErrors.push("Password must be at least 5 characters long.");
    }
    if (confirmPass !== "" && pass !== confirmPass) {
      validationErrors.push("Passwords do not match!");
    }
    setValidationMessage(validationErrors.join(" "));
  };

  const isFormFilled = () => {
    return (
      password.length >= 5 &&
      confirmPassword === password &&
      validationMessage === ""
    );
  };
  const togglePasswordVisibility = () => {
    setIsPasswordShown(!isPasswordShown);
  };

  // Ensure you're using the useNavigate hook correctly

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setValidationMessage("Passwords do not match!");
      return;
    }
    if (password.length < 5) {
      setValidationMessage("Password must be at least 5 characters long.");
      return;
    }
    if (isFormFilled()) {
      SetPassword(email, reset_password_token, password)
        .then((response) => {
          console.log("Password reset successful", response);
          navigate("/success");
        })
        .catch((error) => {
          console.error("Failed to reset password", error);
          setValidationMessage(
            "An error occurred while resetting your password. Please try again."
          );
        });
    }
  };

  return (
    <div className="flex flex-wrap h-screen w-full">
      <div className="flex flex-1 flex-col items-center justify-center p-4">
        <div className="max-w-md w-full space-y-8">
          <div className="space-y-4">
            <img className="mx-auto h-32 w-auto" src={key} alt="Key" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Set new password
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600">
              Your new password must be different from previously used
              passwords.
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm -space-y-px">
              <div className="mb-4 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  {/* SVG icon for password */}
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
                  required
                  className="w-full rounded-full border-2 border-gray-300 p-3 pl-10 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Password"
                  onChange={handlePasswordChange}
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  {isPasswordShown ? (
                    // SVG icon when password is shown
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
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  {/* SVG icon for confirm password */}
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
                  name="confirmPassword"
                  type={isPasswordShown ? "text" : "password"}
                  required
                  className="w-full rounded-full border-2 border-gray-300 p-3 pl-10 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Confirm Password"
                  onChange={handleConfirmPasswordChange}
                />
              </div>
              {validationMessage && (
                <p className="text-red-500 text-sm mt-2">{validationMessage}</p>
              )}
            </div>

            <button
              // disabled={!isFormFilled()}
              className="group relative w-full h-[54px] flex justify-center py-2 px-4 border  bg-gradient-to-r from-sky-950 via-blue-950 to-cyan-900 rounded-full text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Continue
            </button>
          </form>
          <div className="text-center">
            <a
              href="/login"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Back to login
            </a>
          </div>
        </div>
      </div>
      <div className="flex-1 hidden lg:flex items-center justify-center p-4">
        <img
          className="max-w-full h-auto"
          src={sideImage}
          alt="Set New Password"
        />
      </div>
    </div>
  );
};

export default SetNewPass;
