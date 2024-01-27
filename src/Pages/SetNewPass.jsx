import React, { useState } from "react";

import sideImage from "../assets/images/setpass.png";
import key from "../assets/images/key.png";

const SetNewPass = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validationMessage, setValidationMessage] = useState("");

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    const confirmPasswordValue = e.target.value;
    setConfirmPassword(confirmPasswordValue);

    if (confirmPasswordValue !== "" && password !== confirmPasswordValue) {
      setValidationMessage("Password does not match!");
    } else {
      setValidationMessage("");
    }
  };

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

  return (
    <div style={containerStyle}>
      <div style={leftSideStyle}>
        <div className="w-[540px] h-[746px] flex-col justify-start items-center gap-[20px] inline-flex">
          <div className="flex-col justify-center items-center gap-[60px] flex">
            <div className="flex-col justify-start items-center gap-[30px] flex">
              <div className="flex-col justify-start items-center gap-[35px] flex">
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
                  Set new password
                </div>
                <div className="text-neutral-400 text-2xl font-normal font-['Roboto Flex'] text-center">
                  Your new password must be different to<br></br>
                  previously used password
                </div>
              </div>

              <div className="flex-col justify-center items-center gap-[20px] flex">
                <div className="flex flex-col items-center justify-center space-y-4 ">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Password"
                    className="w-[400px] appearance-none rounded-full border-2  p-3 px-4 focus:bg-slate-100 focus:ring-2 focus:ring-blue-300"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  <div>
                    <input
                      type="password"
                      id="confirm_password"
                      name="confirm_password"
                      placeholder="Confirm Password"
                      className="w-[400px] appearance-none rounded-full border-2  p-3 px-4 focus:bg-slate-150 focus:ring-2 focus:ring-blue-300"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                    />
                    <p
                      id="validation"
                      className="text-center text-orange-500 italic text-sm"
                    >
                      {validationMessage}
                    </p>
                  </div>
                </div>

                <div className="flex-col justify-start items-start  flex">
                  <button className="h-[58px] px-[105px] py-[30px] bg-gradient-to-r from-sky-950 via-blue-950 to-cyan-900 rounded-[60px] flex-col justify-center items-center gap-1 flex">
                    <div className="text-white text-2xl font-semibold font-['Roboto Flex']">
                      Reset Password
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
        </div>
      </div>
      <div style={rightSideStyle}>
        <img
          src={sideImage}
          alt="Centered Image"
          style={{ maxWidth: "60%", maxHeight: "70%" }}
        />
      </div>
    </div>
  );
};

export default SetNewPass;
