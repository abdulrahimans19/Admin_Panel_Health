// import React, { useState } from "react";
// import { motion, AnimatePresence } from "framer-motion";
// import { LoginUserdata } from "../API/ApiCall";
// import AdminImage from "../assets/login/images/adminLogin.png";
// import { useNavigate } from "react-router-dom";
// import doctorImage from "../assets/login/images/doctorLogin.png";

// const Login = () => {
//   const [loginType, setLoginType] = useState("doctor");

//   // const handleToggle = () => {
//   //   setLoginType((prevLoginType) => (prevLoginType === 'doctor' ? 'admin' : 'doctor'));
//   // };

//   const navigate = useNavigate();

//   const [errmsg, setErrmsg] = useState("");
//   const [bgImage, setbgImage] = useState("../assets/login/images/login.png");

//   const [isValidEmail, setIsValidEmail] = useState(true);
//   const [email, setEmail] = useState("");
//   const [toggledata, setToggledata] = useState(true);

//   const LoginUser = (e) => {
//     e.preventDefault();

//     setErrmsg("");

//     const form = new FormData(e.target);
//     const UserData = Object.fromEntries(form);

//     if (toggledata) {
//       LoginUserdata(UserData)
//         .then((data) => {
//           console.log();

//           localStorage.setItem("sophwe_token", JSON.stringify(data.data.data));
//           navigate("/");
//         })
//         .catch((err) => {
//           setErrmsg("email or password is incorrect");
//         });
//     } else {
//       console.log("doctor log in");
//     }

//     // Validate(UserData.email).then(data=>
//     //   {
//     //     navigate('/home')
//     //   }).catch(err=>
//     //     {
//     //       navigate('/addetails')
//     //     })
//   };

//   // const getImageUrl = (data) => {
//   //   console.log("owrngirg");
//   //   console.log(data);
//   //   data === "doctor"
//   //     ? setbgImage("doctor")
//   //     : setbgImage("../assets/login/images/login.png");
//   // };

//   const toggle = (data) => {
//     if (data == "doctor") {
//       setToggledata(false);
//     } else {
//       setToggledata(true);
//     }
//   };

//   // email validation
//   const handleEmailChange = (event) => {
//     const newEmail = event.target.value;
//     setEmail(newEmail);

//     // Check if the email is valid using a regular expression
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     setIsValidEmail(emailRegex.test(newEmail));
//   };

//   return (
//     <div className="flex h-screen bg-gray-100">
//       {/* Left side with image */}
//       <div className="hidden lg:flex items-center justify-center w-1/2 bg-indigo-500">
//         {toggledata ? (
//           <motion.img
//             key={loginType}
//             src={AdminImage}
//             alt={`Login Image - ${loginType}`}
//             className="object-cover w-full h-full"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.5 }}
//           />
//         ) : (
//           <motion.img
//             key={loginType}
//             src={doctorImage}
//             alt={`Login Image - ${loginType}`}
//             className="object-cover w-full h-full transition duration-75"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//             transition={{ duration: 0.5 }}
//           />
//         )}
//       </div>

//       <div className="flex items-center justify-center w-full lg:w-1/2 p-8">
//         <div className="max-w-md w-full space-y-8 ">
//           <div>
//             <div className="flex justify-center">
//               <div className="border-2 border-black rounded-3xl xl h-14 w-56  ">
//                 <div className="flex gap-20 justify-center h-full">
//                   <div className="flex justify-around w-full">
//                     <p
//                       onClick={() => {
//                         toggle("admin");
//                       }}
//                       className={`${
//                         toggledata
//                           ? "bg-blue-950  border-black  border-2"
//                           : " text-black "
//                       }  w-full cursor-pointer text-center rounded-3xl text-white text-2xl flex items-center justify-center `}
//                     >
//                       Admin
//                     </p>

//                     <div
//                       onClick={() => {
//                         toggle("doctor");
//                       }}
//                       className={`${
//                         !toggledata
//                           ? "bg-blue-950 border-2 border-black"
//                           : " text-black"
//                       }  w-full  text-center cursor-pointer  rounded-3xl text-white text-2xl flex items-center justify-center`}
//                     >
//                       doctor
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             <div className="flex items-center justify-center">
//               <h2 className="mt-6 text-5xl p-5 font-extrabold text-gray-900">
//                 Hello {!toggledata ? "Doctor" : "Admin"}!
//               </h2>
//             </div>
//             <div className="flex items-center justify-center">
//               <h2 className="mt-6 text-3xl font-thin text-gray-400">
//                 welcome back
//               </h2>
//             </div>
//           </div>
//           <form onSubmit={LoginUser} className="mt-8 space-y-6">
//             {/* Your form elements go here */}
//             {/* Example: */}
//             <div class="relative">
//               <input
//                 value={email}
//                 onChange={handleEmailChange}
//                 name="email"
//                 type="email"
//                 className="w-[400px] appearance-none rounded-full border-2  p-3 px-4 focus:bg-slate-150 focus:ring-2 focus:ring-blue-300"
//                 placeholder="Email Address"
//               />
//               {!isValidEmail && (
//                 <p style={{ color: "red" }}>Invalid email address</p>
//               )}

