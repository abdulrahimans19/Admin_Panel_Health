import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import sideImage from "../assets/images/setpass.png";
import key from "../assets/images/key.png";
import { SetPassword } from "../API/ApiCall";

const SetNewPass = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationMessage, setValidationMessage] = useState("");
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
    if (confirmPass !== "" && pass !== confirmPass) {
      setValidationMessage("Password does not match!");
    } else {
      setValidationMessage("");
    }
  };

  const isFormFilled = () => {
    return (
      password.length > 0 &&
      confirmPassword.length > 0 &&
      validationMessage === ""
    );
  };
// Ensure you're using the useNavigate hook correctly

const handleSubmit = (e) => {
  e.preventDefault();
  if (isFormFilled()) {
    SetPassword(email, reset_password_token, password)
      .then((response) => {
        console.log("Password reset successful", response);
        // Ensure this message exactly matches what the API returns
        if (response.data.message === "Password reset successful, You'll be redirected to the login screen now") {
          console.log('Attempting to navigate to /success'); // Debugging line
          navigate('/success');
        } else {
          console.log("Password reset response:", response.data.message);
        }
      })
      .catch((error) => {
        console.error("Failed to reset password", error);
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
              <div className="mb-4">
                {" "}
                {/* Added mb-4 to create a gap */}
                <input
                  name="password"
                  type="password"
                  required
                  className="w-full rounded-full border-2 border-gray-300 p-3 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Password"
                  onChange={handlePasswordChange}
                />
              </div>
              <div>
                <input
                  name="confirmPassword"
                  type="password"
                  required
                  className="w-full rounded-full border-2 border-gray-300 p-3 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Confirm Password"
                  onChange={handleConfirmPasswordChange}
                />
                {validationMessage && (
                  <p className="text-red-500 text-sm mt-2">
                    {validationMessage}
                  </p>
                )}
              </div>
            </div>

            <button
              disabled={!isFormFilled()}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