//               {/* <label
//                 for="floating_outlined"
//                 class="absolute text-sm text-gray-500   duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-100 px-2 peer-focus:px-2 peer-focus:text-blue-600    peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
//               >
//                 Floating outlined
//               </label> */}
//             </div>

//             <div class="relative">
//               <input
//                 name="password"
//                 type="password"
//                 className="w-[400px] appearance-none rounded-full border-2  p-3 px-4 focus:bg-slate-150 focus:ring-2 focus:ring-blue-300"
//                 placeholder=" Password"
//               />
//               {errmsg && <p style={{ color: "red" }}>{errmsg}</p>}

//               {/* <label
//                 for="floating_outlined1"
//                 class="absolute text-sm text-gray-500   duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-gray-100 px-2 peer-focus:px-2 peer-focus:text-blue-600    peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
//               >
//                 Floating outlined
//               </label> */}
//             </div>

//             <div>
//               <button className="w-[400px] h-[54px] bg-gradient-to-r from-sky-950 via-blue-950 to-cyan-900 rounded-[60px] flex items-center justify-center mt-10">
//                 <div className="text-white text-1xl font-semibold font-['Roboto Flex']">
//                   Login
//                 </div>
//               </button>
//             </div>
//             <div className="flex justify-end items-center">
//               <a
//                 href="/forgot"
//                 className="text-cyan-900 text-1xl font-medium font-['Roboto Flex'] mr-10"
//               >
//                 Forgot Password?
//               </a>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;import React, { useState } from "react";
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

  const handleToggle = (option) => {
    setSelectedOption(option);
  };

  const LoginUser = (e) => {
    e.preventDefault();
    setErrmsg("");

    const form = new FormData(e.target);
    const UserData = Object.fromEntries(form);

    if (selectedOption === "Admin") {
      LoginUserdata(UserData)
        .then((data) => {
          localStorage.setItem("sophwe_token", JSON.stringify(data.data.data));
          navigate("/");
        })
        .catch((err) => {
          setErrmsg("Email or password is incorrect");
        });
    } else {
      DoctorLogInApi(UserData)
        .then((data) => {
          localStorage.setItem("sophwe_token", JSON.stringify(data.data.data));
          navigate("/doctor/overview");
        })
        .catch((err) => {
          setErrmsg("Email or password is incorrect");
        });
    }
  };

  const handleEmailChange = (event) => {
    const newEmail = event.target.value;
    setEmail(newEmail);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setIsValidEmail(emailRegex.test(newEmail));
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-gray-100">
      {/* Image Section: Hidden on smaller screens, visible on larger screens */}
      <div className="hidden lg:flex items-center justify-center flex-1 bg-indigo-500">
        <img
          src={selectedOption === "Admin" ? AdminImage : doctorImage}
          alt={`Login Image - ${selectedOption}`}
          className="object-cover w-full h-full"
        />
      </div>

      {/* Login Section */}
      <div className="flex items-center justify-center w-full lg:w-1/2 p-8">
        <div className="max-w-md w-full space-y-8">
          {/* <div className="text-center">
            <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
              Hello {selectedOption === "Admin" ? "Admin" : "Doctor"}!
            </h2>
            <p className="mt-2 text-sm text-gray-600">Welcome back</p>
          </div> */}

          {/* Toggle Section */}
          <div className="relative w-full lg:w-[340px] h-[68px] bg-white rounded-[60px] border border-zinc-400 overflow-hidden mb-6 mx-auto lg:ml-0 lg:mr-0">
            <div
              className={`absolute left-0 top-0 ${
                selectedOption === "Admin" ? "w-1/2" : "w-1/2 left-1/2"
              } h-full bg-blue-950 rounded-[60px] shadow`}
            />
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

          {/* Form Content */}
          <div className="flex flex-col items-center space-y-5">
            <h2 className="text-2xl lg:text-5xl font-extrabold text-gray-900">
              Hello {selectedOption === "Admin" ? "Admin" : "Doctor"}!
            </h2>
            <h2 className="text-xl lg:text-3xl font-thin text-gray-400">
              Welcome back
            </h2>

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
              >
                <span className="text-white font-semibold">Login</span>
              </button>

              {selectedOption === "Doctor" && (
                <div className="flex justify-center lg:justify-start w-full lg:w-[400px] mt-4">
                  <span>Don't have an account? </span>
                  <a
                    href="/register"
                    className="text-cyan-900 ml-2 font-medium"
                  >
                    Signup
                  </a>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
